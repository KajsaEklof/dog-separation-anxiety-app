import { defineConfig } from '@vue/cli-service';

module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: 'My App',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
  },
});
