<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/home">
          <ion-icon :icon="homeOutline" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="radio" href="/dog-profile">
          <ion-icon :icon="pawOutline" />
          <ion-label>Dog Profile</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="train" href="/train">
          <ion-icon :icon="barbellOutline" />
          <ion-label>Train</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="stats" href="/stats">
          <ion-icon :icon="statsChartOutline" />
          <ion-label>Stats</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
} from "@ionic/vue";

import {
  statsChartOutline,
  barbellOutline,
  pawOutline,
  settingsOutline,
  homeOutline,
} from "ionicons/icons";

export default {
  components: {
    IonPage,
    IonTabs,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonIcon,
  },
  data() {
    return {
      barbellOutline,
      statsChartOutline,
      pawOutline,
      settingsOutline,
      homeOutline,
    };
  },
};
</script>
