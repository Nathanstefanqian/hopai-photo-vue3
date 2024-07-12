import { createSSRApp } from "vue";
import App from "./App.vue";
import pinia from './pinia'; // 引入配置好的Pinia
import 'virtual:windi.css'
export function createApp() {
  const app = createSSRApp(App);
  app.use(pinia)
  return {
    app
  }
}
