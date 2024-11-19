<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useNuxtApp } from '#app';

const { $store } = useNuxtApp();
const route = useRoute();
const id = Number(route.params.id);
const isAuthenticated = computed(() => $store.getters.isAuthenticated)

// Получаем данные человека из Vuex
const person = computed(() => $store.getters.getPersonById(id));
const comments = person.value.Commentary
const rating = person.value.Rating


const likePerson = () => {
  $store.dispatch('likePerson', id);
}
// Тоггл подписки через Vuex
const toggleSubscription = () => {
  $store.dispatch('toggleSubscription', id);
};
</script>

<template>
  <div class="person-page">
    <div class="profile-header">

      <h1>{{ person?.PersonName }}</h1>
      <div class="avatar">
        <img :src="person?.Avatar" alt="Avatar" />
      </div>

      <!-- Кнопка подписки -->
      <button
          v-if="isAuthenticated"
          class="subscribe-button"
          :class="{ subscribed: person?.isSubscribed }"
          @click="toggleSubscription"
      >
        {{ person?.isSubscribed ? 'Подписан' : 'Подписаться' }}
      </button>

      <nuxt-link
          :to="`/chat/${person.id}`"
          v-if="isAuthenticated">Chat</nuxt-link>
      <nuxt-link
          :to="`/stats/${person.id}`"
          v-if="isAuthenticated"
      >
        Stat
      </nuxt-link>


    </div>

    <div class="person-details">
      <h3>Рейтинг: </h3>
      <star-rating :rating="rating"></star-rating>
      <button
          v-if="isAuthenticated"
          @click="likePerson"
          class="heart-button">
        <span :class="isLiked ? 'heart liked' : 'heart'">❤️</span>
      </button>
    </div>

    <div class="person-comments">
      <h3>Комментарии:</h3>
      <div class='comment' v-for="(comment, index) in comments" :key="index">
        <p>Рейтинг: <star-rating :rating="comment.rating"/></p>
        <p>{{ comment.text }}</p>
        <p>{{ comment.date }}</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.person-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 2rem;
  background-color: #f7f8fa;
  font-family: 'Arial', sans-serif;
}

.profile-header {
  text-align: center;
  margin-bottom: 2rem;

}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1rem;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-header h1 {
  font-size: 2rem;
  color: #333;
  margin: 0;
  padding-bottom: 0.5rem;
}

.subscribe-button {
  background-color: #6200ea;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  display: inline-block;
  margin-top: 1rem;
}

.subscribe-button:hover {
  background-color: #3700b3;
}

.subscribe-button:active {
  transform: scale(0.95);
}

.subscribe-button.subscribed {
  background-color: #4caf50;
}

.subscribe-button.subscribed:hover {
  background-color: #388e3c;
}

.person-details {
  display: flex;
  justify-content: space-between; /* Расположение элементов по горизонтали */
  align-items: center; /* Вертикальное выравнивание */
  background-color: #fff;
  padding: 12px 24px; /* Меньше отступов */
  border-radius: 8px; /* Меньшие закругления */
  width: 100%;
  max-width: 500px; /* Уменьшаем ширину блока */
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Более заметная тень */
  transition: box-shadow 0.3s ease;
}

.person-details:hover {
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15); /* Тень при наведении */
}

.person-details h3 {
  font-size: 1.2rem;
  color: #555;
  margin: 0;
  font-weight: 500;
}

.person-comments {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  max-width: 700px;
  margin: 20px auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* Subtle shadow for a floating effect */
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.person-comments h3 {
  font-size: 1.4rem;
  color: #333;
  margin-bottom: 15px;
  font-weight: 600; /* Slightly bolder title */
  text-align: center; /* Center the title */
}

.comment {
  background-color: #f9f9f9; /* Light gray background */
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
  transition: transform 0.2s ease, box-shadow 0.2s ease; /* Smooth hover transition */
}

.comment:hover {
  transform: scale(1.02); /* Slight zoom effect on hover */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15); /* Deepens shadow on hover */
}

.comment p {
  font-size: 1rem;
  color: #555;
  margin: 5px 0;
}

.comment p:first-child {
  font-weight: 500; /* Slightly bold the rating line */
}

.heart-button {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  transition: transform 0.2s ease;
}

