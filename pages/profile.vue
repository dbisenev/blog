<template>
  <div class="profile-container">
    <div class="profile-card">
      <div class="profile-header">
        <img
            v-if="user.avatar"
            :src="user.avatar"
            alt="Avatar"
            class="avatar"
        />
        <h1>{{ firstName }} {{ lastName }}</h1>
      </div>
      <div class="profile-info">
        <h3><strong>Email:</strong> {{ user.email }}</h3>
        <button class="button" @click="logout">Выйти</button>
        <button class="button" @click="goToSubscriptions">Мои подписки</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNuxtApp } from '#app'

const { $store } = useNuxtApp()
const router = useRouter()
const user = computed(() => $store.state.user)
const firstName = ref(user.value.firstName)
const lastName = ref(user.value.lastName)

const logout = () => {
  $store.dispatch('logout')
  router.push('/login')
}

// Переход на страницу подписок
const goToSubscriptions = () => {
  router.push('/subscriptions')
}
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f4f4;
  padding: 2rem;
}

.profile-card {
  background-color: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.profile-header {
  margin-bottom: 1.5rem;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}

.profile-card h1 {
  font-size: 2rem;
  color: #333;
}

.profile-info h3 {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 1rem;
}

.button {
  background-color: #6200ea;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1rem;
}

.button:hover {
  background-color: #3700b3;
}

.button:active {
  transform: scale(0.95);
}
</style>
