<template>
  <CThemeProvider>
    <CColorModeProvider>
      <CBox font-family="body" class="layout-wrapper">
        <CReset />
        <app-toolbar />
        <div class="nuxt-content">
          <Nuxt />
        </div>
      </CBox>
    </CColorModeProvider>
  </CThemeProvider>
</template>
<script>
import {
  CThemeProvider,
  CColorModeProvider,
  CReset,
  CBox,
} from '@chakra-ui/vue';
import AppToolbar from '@/components/AppToolbar.vue';

export default {
  name: 'DefaultLayout',
  components: {
    AppToolbar,
    CThemeProvider,
    CColorModeProvider,
    CReset,
    CBox,
  },
  middleware: ['auth', 'hasPet'],
};
</script>
