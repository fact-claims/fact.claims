import VNetworkGraph from "v-network-graph"
import "v-network-graph/lib/style.css"

export default defineNuxtPlugin(async (nuxtApp) => {

    nuxtApp.vueApp.use(VNetworkGraph)

    console.log("plugin.vue-graph");
    return {
        provide: {}
    }
})