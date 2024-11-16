<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="loginUser" class="login-form">
      <label for="email">Email</label>
      <input
          v-model="email"
          id="email"
          type="email"
          placeholder="Enter your email"
          required
      />

      <label for="password">Password</label>
      <input
          v-model="password"
          id="password"
          type="password"
          placeholder="Enter your password"
          required
      />

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      <button type="submit">Login</button>

      <p>Don't have an account? <router-link to="/register">Register here</router-link></p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useNuxtApp } from '#app';

const { $store } = useNuxtApp();
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const loginUser = async () => {
  const success = await $store.dispatch('login', {
    email: email.value,
    password: password.value
  });

  if (success) {
    await router.push('/');
  } else {
    errorMessage.value = 'Invalid email or password';
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
}

h1 {
  font-size: 36px;
  margin-bottom: 20px;
  color: #333;
}

.login-form {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.login-form label {
  font-size: 16px;
  margin-bottom: 8px;
  color: #555;
}

.login-form input {
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 20px;
  width: 100%;
  box-sizing: border-box;
}

.login-form input:focus {
  outline: none;
  border-color: #6200ea;
}

button {
  background-color: #6200ea;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #3700b3;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-bottom: 20px;
}

.login-form p {
  font-size: 14px;
  color: #555;
  margin-top: 20px;
}

.login-form a {
  color: #6200ea;
  text-decoration: none;
  font-weight: bold;
}

.login-form a:hover {
  text-decoration: underline;
}
</style>
