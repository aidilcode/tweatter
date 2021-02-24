import { createApp } from 'vue'
import root from '../App.vue'

/**
 * Event bus plugin
 */
const app = createApp(root)
const plugin = {
  install() {
    app.provide('$bus', createApp(root))
    // app.inject.$bus = new createApp(root);
  }
};

export default plugin;