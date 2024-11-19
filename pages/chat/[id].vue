<script setup lang="ts">
import { ref, computed } from 'vue';
import { useNuxtApp } from '#app';
import { useRoute } from 'vue-router';

const { $store } = useNuxtApp();
const route = useRoute();
const id = Number(route.params.id);

// Данные о текущем пользователе
const recipient = computed(() => $store.getters.getPersonById(id));
const isAuthenticated = computed(() => $store.getters.isAuthenticated);
const currentUser = computed(() => $store.getters.getUser);

// Состояние чата
const messages = computed(() => $store.getters.getChatMessages(id));

// Состояние для ввода нового сообщения
const newMessage = ref('');
const allMessages = computed(() => {
  const {incomeMessages, outcomeMessages} = $store.getters.getChatMessages(id);
  return [...incomeMessages, ...outcomeMessages].sort((a,b) =>
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
})

// Функция для отправки нового сообщения
const sendMessage = () => {
  if (!newMessage.value.trim()) return;

  // Создание объекта нового сообщения
  const message = {
    senderId: currentUser.value.id,
    content: newMessage.value,
    timestamp: new Date().toISOString(),
  };

  // Отправка сообщения
  $store.dispatch('sendMessage', { recipientId: id, content: newMessage.value });

  // Добавляем задержку перед отправкой мокового сообщения
  setTimeout(() => {
    const mockMessage = {
      senderId: recipient.value.id,  // Моковый отправитель - получатель
      content: "Это моковое сообщение от другого пользователя", // Пример текста сообщения
      timestamp: new Date().toISOString(),
    };

    // Отправляем моковое сообщение в хранилище
    $store.dispatch('receiveMessage', { recipientId: id, content: mockMessage.content, senderId: recipient.value.id });
  }, 1500); // Задержка в 1.5 секунды для мокового сообщения
  newMessage.value = ''
};
</script>

<template>
  <div class="chat-page">
    <h1>Чат с пользователем: {{ recipient.PersonName || 'Не найдено' }} // {{ currentUser.firstName }}</h1>

    <div class="chat-window">
      <!-- История сообщений -->
      <div class="messages">
        <div v-for="(message, index) in allMessages" :key="index"
             :class="['message', { 'self': message.senderId === currentUser.id, 'other': message.senderId !== currentUser.id }]">
          <strong>{{ message.senderId === currentUser.id ? currentUser.firstName : recipient.PersonName }}</strong>
          <p>{{ message.content }}</p>
          <small>{{ new Date(message.timestamp).toLocaleTimeString() }}</small>
        </div>
      </div>
    </div>

    <!-- Форма для отправки нового сообщения -->
    <div class="message-input">
      <textarea v-model="newMessage" placeholder="Напишите сообщение..."></textarea>
      <button @click="sendMessage">Отправить</button>
    </div>
  </div>
</template>

<style scoped>
.chat-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
}

.chat-window {
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.messages {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message {
  padding: 10px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.message.self {
  background-color: #e1f5fe;
  align-self: flex-end;
}

.message.other {
  background-color: #f1f1f1;
  align-self: flex-start;
}

.message small {
  font-size: 0.8rem;
  color: #999;
}

.message-input {
  width: 100%;
  display: flex;
  gap: 10px;
}

.message-input textarea {
  width: 80%;
  height: 50px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: none;
}

.message-input button {
  padding: 10px 20px;
  background-color: #6200ea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.message-input button:hover {
  background-color: #3700b3;
}
</style>
