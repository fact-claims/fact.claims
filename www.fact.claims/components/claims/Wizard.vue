<template>
  <div class="wizard">
    <slot v-if="completed"></slot>
    <div v-if="!completed" ref="surveyContainer"></div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import 'survey-core/modern.min.css';

export default {
  props: {
    name: {
      type: String,
      required: false,
    },
    claim: {
      type: Object,
      required: true,
    },
    modelValue: {
      type: Object,
      required: false,
    },
  },
  setup(props, context) {
    const surveyContainer = ref(null);
    const completed = ref(false);

    const loadSurvey = async () => {
      if (!process.client) return;
      try {
        const { Survey } = await import('survey-knockout-ui');
        const survey = new Survey(props.claim);

        survey.data = props.modelValue || {};

        survey.sendResultOnPageNext = true;
        survey.showCompletedPage = false;
        console.log("wizard.survey: %o -> %o --> %o", survey, props.claim, props.modelValue);

      //   completed.value = !!props.claim?.$?.isCompleted;
      //   if (completed.value) {
      //       survey.mode = 'display';
      //       // survey.showNavigationButtons = false;
      //       // survey.showProgressBar = 'top';
      //       context.emit('completed', survey);
      //  }

        survey.render(surveyContainer.value);
        survey.onComplete.add((sender) => {
          // completed.value = sender.data.$.isCompleted = true;
          context.emit('completed', sender);
        });
        survey.onValueChanged.add((sender) => {
          context.emit('updated', sender);
        });
      } catch (error) {
        console.error('wizard.wizard.error: %o -> %o', props, error);
      }
    };

    onMounted(() => {
      loadSurvey();
    });

    function syncModelValue(data: any) {
      // this.modelValue = data
    }

    return { surveyContainer, completed };
  },
};
</script>
<style>
.wizard .sv-tagbox__item {
  border: none !important; 
}
</style>
