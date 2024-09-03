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
import { onMounted, ref, defineProps, watch } from 'vue';
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

const props = defineProps({
  labels: { type: Array as () => string[], required: true },
  data: { type: Array as () => number[], required: true },
})

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
})

// when the labels prop changes, update the chart
watch(() => props.labels, () => {
  const chart = ChartJS.getChart("lineChart");
  if (chart) {
    chart.data.labels = props.labels;
    chart.data.datasets[0].data = props.data;

    chart.update();
  }
})

</script>