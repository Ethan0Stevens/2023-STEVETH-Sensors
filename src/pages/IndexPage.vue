<template>
  <q-page>
    <video class="fixed-bottom" style="min-height: 100%; min-width: 100%; transform: translate(0, 15vh)" src="../assets/one-piece-sunny.mp4" autoplay muted loop />
    <div class="flex flex-center absolute-full" style="background: rgba(0, 0, 0, 0.4)">
      <div class="" style="width: 30vw; height: 30vh; background: rgba(255, 255, 255, 0.8)">
        <canvas class="full-width full-height"  id="myChart"></canvas>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import Chart from 'chart.js/auto'

export default defineComponent({
  name: 'IndexPage',
  mounted () {
    const ctx = document.getElementById('myChart')
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        datasets: [{
          label: 'Humidité',
          data: [65, 59, 80, 81, 56, 74, 63, 2, 3, 32],
          fill: true,
          borderColor: '#F50057FF',
          tension: 0.4
        },
        {
          label: 'Temperature',
          data: [1, 2, 3, 4, 5, 6, 40, 23, 54, 3],
          fill: true,
          borderColor: 'rgb(72,211,187)',
          tension: 0.4
        }]
      },
      options: {
        indexAxis: 'x',
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
    // eslint-disable-next-line no-unused-expressions
    myChart
  }
})
</script>
