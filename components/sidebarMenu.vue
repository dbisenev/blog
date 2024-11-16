<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['filter-topic']);
const props = defineProps({
  isVisible: Boolean,
  availableTopics: Array,
});

const handleTopicClick = (topic: string) => {
  emit('filter-topic', topic);
};
</script>

<template>
  <div class="menu" v-if="isVisible">
    <ul>
      <li @click="handleTopicClick('All')">All Persons</li>
      <li v-for="topic in availableTopics" :key="topic" @click="handleTopicClick(topic)">{{ topic }}</li>
    </ul>

    <div class="contacts">
      <h2>Contact Us</h2>
      <p><strong>Phone:</strong> +123 456 789</p>
      <p><strong>Address:</strong> Green st.</p>
      <p><strong>Email:</strong> email@email.com</p>
    </div>
  </div>
</template>
<style scoped>
/* Основной контейнер меню */
.menu {
  position: absolute;
  top: 50px;
  left: -5px;
  width: 300px;
  height: 100vh;
  background-color: #f9f9f9;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1000;
  transition: transform 0.3s ease-in-out;
}

/* Скрыть меню при начальной загрузке (если нужно) */
.menu.hidden {
  transform: translateX(100%);
}

/* Список тем */
.menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu li {
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  color: #000000;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.menu li:hover {
  background-color: #eceff1;
  color: #323232;
}

/* Блок контактов */
.contacts {
  padding: 1rem;
  border-top: 1px solid #ddd;
}

.contacts h2 {
  margin-bottom: 1rem;
  font-size: 18px;
  color: #333;
}

.contacts p {
  margin: 0.5rem 0;
  font-size: 14px;
  color: #555;
}

.contacts p strong {
  font-weight: bold;
  color: #000;
}

/* Адаптивность для мобильных устройств */
@media (max-width: 768px) {
  .menu {
    width: 80%;
  }

  .menu li {
    font-size: 14px;
    padding: 8px 10px;
  }

  .contacts h2 {
    font-size: 16px;
  }

  .contacts p {
    font-size: 12px;
  }
}
</style>
