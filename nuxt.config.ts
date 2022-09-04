import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      ApiBaseUrl: process.env.API_BASE_URL,
    },
  },
  css: ["@/assets/css/app.scss"],
});
