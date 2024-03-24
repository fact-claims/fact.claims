<template>
  <div>
    <OrganismsWizard :wizard="wizard" @completed="doCompleted" @updated="doUpdated" class="survey" :singleton="false">
      <h1 v-if="ai?.pending">pending</h1>
      <div v-if="ai?.context">
        <MoleculesJSON :data="ai.context"></MoleculesJSON>
      </div>
      <div v-if="ai?.content">
        <MoleculesJSON :data="ai.content"></MoleculesJSON>
      </div>
    </OrganismsWizard>
  </div>
</template>

<script setup lang="ts">
// @ts-expect-error avoid lint error
import markdownParser from '@nuxt/content/transformers/markdown';

const router = useRouter();
const { params } = useRoute();
const { data: wizard } = await useAsyncData(`wizard-${params.wizard}`, () => {
  return queryContent().where({ "_path": "/wizard/" + params.wizard }).findOne()
})
const user_response = ref()
const ai = ref()

const doCompleted = async (sender: any) => {
  console.log("wizard.doCompleted: %o", sender.data)
  user_response.value = sender.data

  await useAsyncData(`wizard-`+params.wizard, async () => {
    console.log("wizard.useFetch: %o -> %o", params.wizard, user_response.value)
    const ask_ai = await useFetch("/api/openai/" + params.wizard, {
      method: 'POST',
      headers: { "content-type":"application/json" },
      body: JSON.stringify(user_response.value),
    })
    if (ask_ai && ask_ai.data.value) {
      ai.value = ask_ai.data.value
      let meta = (wizard.value as any).meta || {}
      console.log("wizard.done.ai: %o -> %o", ai.value, meta )
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