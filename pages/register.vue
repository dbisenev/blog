<template>
  <div class="register-container">
    <h1>Register</h1>
    <form @submit.prevent="registerUser" class="register-form">
      <label for="firstName">First Name</label>
      <input v-model="firstName" id="firstName" type="text" placeholder="First Name" required />

      <label for="lastName">Last Name</label>
      <input v-model="lastName" id="lastName" type="text" placeholder="Last Name" required />

      <label for="email">Email</label>
      <input v-model="email" id="email" type="email" placeholder="Email" required />

      <label for="password">Password</label>
      <input v-model="password" id="password" type="password" placeholder="Password" required />

      <label for="confirmPassword">Confirm Password</label>
      <input
          v-model="confirmPassword"
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          required
      />

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      <button type="submit" :disabled="!formValid">Register</button>

      <p>
        Already have an account?
        <nuxt-link to="/login">Login</nuxt-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'nuxt/app';

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const { $store } = useNuxtApp()
const router = useRouter();

const formValid = computed(() => {
  return password.value === confirmPassword.value && password.value.length > 0;
});

const registerUser = async () => {
  if (!formValid.value) {
    errorMessage.value = 'Passwords do not match!';
    return;
  }

  const result = await $store.dispatch('register', {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
  });

  if (result.success) {
    await router.push('/profile');
  } else {
    errorMessage.value = result.message;
    console.log(errorMessage)
  }
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.register-form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0069d9;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
}

button[disabled] {
  background-color: #ddd;
  cursor: not-allowed;
}
</style>
