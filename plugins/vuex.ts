import { defineNuxtPlugin } from '#app';
import { createStore } from 'vuex';
import { v4 as uuidv4 } from 'uuid'; // Импортируем генератор UUID

// Создание хранилища Vuex
const store = createStore({
    state: {
        user: null, // По умолчанию пользователь не авторизован
        registeredUsers: [],
        people: [
            {
                id: 1,
                PersonName: 'John Doe',
                Avatar: 'https://i.pravatar.cc/150?img=1',
                RegisterDate: '2023-09-20',
                Rating: 1,
                Commentary: [
                    { rating: 4, text: 'Great Work', date: '2024-09-21' },
                    { rating: 3, text: 'Amazing', date: '2024-09-22' },
                    { rating: 2, text: "Nice", date:"2024-10-12"},
                    { rating: 5, text: "Awful", date:"2024-11-12"},
                    { rating: 4, text: "Cheap", date:"2024-4-12"},
                    { rating: 3, text: "Insane", date:"2024-3-12"}
                ],
                Topic: 'Vue.js Development',
                isSubscribed: false,
                subscriptions: [] // Массив id
            },
            {
                id: 2,
                PersonName: 'Jane Smith',
                Avatar: 'https://i.pravatar.cc/150?img=2',
                RegisterDate: '2023-09-18',
                Rating: 3.8,
                Commentary: [
                    { rating: 5, text: 'Wow, fantastic!', date: '2024-09-19' },
                    { rating: 2, text: 'Not that good', date: '2024-09-20' }
                ],
                Topic: 'JavaScript',
                isSubscribed: false,
                subscriptions: [] // Массив id
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
                person.Rating += 0.1;
            }
        },
        addMessage(state, { recipientId, message, type }) {
            if (!state.chats[recipientId]) {
                state.chats[recipientId] = { income: [], outcome: [] };
            }

            if (type === 'income') {
                state.chats[recipientId].income.push(message);
            } else if (type === 'outcome') {
                state.chats[recipientId].outcome.push(message);
            }
        },
        SET_USER(state, user) {
            state.user = { ...state.user, ...user };
        },
        subscribePersontoUser(state, {userId, personId}){
            const user = state.registeredUsers.find(u=> u.id === userId);
            const person = state.people.find(p => p.id === personId);

            if (user && person){
                if (!user.subscriptions.some(sub => sub.id === person.id)){
                    user.subscriptions.push(person);
                }
                if (!person.subscriptions.includes(user.id)) {
                    person.subscriptions.push(user.id);
                }
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
                id: uuidv4(), // Генерация уникального UUID
                firstName,
                lastName,
                email,
                password,
                avatar: 'https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg',
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
        },
        updateUser({ commit }, payload) {
            commit('SET_USER', payload);
        },
        subscribePersonToUser({ commit }, { userId, personId }) {
            commit('subscribePersonToUser', { userId, personId });
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
        },
        getFriends(state){
            if (!state.user) return [];
            const currentId = state.user.id;

            return state.people.filter(person =>{
                const userSubscribedToPerson = state.user.subscriptions.some(
                    sub => sub.id === person.id
                );
                const personSubscribedToUser = person.subscriptions.includes(currentId);
                return userSubscribedToPerson && personSubscribedToUser;
                }
            )
        },
        getCommentsByMonth: (state) => (personId, month, year) =>{
            const person = state.people.find(p => p.id === personId);
            if (!person) return 0;

            // Фильтрация комментариев по месяцу и году
            const filteredComments = person.Commentary.filter(comment => {
                const commentDate = new Date(comment.date);
                return commentDate.getMonth() === month && commentDate.getFullYear() === year;
            });

            return filteredComments.length;
        }
    },
});

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('store', store);
});
