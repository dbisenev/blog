<template>
  <div>
    <!-- Глобальный хедер -->
    <header class="header">
      <nav class="nav">
        <nuxt-link to="/" class="nav-link">Главная</nuxt-link>
        <nuxt-link to="/profile" v-if="isAuthenticated" class="nav-link">Профиль</nuxt-link>
        <nuxt-link to="/about" class="nav-link">О нас</nuxt-link>
        <button class="nav-link auth-button" v-if="!isAuthenticated" @click="router.push('/login')">Войти</button>
        <button class="nav-link auth-button" v-if="isAuthenticated" @click="logout">Выйти</button>
      </nav>
    </header>

    <!-- Основной контент -->
    <main class="main">
      <NuxtPage />
    </main>

    <!-- Глобальный футер -->
    <footer class="footer">
      <p>&copy; {{ currentYear }} Моя компания. Все права защищены.</p>
      <p> {{ isAuthenticated }}</p>
    </footer>
  </div>
</template>

<script setup>
const router = useRouter()
const { $store } = useNuxtApp()

const currentYear = new Date().getFullYear()
const isAuthenticated = computed(() => $store.getters.isAuthenticated)

const logout = () => {
  $store.dispatch('logout')
  router.push('/login')
}
</script>

<style scoped>
/* Стили для шапки */
.header {
  background-color: #333;
  padding: 1rem 2rem;
  color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
}

.nav-link:hover {
  text-decoration: underline;
}

.auth-button {
  background-color: transparent;
  border: 2px solid #fff;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.auth-button:hover {
  background-color: #fff;
  color: #333;
}

/* Основной контент */
.main {

  min-height: 80vh;
  background-color: #f9f9f9;
  color: #333;
}

.main h1 {
  font-size: 2rem;
  color: #333;
}

/* Стили для футера */
.footer {
  background-color: #f4f4f4;
  text-align: center;
  padding: 1rem;
  border-top: 1px solid #ddd;
  font-size: 0.9rem;
  color: #555;
}

.footer p {
  margin: 0;
}
</style>
