<script setup lang="ts">

import _ from 'lodash';
import {useStore} from "vuex";
import { useNuxtApp } from '#app';
import {useNuxt} from "@nuxt/kit";


const { $store } = useNuxtApp();


const people = computed(() => $store.getters.getPeople);

const currentPage = ref(1)
const perPage = ref(4)
const sortOption = 'date'
const selectedTopic = ref('All')
const isMenuIsVisible = ref(false)
const router = useRoute()


const goToProfile = () => {
  router.push('/profile');
}

const totalPages = computed(() => {
  return Math.ceil(filteredPeople.value.length / perPage.value)
})

const paginatedPeople = computed(() => {
  if (!sortedPeople.value || sortedPeople.value.length === 0) return [];
    const start = (currentPage.value - 1) * perPage.value;
    const end = start + perPage.value;
    return sortedPeople.value.slice(start, end);
})

const availableTopics = computed(() => {
  const topics = people.value.map(person => person.Topic);
  return [...new Set(topics)]
})


const filteredPeople = computed(() => {
  if (!people.value || people.value.length === 0) return [];
  if (selectedTopic.value === 'All'){
    return people.value;
  }else{
    return people.value.filter(person => person.Topic === selectedTopic.value)
  }
})

const sortedPeople = computed(() => {
    if (sortOption === 'date'){
        return _.orderBy(filteredPeople.value, ['PubDate'], ['desc']);
    }else if (sortOption === 'rating'){
        return _.orderBy(filteredPeople.value, ['Rating'], ['desc']);
    }
    return people;
})

const filterByTopic = (topic) =>{
  selectedTopic.value = topic
  currentPage.value = 1;
}
const toggleMenu = () => {
  isMenuIsVisible.value = !isMenuIsVisible.value
}

const prevPage = () => {
  if (currentPage.value > 1){
    currentPage.value--;
  }
}
const nextPage = () => {
  if (currentPage.value < totalPages.value){
    currentPage.value++;
  }
}

</script>

<template>

  <div class="container">
    <button class="menu-toggle" @click="toggleMenu">
      {{ isMenuIsVisible ? 'Hide Menu' : 'Show Menu' }}
    </button>

    <SidebarMenu
        :is-visible="isMenuIsVisible"
        :availableTopics="availableTopics"
        @filter-topic="filterByTopic"
    />
    <Cards :people="paginatedPeople"></Cards>
  </div>

</template>

<style scoped>
  /* Основной контейнер */
.container {
  position: relative;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Кнопка управления меню */
.menu-toggle {
  position: absolute;
  top: 5px;
  left: 0;
  background-color: #000000; /* Фиолетовый цвет */
  color: #fff;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 50px; /* Кнопка будет более округлой */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2); /* Лёгкая тень */
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.menu-toggle:hover {
  background-color: #333333; /* Более тёмный оттенок при наведении */
  transform: scale(1.05); /* Лёгкое увеличение */
}

.menu-toggle:active {
  transform: scale(0.95); /* Сжатие при клике */
}


.sidebar-menu h3 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: #333333;
  font-weight: bold;
  text-transform: uppercase;
  border-bottom: 2px solid #6200ea; /* Акцентная линия */
  padding-bottom: 0.5rem;
  width: 100%;
}

.sidebar-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.sidebar-menu li {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #6200ea;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.sidebar-menu li:hover {
  background-color: #f0f0f0; /* Светлый фон при наведении */
  color: #3700b3; /* Более тёмный цвет текста */
}

/* Карточки */
.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 2rem;
}

.card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: calc(100% / 2 - 1rem); /* Пример адаптации для двух колонок */
  transition: transform 0.2s ease;
}

.card:hover {
  transform: scale(1.03);
}

/* Адаптивность */
@media screen and (max-width: 768px) {
  .menu-toggle {
    bottom: 0.5rem;
    right: 0.5rem;
    padding: 10px 15px;
  }

  .sidebar-menu {
    width: 80%; /* Уменьшение ширины на мобильных */
  }

  .card {
    width: 100%; /* Одноколоночный режим для маленьких экранов */
  }
}
</style>
