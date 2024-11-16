<template>
  <div class="subscriptions-container" >
    <h1>Мои подписки</h1>
    <div v-if="subscriptions.length > 0">
      <div v-for="(person, index) in subscriptions" :key="index" class="subscription-card">
        <img :src="person.Avatar" alt="Avatar" class="avatar" />
        <nuxt-link :to="`/person/${person.id}`"> <h3>{{ person.PersonName }}</h3></nuxt-link>

        <p>Тема: {{ person.Topic }}</p>
        <star-rating :rating="person.Rating"></star-rating>
      </div>
    </div>
    <div v-else>
      <p>Вы еще не подписаны на людей.</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useNuxtApp } from '#app'

const { $store } = useNuxtApp()

// Получаем подписки из Vuex
const subscriptions = computed(() => {
  return $store.state.user?.subscriptions || []
})
</script>

<style scoped>
.subscriptions-container {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.subscription-card {
  background-color: #fff;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.subscription-card img.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 1rem;
}

.subscription-card h3 {
  font-size: 1.5rem;
  color: #333;
}

.subscription-card p {
  font-size: 1.2rem;
  color: #555;
}
</style>
