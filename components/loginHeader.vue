<template>
  <header class="app-header">
    <div class="logo">
      <h1>My App</h1>
    </div>

    <div class="auth-button">
      <button @click="toggleAuth">
        {{ isAuthenticated ? 'Logout' : 'Login' }}
      </button>
    </div>
  </header>
</template>

<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const isAuthenticated = computed(() => store.getters.isAuthenticated);

const toggleAuth = () => {
  if (isAuthenticated.value) {
    store.dispatch('logout');
    router.push('/'); // Перенаправляем на главную страницу после логаута
  } else {
    router.push('/login'); // Перенаправляем на страницу логина
  }
};
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #6200ea;
  color: white;
}

.logo h1 {
  margin: 0;
}

.auth-button button {
  background-color: #fff;
  color: #6200ea;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.auth-button button:hover {
  background-color: #f1f1f1;
}
</style>
