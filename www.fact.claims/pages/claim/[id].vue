<template>
  <div>
    <h2>Hello</h2>
    <!-- <Organismsclaim :claim="claim" @completed="doCompleted" @updated="doUpdated" class="survey" :singleton="false">
      <h1 v-if="ai?.pending">pending</h1>
      <div v-if="ai?.context">
        <MoleculesJSON :data="ai.context"></MoleculesJSON>
      </div>
      <div v-if="ai?.content">
        <MoleculesJSON :data="ai.content"></MoleculesJSON>
      </div>
    </Organismsclaim> -->
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

const doCompleted = async (sender: any) => {
  console.log("claim.doCompleted: %o", sender.data)
  user_response.value = sender.data

  await useAsyncData(`claim-`+params.id, async () => {
    console.log("claim.useFetch: %o -> %o", params.id, user_response.value)
    const ask_ai = await useFetch("/api/openai/" + params.id, {
      method: 'POST',
      headers: { "content-type":"application/json" },
      body: JSON.stringify(user_response.value),
    })
    if (ask_ai && ask_ai.data.value) {
      ai.value = ask_ai.data.value
      let meta = (claim.value as any).meta || {}
      console.log("claim.done.ai: %o -> %o", ai.value, meta )
      // if (meta.goto) {
      //   const goto = meta.goto+ai.value.context.id
      //   router.push(goto);
      // }
    } 
  })
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
.survey {
  --primary: #4219b3;
  --background: #ffffff;
  --background-dim: #f3f3f3;
  --background-dim-light: #f9f9f9;
  --primary-foreground: #ffffff;
  --foreground: #161616;
  --base-unit: 8px;

}
</style>