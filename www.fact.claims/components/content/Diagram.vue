<template>
  <div class="w-full">
    <div :ref="diagram" class="diagram flex justify-center"><slot></slot></div>
  </div>
</template>
<script>
import mermaid from "mermaid";

export default {
  data() {
    return {
      svgImage: null,
      diagram: null,
    };
  },
  methods: {
    async initilizeMermaid() {
      console.log("mermaid");

      let el = this.$refs[this.diagram];

      const { svg, bindFunctions } = await mermaid.render(
        this.diagram,
        this.getParsedText(el)
      );
      this.svgImage = svg;
      el.innerHTML = svg;
      bindFunctions(el);
    },
    getParsedText(el) {
      let el2 = el.querySelector("pre>code").innerHTML;
      let txt = document.createElement("textarea");
      txt.innerHTML = el2;
      return txt.value;
    },
    generateUniqueId() {
      const idLength = 6;
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      const id = Array.from(
        { length: idLength },
        () => chars[Math.floor(Math.random() * chars.length)]
      ).join("");

      return id;
    },
  },
  created() {
    this.diagram = this.generateUniqueId();
  },
  async mounted() {
    await this.initilizeMermaid();
  },
};
</script>
