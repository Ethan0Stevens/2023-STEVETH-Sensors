<template>
  <div style="min-width: 30vw; min-height: 30vh; background: rgba(255, 255, 255, 0.8)">
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
    'dates',
    'id'
  ],
  mounted () {
    // Code executé au montage de la page
    console.log(this.dates)
    // Declaration et configuration du graphique
    const ctx = document.getElementById(this.id)
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.dates,
        datasets: [{
          label: 'Humidité [ % ]',
          data: this.humidite,
          fill: true,
          borderColor: '#F50057FF',
          tension: 0.4,
          pointHoverRadius: 0
        },
        {
          label: 'Temperature[ °C ]',
          data: this.temp,
          fill: true,
          borderColor: 'rgb(72,211,187)',
          tension: 0.4,
          pointHoverRadius: 0
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    })
    // eslint-disable-next-line no-unused-expressions
    myChart
  }
})
</script>
