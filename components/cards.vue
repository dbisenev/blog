<template>
     <div class="card-container">

          <nuxt-link :to="`/person/${person.id}`"  class="card" v-for="person in people" :key="person.id" @click="">
            <img :src="person.Avatar" alt="avatar" class="avatar" />
            <div class="card-info">
              <h3>{{ person.PersonName }}</h3>
              <p><strong>Topic:</strong> {{ person.Topic }}</p>
              <p><strong>Date:</strong> {{ person.RegisterDate }}</p>
              <p><strong>Rating:</strong></p>
                <star-rating :rating="person.Rating"></star-rating>
            </div>

       </nuxt-link>
        </div>
</template>

<script setup>
import StarRating from "~/components/starRating.vue";

defineProps({
    people: {
        type: Array,
        required: true,
        default: () => [],
    }
})

</script>


<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.card {
  display: block;
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
  width: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s;
}
.card:hover{
  transform: scale(1.05);
}

.card h3 {
  margin: 0 0 8px;
  font-size: 18px;
}

.card p {
  margin: 4px 0;
  color: #666;
}
</style>