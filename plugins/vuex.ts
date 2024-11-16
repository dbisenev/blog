import { defineNuxtPlugin } from '#app';
import { createStore } from 'vuex';

// Создание хранилища Vuex
const store = createStore({
    state: {
        user: {
            id: null,
            firstName: '',
            lastName: '',
            email: '',
            subscriptions: [], // Массив подписок
        },
        registeredUsers: [],
        people: [
            {   id: 1,
                PersonName: 'John Doe',
                Avatar: 'https://i.pravatar.cc/150?img=1',
                PubDate: '2023-09-20',
                Rating: 1,
                Commentary: ['Great Work', 'Amazing', 'Wow'],
                Topic: 'Vue.js Development',
                isSubscribed: false
            },
            {   id: 2,
                PersonName: 'Jane Smith',
                Avatar: 'https://i.pravatar.cc/150?img=2',
                PubDate: '2023-09-18',
                Rating: 3.8,
                Commentary: ['Great Work', 'Amazing', 'Wow'],
                Topic: 'JavaScript',
                isSubscribed: false
            },
        ],
        chats: {}
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        clearUser(state) {
            state.user = null;
        },
        clearChat(state) {
            state.chats = null;
        },
        addUser(state, user) {
            state.registeredUsers.push(user);
        },
        toggleSubscription(state, personId) {
            const person = state.people.find(p => p.id === personId);
            if (person) {
                if (!state.user.subscriptions.some(sub => sub.id === person.id)) {
                    state.user.subscriptions.push(person);
                    person.isSubscribed = true;
                } else {
                    state.user.subscriptions = state.user.subscriptions.filter(sub => sub.id !== person.id);
                    person.isSubscribed = false;
                }
            }
        },
        likePerson(state, personId) {
            const person = state.people.find(p => p.id === personId);
            if (person) {
                person.Rating = (person.Rating + 0.1);
            }
        },
        addMessage(state, { recipientId, message, type }) {
            // type: 'income' или 'outcome'
            if (!state.chats[recipientId]) {
                state.chats[recipientId] = { income: [], outcome: [] };
            }

            if (type === 'income') {
                state.chats[recipientId].income.push(message);
            } else if (type === 'outcome') {
                state.chats[recipientId].outcome.push(message);
            }
        }
    },
    actions: {
        async register({ commit, state }, { firstName, lastName, email, password }) {
            const existingUser = state.registeredUsers.find(user => user.email === email);
            if (existingUser) {
                return { success: false, message: 'Email already exists' };
            }

            const newUser = {
                id: state.registeredUsers.length + 1,
                firstName,
                lastName,
                email,
                password,
                subscriptions: [],
            };
            commit('addUser', newUser);
            commit('setUser', newUser);

            return { success: true };
        },
        async login({ commit, state }, { email, password }) {
            const user = state.registeredUsers.find(user => user.email === email && user.password === password);
            if (user) {
                commit('setUser', user);
                return true;
            }
            return false;
        },
        logout({ commit }) {
            commit('clearChat');
            commit('clearUser');
        },
        toggleSubscription({ commit }, personId) {
            commit('toggleSubscription', personId);
        },
        likePerson({ commit }, personId) {
            commit('likePerson', personId);
        },
        sendMessage({ commit, state }, { recipientId, content }) {
            if (!state.user) return;
            const newMessage = {
                senderId: state.user.id,
                content,
                timestamp: new Date().toISOString()
            };

            commit('addMessage', { recipientId, message: newMessage, type: 'outcome' });
        },
        receiveMessage({ commit, state }, { recipientId, content, senderId }) {
            const newMessage = {
                senderId,
                content,
                timestamp: new Date().toISOString()
            };

            commit('addMessage', { recipientId, message: newMessage, type: 'income' });
        }
    },
    getters: {
        isAuthenticated(state) {
            return !!state.user;
        },
        getPeople(state) {
            return state.people;
        },
        getPersonById: (state) => (id) => {
            return state.people.find(person => person.id === id) || null;
        },
        getUser(state) {
            return state.user;
        },
        getChatMessages: (state) => (recipientId) => {
            const chat = state.chats[recipientId] || { income: [], outcome: [] };
            return {
                incomeMessages: chat.income,
                outcomeMessages: chat.outcome
            };
        }
    },
});

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('store', store);
});
