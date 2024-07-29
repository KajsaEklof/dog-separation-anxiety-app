<!-- AppBar.vue -->
<template>
  <div>
    <v-app-bar flat dark location="bottom" class="app-navigation">
      <router-link to="/">
        <v-btn color="primary" icon><v-icon>mdi-home</v-icon></v-btn>
      </router-link>
      <router-link to="/dog-notes">
        <v-btn color="primary" icon><v-icon>mdi-dog</v-icon></v-btn>
      </router-link>
      <router-link to="/dog-health">
        <v-btn color="primary" icon
        ><v-icon>mdi-stethoscope</v-icon></v-btn
        >
        </router-link>
        <router-link to="/train">
          <v-btn color="primary" icon><v-icon>mdi-weight-lifter</v-icon></v-btn>
        </router-link>
      <router-link to="/settings">
        <v-btn color="primary" icon><v-icon>mdi-cog</v-icon></v-btn>
      </router-link>
    </v-app-bar>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.v-toolbar {
  &.app-navigation {
    .v-toolbar__content {
      justify-content: space-around;
    }
  }
}
</style>
