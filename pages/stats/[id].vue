<template>
  <div>
    <StatisticsChart :id="id" />
  </div>
</template>

<script setup lang="ts">
import StatisticsChart from '~/components/graphic.vue';
const route = useRoute()
const id = Number(route.params.id)
</script>
