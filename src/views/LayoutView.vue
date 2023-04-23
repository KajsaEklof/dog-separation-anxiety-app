<template>
  <app-bar />
  <div class="router-view">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import AppBar from "@/components/AppBar.vue";
</script>