.heart-button:hover {
  transform: scale(1.1);
}

.heart {
  color: #e0e0e0; /* Серый цвет */
  transition: color 0.3s ease;
}

.heart.liked {
  color: #ff0000; /* Красный цвет при лайке */
}
</style>

<!--<style scoped>-->
<!--.person-page {-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  align-items: center;-->
<!--  justify-content: flex-start;-->
<!--  padding: 2rem;-->
<!--  background-color: #f7f8fa;-->
<!--  font-family: 'Arial', sans-serif;-->
<!--}-->

<!--.profile-header {-->
<!--  text-align: center;-->
<!--  margin-bottom: 2rem;-->
<!--}-->

<!--.profile-header h1 {-->
<!--  font-size: 2rem;-->
<!--  color: #333;-->
<!--  margin: 0;-->
<!--  padding-bottom: 0.5rem;-->
<!--}-->

<!--.subscribe-button {-->
<!--  background-color: #6200ea;-->
<!--  color: white;-->
<!--  border: none;-->
<!--  padding: 12px 24px;-->
<!--  border-radius: 20px;-->
<!--  font-size: 16px;-->
<!--  font-weight: bold;-->
<!--  cursor: pointer;-->
<!--  transition: background-color 0.3s ease, transform 0.2s ease;-->
<!--  display: inline-block;-->
<!--  margin-top: 1rem;-->
<!--}-->

<!--.subscribe-button:hover {-->
<!--  background-color: #3700b3;-->
<!--}-->

<!--.subscribe-button:active {-->
<!--  transform: scale(0.95);-->
<!--}-->

<!--.subscribe-button.subscribed {-->
<!--  background-color: #4caf50;-->
<!--}-->

<!--.subscribe-button.subscribed:hover {-->
<!--  background-color: #388e3c;-->
<!--}-->

<!--.person-details {-->
<!--  display: flex;-->
<!--  justify-content: space-between; /* Расположение элементов по горизонтали */-->
<!--  align-items: center; /* Вертикальное выравнивание */-->
<!--  background-color: #fff;-->
<!--  padding: 12px 24px; /* Меньше отступов */-->
<!--  border-radius: 8px; /* Меньшие закругления */-->
<!--  width: 100%;-->
<!--  max-width: 500px; /* Уменьшаем ширину блока */-->
<!--  margin-bottom: 2rem;-->
<!--  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Более заметная тень */-->
<!--  transition: box-shadow 0.3s ease;-->
<!--}-->

<!--.person-details:hover {-->
<!--  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15); /* Тень при наведении */-->
<!--}-->

<!--.person-details h3 {-->
<!--  font-size: 1.2rem;-->
<!--  color: #555;-->
<!--  margin: 0;-->
<!--  font-weight: 500;-->
<!--}-->

<!--.person-comments {-->
<!--  background-color: #fff;-->
<!--  padding: 20px;-->
<!--  border-radius: 8px;-->
<!--  width: 100%;-->
<!--  max-width: 600px;-->
<!--  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);-->
<!--}-->

<!--.person-comments h3 {-->
<!--  font-size: 1.2rem;-->
<!--  color: #555;-->
<!--  margin-bottom: 1rem;-->
<!--}-->

<!--.comment {-->
<!--  background-color: #f4f4f4;-->
<!--  padding: 12px;-->
<!--  margin-bottom: 10px;-->
<!--  border-radius: 8px;-->
<!--  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);-->
<!--}-->

<!--.comment p {-->
<!--  font-size: 1rem;-->
<!--  color: #333;-->
<!--  margin: 0;-->
<!--}-->

<!--.heart-button {-->
<!--  background: transparent;-->
<!--  border: none;-->
<!--  cursor: pointer;-->
<!--  font-size: 2rem;-->
<!--  transition: transform 0.2s ease;-->
<!--}-->

<!--.heart-button:hover {-->
<!--  transform: scale(1.1);-->
<!--}-->

<!--.heart {-->
<!--  color: #e0e0e0; /* Серый цвет */-->
<!--  transition: color 0.3s ease;-->
<!--}-->

<!--.heart.liked {-->
<!--  color: #ff0000; /* Красный цвет при лайке */-->
<!--}-->
<!--</style>-->
