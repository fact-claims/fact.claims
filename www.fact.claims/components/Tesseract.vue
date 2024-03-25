<template>
    <div ref="container"></div>
  </template>
  
  <script setup>
  import * as THREE from 'three';
  
  const labels = ["Fact", "Evidence", "Truth", "Claims", "Assertions", "Statements", "IPFS", "Linked Data"];
  
  const init = () => {

    const vertices = [
        [-1, -1, -1, -1], // 0
        [-1, -1, -1, 1],  // 1
        [-1, -1, 1, -1],  // 2
        [-1, -1, 1, 1],   // 3
        [-1, 1, -1, -1],  // 4
        [-1, 1, -1, 1],   // 5
        [-1, 1, 1, -1],   // 6
        [-1, 1, 1, 1],    // 7
        [1, -1, -1, -1],  // 8
        [1, -1, -1, 1],   // 9
        [1, -1, 1, -1],   // 10
        [1, -1, 1, 1],    // 11
        [1, 1, -1, -1],   // 12
        [1, 1, -1, 1],    // 13
        [1, 1, 1, -1],    // 14
        [1, 1, 1, 1]      // 15
  ]
  
    // Create a scene
    const scene = new THREE.Scene();
  
    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
  
    // Create a renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
  
    // Create points and labels for each vertex
    const loader = new THREE.FontLoader();
    loader.load('fonts/helvetiker_regular.typeface.json', (font) => {
      vertices.forEach((vertex, index) => {
        const geometry = new THREE.SphereGeometry(0.1);
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const point = new THREE.Mesh(geometry, material);
        point.position.set(vertex[0], vertex[1], vertex[2]);
        scene.add(point);
  
        // Add labels
        const label = createLabel(labels[index], font);
        label.position.set(vertex[0] + 0.2, vertex[1] + 0.2, vertex[2] + 0.2);
        scene.add(label);
      });
    });
  
    // Function to create a label
    const createLabel = (text, font) => {
      const geometry = new THREE.TextGeometry(text, {
        font: font,
        size: 0.2,
        height: 0.05,
      });
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const mesh = new THREE.Mesh(geometry, material);
      return mesh;
    };
  
    // Function to animate
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
  
    animate();
  };
  
  onMounted(() => {
    init();
  });
  </script>
  
  <style scoped>
  #container {
    width: 100%;
    height: 100%;
  }
  </style>
  