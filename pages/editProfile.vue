<template>
  <div class="edit-profile-container">
    <div class="edit-profile-card">
      <div class="edit-profile-header">
        <h1>Редактировать профиль</h1>
      </div>
      <form @submit.prevent="updateProfile">
        <div class="form-group">
          <label for="firstName">Имя:</label>
          <input
              id="firstName"
              v-model="editableFirstName"
              type="text"
              placeholder="Введите имя"
          />
        </div>
        <div class="form-group">
          <label for="lastName">Фамилия:</label>
          <input
              id="lastName"
              v-model="editableLastName"
              type="text"
              placeholder="Введите фамилию"
          />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input
              id="email"
              v-model="editableEmail"
              type="email"
              placeholder="Введите email"
          />
        </div>
        <button class="button" type="submit">Сохранить изменения</button>
        <button class="button cancel-button" @click="cancelEdit">Отмена</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useNuxtApp } from '#app'

const { $store } = useNuxtApp()
const router = useRouter()

// Получение данных пользователя
const user = computed(() => $store.state.user)
const editableFirstName = ref(user.value.firstName)
const editableLastName = ref(user.value.lastName)
const editableEmail = ref(user.value.email)

// Обновление профиля
const updateProfile = () => {
  $store.dispatch('updateUser', {
    firstName: editableFirstName.value,
    lastName: editableLastName.value,
    email: editableEmail.value,
  })
  router.push('/profile') // Возврат к профилю
}

// Отмена редактирования
const cancelEdit = () => {
  router.push('/profile')
}
</script>

<style scoped>
.edit-profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f4f4;
  padding: 2rem;
}

.edit-profile-card {
  background-color: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.edit-profile-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.edit-profile-header h1 {
  font-size: 2rem;
  color: #333;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
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

.cancel-button {
  background-color: #e0e0e0;
  color: #333;
  margin-left: 1rem;
}

.cancel-button:hover {
  background-color: #bdbdbd;
}
</style>
