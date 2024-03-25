<template>
  <div>
    <claims-wizard :claim="claim" @completed="doCompleted" @updated="doUpdated" :singleton="false"></claims-wizard>
      <h1 v-if="!user_response">pending</h1>
      <div v-if="user_response">
        <claims-json :data="ai.context"></claims-json>
      </div>
  </div>
</template>

<script setup lang="ts">
// @ts-expect-error avoid lint error
import markdownParser from '@nuxt/content/transformers/markdown';

const router = useRouter();
const { params } = useRoute();
const { data: claim } = await useAsyncData(`claim-${params.id}`, () => {
  return queryContent().where({ "_path": "/claim/" + params.id }).findOne()
})
const user_response = ref()
const ai = ref()
console.log("claim.wizard: %o", claim)

const doCompleted = async (sender: any) => {
  console.log("claim.doCompleted: %o", sender.data)
  user_response.value = sender.data
}

const doUpdated = (sender: any) => {
  console.log("doUpdated: %o", sender)
  user_response.value = sender.data
}

</script>
<style>
.sv-container-modern__title {
  padding-top: 1em;
}
.sv-page__title {
  margin-bottom: 1em;
  font-size: 1.3em;
}
.sv-body__timer, .sv-body__page {
  margin-top: 0em;
}
h5 .sv-string-viewer {
  margin-top: 2em;
  font-weight: 500;
}
/* .survey {
  --primary: #4219b3;
  --background: #ffffff;
  --background-dim: #f3f3f3;
  --background-dim-light: #f9f9f9;
  --primary-foreground: #ffffff;
  --foreground: #161616;
  --base-unit: 8px;

} */
</style>