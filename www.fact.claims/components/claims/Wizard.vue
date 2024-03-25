<template>
  <div>
    <slot v-if="completed"></slot>
    <div v-if="!completed" ref="surveyContainer"></div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import 'survey-core/modern.min.css';

export default {
  props: {
    singleton: {
      type: Boolean,
      default: true,
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
      try {
        const { Survey } = await import('survey-knockout-ui');
        const survey = new Survey(props.claim);

        // Survey.applyTheme("defaultV2");
        survey.sendResultOnPageNext = true;
        survey.showCompletedPage = false;
        console.log("claim.survey: %s -> %o", survey, props.claim);

        const checkpoint_id = props.claim._id;
        let checkpoint = null;

        if (process.client) {
          checkpoint = localStorage.getItem(checkpoint_id) || null;
          if (checkpoint) {
            checkpoint = JSON.parse(checkpoint);
            completed.value = !!checkpoint?.meta?.isCompleted && props.singleton;
            syncModelValue(checkpoint.data);
            console.log("claim.recovered: %s -> %o", checkpoint_id, completed.value);

            if (completed.value) {
              survey.mode = 'display';
              // survey.showNavigationButtons = false;
              // survey.showProgressBar = 'top';
              context.emit('completed', checkpoint);
            }
          }
        }

        survey.render(surveyContainer.value);
        survey.onComplete.add((sender) => {
          const checkpoint = { id: checkpoint_id, meta: props.claim, data: sender.data };
          completed.value = checkpoint.meta.isCompleted = true;
          localStorage.setItem(checkpoint_id, JSON.stringify(checkpoint));
          context.emit('completed', checkpoint);
        });
        survey.onValueChanged.add((sender) => {
          const checkpoint = { id: checkpoint_id, meta: props.claim, data: sender.data };
          localStorage.setItem(checkpoint_id, JSON.stringify(checkpoint));
          context.emit('updated', checkpoint);
        });
      } catch (error) {
        console.error('claim.wizard.error: %o -> %o', props, error);
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
