<template>
  <Line ref="lineChart" id="lineChart" :data="data" :options="options" />
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { useDogStore } from "@/stores/DogStore";
import { onMounted, ref } from 'vue';
import usePetIdentity from "@/composables/DogIdentity";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const dogStore = useDogStore();
const lineChart = ref(null);
const { getPet } = usePetIdentity();

const data = {
  // labels is the dates of the weight entries
  labels: [''],
  datasets: [
    {
      label: 'Weight (kg)',
      backgroundColor: '#006d43',
      // data is the weight entries in kg
      data: [0]
    }
  ]
}

const options = {
  responsive: true,
  maintainAspectRatio: true
}

onMounted(async () => {
  if (!dogStore.pet.id || dogStore.pet.weight == '') {
    await getPet();
  }
  
  if (dogStore.pet.weight != '') {
    const dogWeight = parseInt(dogStore.pet.weight);

    // const index = data.datasets[0].data.indexOf(dogWeight);
    const chart = ChartJS.getChart("lineChart");
    if (chart) {
      // add all the weight entries to the chart
      // if there are weight entries, add them all

      // if there are no weight entries, add the first one
      chart.data.datasets[0].data = [dogWeight];

      chart.update();
    }
  }
})

</script>