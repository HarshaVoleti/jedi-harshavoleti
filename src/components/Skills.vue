<!-- src/components/Skills.vue -->
<template>
    <section class="skills-section">
      <h2>Skills</h2>
      <ul class="skills-list">
        <li v-for="skill in skills" :key="skill">{{ skill }}</li>
      </ul>
    </section>
  </template>
  
  <script setup>
  const skills = [
    'Flutter', 'Dart', 'Vue.js', 'JavaScript', 'Firebase',
    'SQL Server', 'REST API', 'HTML/CSS', 'Bootstrap',
    'Git & GitHub', 'UI/UX', 'Marketing Strategy'
  ]
  </script>
  
  <style scoped>
  .skills-section {
    padding: 3rem 1.5rem 2rem;
    text-align: center;
    font-family: 'Orbitron', sans-serif;
    color: #ffe81f;
  }
  
  .skills-section h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    -webkit-text-stroke: 0.5px #ffe81f;
    color: transparent;
  }
  
  .skills-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .skills-list li {
    border: 1px solid #ffe81f;
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    transition: 0.3s;
    background: transparent;
  }
  
  .skills-list li:hover {
    background-color: #ffe81f;
    color: #000;
    cursor: default;
  }
  </style>
  