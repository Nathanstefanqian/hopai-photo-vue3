import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import AutoImport from 'unplugin-auto-import/vite'
import WindiCSS from 'vite-plugin-windicss';
import MiniProgramTailwind from '@dcasia/mini-program-tailwind-webpack-plugin/rollup';


export default defineConfig({
  plugins: [uni(),
    WindiCSS(),
    MiniProgramTailwind(),
    AutoImport({
    imports: ["vue"],
  })]
})
