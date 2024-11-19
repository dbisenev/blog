<template>
  <div>
  <canvas id="myChart"></canvas>
  </div>
</template>
<script setup lang="ts">
import Chart from 'chart.js/auto'
const props = defineProps({
  id: Number,
})
const { $store } = useNuxtApp()
const commentsLength = ref<number[]>([])

for(let month = 0; month < 12; month++){
    const commentCount = $store.getters.getCommentsByMonth(props.id, month, 2024);
    commentsLength.value.push(commentCount)
}

const labels =[
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
const data = {
  labels: labels,
  datasets: [{
    label: "Comments:",
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: commentsLength.value,
  }]
}

const config ={
  type: 'line',
  data: data,
  options: {}
}
onMounted(() => {
  const myChart = new Chart(
      document.getElementById('myChart'),
      config
  )
})

</script>
