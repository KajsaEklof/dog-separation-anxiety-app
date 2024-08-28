<template>
  <v-container>
    <h1>Health</h1>
    <v-row>
      <v-col class="d-flex justify-center mt-4 mb-8" >
        <v-btn color="primary" @click="addWeightEntry">
          Add weight entry
          <v-icon class="mr-2">
            mdi-plus
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <weight-chart />
  </v-container>
</template>


<script setup lang="ts">
import WeightChart from "@/components/WeightChart.vue"

async function addWeightEntry() {
  // Add weight entry
} 
</script>