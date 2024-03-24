<template>
    <svg ref="tesseract" class="tesseract"></svg>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';
import * as d3 from 'd3';

// Define the props
const props = defineProps({
    text: String,
    width: { type: Number, default: 256 },
    height: { type: Number, default: 256 }
});

// Initialize the tesseract animation when the component is mounted
onMounted(() => {
    createTesseractAnimation();
});

/**
 * Function to create the animated 4D tesseract
 * Each vertex (v) is assigned a one-character label
 * The label is the v-th character from the `text` property
 */
function createTesseractAnimation() {
    // Get a reference to the tesseract element
    const svg = d3.select('.tesseract');

    // Get the text prop
    const labelText = props.text || "oops";
    const numVertices = labelText.length;
    console.log("tesseract.size: %o", numVertices)

    // Set up your D3.js visualization for the tesseract animation
    svg.attr('width', props.width)
        .attr('height', props.height);

    // Example: Creating circles for each vertex with labels
    const vertexCircles = svg.selectAll('.vertex')
        .data(d3.range(numVertices))
        .enter()
        // .append('circle')
        // .attr('class', 'vertex')
        // .attr('r', 12)
        // .attr('cx', (d, i) => i * 40 + 20)
        // .attr('cy', props.height / 2)
        .append('text')
        .attr('r', 12)
        .attr('cx', (d, i) => i * 40 + 20)
        .attr('cy', props.height / 2)
        .attr('class', 'vertex-label')
        .attr('x', (d, i) => Math.cos(i / numVertices * Math.PI * 2) * 100 + props.width / 2)
        .attr('y', (d, i) => Math.sin(i / numVertices * Math.PI * 2) * 100 + props.height / 2 + 4)
        .attr('text-anchor', 'middle')
        .text(d => (d < labelText.length) ? labelText[d] : "" + d);

    // Update the positions of vertex circles with animation
    const updateVertexPositions = () => {
        vertexCircles
            .transition()
            .duration(1000)
            .attr('cx', (d, i) => Math.cos(i / numVertices * Math.PI * 2) * 150 + props.width / 2)
            .attr('cy', (d, i) => Math.sin(i / numVertices * Math.PI * 2) * 150 + props.height / 2);
    };

    // Call the update function to start the animation
    setInterval(() =>{
        updateVertexPositions();
        console.log("update")

    }, 1000
    )
}
</script>

<style>
.tesseract {
    /* Adjust the width and height if needed */
    border: 1px solid #000;
}
.tesseract .vertex {
    fill: #00ffff;
}
</style>
