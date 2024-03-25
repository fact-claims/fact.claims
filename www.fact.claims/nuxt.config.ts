import { loadSettings } from "factify";
import { defineNuxtConfig } from "nuxt/config";
import dotenv from "dotenv"
dotenv.configDotenv()

var settings = loadSettings("./settings/") as any;
let kc_config = {
  realm: process.env.KEYCLOAK_REALM,
  clientId: process.env.KEYCLOAK_PUBLIC_CLIENT_ID || process.env.KEYCLOAK_CLIENT_ID,
  resource: process.env.KEYCLOAK_RESOURCE,
  url: process.env.KEYCLOAK_AUTH_URL
}

export default defineNuxtConfig({
  nitro: {
    prerender: {
      // routes: ['/sitemap.xml']
    }
  },
  runtimeConfig: {
    KEYCLOAK_REALM: process.env.KEYCLOAK_REALM,
    KEYCLOAK_CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID,
    KEYCLOAK_RESOURCE: process.env.KEYCLOAK_RESOURCE,
    KEYCLOAK_AUTH_URL: process.env.KEYCLOAK_AUTH_URL,

    public: {
      menu: {
        footer: settings.footer as [{}],
        header: settings.header as [{}],
        taskbar: settings.taskbar as [{}],
        links: settings.links as [{}],
      },
      brand: { ...{ ns: (process.env.MY_NS || "https://" + settings.brand?.domain) }, ...settings.brand },
      keycloak: { ...settings.keycloak, ...kc_config }
    },
  },
  modules: ['@nuxt/content', "@nuxt/image", '@nuxt/ui'],
  content: {
    documentDriven: true,
    markdown: {
      remarkPlugins: ['remark-emoji']
    }
  },
  devtools: { enabled: true }
})