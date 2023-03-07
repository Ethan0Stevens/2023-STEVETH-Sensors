<template>
  <div style="width: 30vw; height: 30vh; background: rgba(255, 255, 255, 0.8)">
    <canvas class="full-width full-height"  :id="id"></canvas>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Chart from 'chart.js/auto'

export default defineComponent({
  name: 'ChartComp',
  props: [
    'temp',
    'humidite',
    'size',
    'id'
  ],
  mounted () {
    const ctx = document.getElementById(this.id)
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [...Array(this.size).keys()],
        datasets: [{
          label: 'Humidité',
          data: this.humidite,
          fill: true,
          borderColor: '#F50057FF',
          tension: 0.4
        },
        {
          label: 'Temperature',
          data: this.temp,
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
