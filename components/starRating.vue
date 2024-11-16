<script setup lang="ts">
const props = defineProps({
  rating: {
    type: Number,
    required: true
  }
})

const fullStars = computed(() => {
  return Math.floor(props.rating);
} )

const hasHalfStar = computed(() => {
  return props.rating % 1 >= 0.5;
})

const emptyStars = computed(() => {
  return 5 - fullStars.value - (hasHalfStar.value ? 1 : 0);
})

</script>

<template>
  <div class="star-rating">
    <span v-for="(index) in fullStars" :key="'full-' + index" class="star full">★</span>
    <span v-if="hasHalfStar" class="star half">
      <span class="half-left">★</span>
      <span class="half-right">☆</span>
    </span>

    <span v-for="( index) in emptyStars" :key="'empty-' + index" class="star empty">☆</span>  </div>
</template>

<style scoped>
.star {
  font-size: 24px;
  color: #FFD700;
  position: relative;
  display: inline-block;
}

.star.empty {
  color: #ccc;
}

.star.half {
  position: relative;
  display: inline-block;
  width: 12px;
}

.star.half .half-left {
  position: absolute;
  overflow: hidden;
  width: 12px;
  color: #FFD700;
}

.star.half .half-right {
  color: #ccc;
}
</style>