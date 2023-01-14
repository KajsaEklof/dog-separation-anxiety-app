<template>
  <c-flex
    align="center"
    justify="space-evenly"
    class="app-toolbar"
  >
    <NuxtLink to="/">
      <c-tooltip has-arrow label="Home" placement="bottom">
        <c-icon-button
          variant-color="indigo"
          aria-label="Home"
          icon="house-chimney"
        />
      </c-tooltip>
    </NuxtLink>
    <NuxtLink to="/training-session">
      <c-tooltip has-arrow label="Train" placement="bottom">
        <c-icon-button
          variant-color="indigo"
          aria-label="Train"
          icon="stopwatch"
        />
      </c-tooltip>
    </NuxtLink>
    <NuxtLink to="/stats">
      <c-tooltip
        has-arrow
        label="View Stats"
        placement="bottom"
      >
        <c-icon-button
          variant-color="indigo"
          aria-label="View Stats"
          icon="chart-line"
        />
      </c-tooltip>
    </NuxtLink>
  </c-flex>
</template>

<script lang="ts" setup></script>
