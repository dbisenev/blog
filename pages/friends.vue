<script setup lang="ts">
import { computed } from 'vue';
import { useNuxtApp } from '#app';

const { $store } = useNuxtApp();

// Данные о друзьях
const friends = computed(() => $store.getters.getFriends);
</script>

<template>
  <div class="friends-page">
    <h1>Ваши друзья</h1>
    <div v-if="friends.length > 0" class="friends-list">
      <div v-for="friend in friends" :key="friend.id" class="friend-card">
        <img :src="friend.Avatar" :alt="friend.PersonName" class="friend-avatar" />
        <div class="friend-info">
          <h2>{{ friend.PersonName }}</h2>
          <p>Тема: {{ friend.Topic }}</p>
          <p>Рейтинг: {{ friend.Rating.toFixed(1) }}</p>
        </div>
      </div>
    </div>
    <p v-else>У вас пока нет друзей.</p>
  </div>
</template>

<style scoped>
.friends-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.friends-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.friend-card {
  display: flex;
  align-items: center;
  background: #fff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 300px;
}

.friend-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 10px;
}

.friend-info h2 {
  margin: 0 0 5px;
  font-size: 1.2rem;
}

.friend-info p {
  margin: 0;
  color: #555;
}
</style>
