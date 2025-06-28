<!-- src/components/Skills.vue -->
<template>
    <section class="skills-section">
      <h2>Skills & Expertise</h2>
      <div class="skills-container">
        <div 
          v-for="skill in animatedSkills" 
          :key="skill.name" 
          class="skill-item"
        >
          <div class="skill-header">
            <span class="skill-name">{{ skill.name }}</span>
            <span class="skill-percentage">{{ skill.animatedLevel }}%</span>
          </div>
          <div class="skill-bar">
            <div 
              class="skill-progress" 
              :style="{ width: skill.animatedLevel + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'

  const skillsWithLevels = [
    { name: 'Flutter', level: 90 },
    { name: 'Vue.js', level: 85 },
    { name: 'JavaScript', level: 88 },
    { name: 'Firebase', level: 80 },
    { name: 'SQL Server', level: 75 },
    { name: 'REST API', level: 85 },
    { name: 'HTML/CSS', level: 90 },
    { name: 'Git & GitHub', level: 85 },
    { name: 'UI/UX', level: 80 },
    { name: 'Marketing Strategy', level: 70 }
  ]

  const animatedSkills = ref([])

  onMounted(() => {
    // Initialize with 0 levels for animation
    animatedSkills.value = skillsWithLevels.map(skill => ({ ...skill, animatedLevel: 0 }))
    
    // Animate levels after a delay
    setTimeout(() => {
      animatedSkills.value.forEach((skill, index) => {
        setTimeout(() => {
          skill.animatedLevel = skill.level
        }, index * 200) // Stagger animations
      })
    }, 500)
  })
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
    margin-bottom: 2rem;
    -webkit-text-stroke: 0.5px #ffe81f;
    color: transparent;
  }

  .skills-container {
    max-width: 800px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    text-align: left;
  }

  .skill-item {
    margin-bottom: 1rem;
  }

  .skill-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .skill-name {
    font-weight: bold;
    color: #ffe81f;
  }

  .skill-percentage {
    color: #ccc;
    font-size: 0.9rem;
  }

  .skill-bar {
    height: 8px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid rgba(255, 232, 31, 0.3);
  }

  .skill-progress {
    height: 100%;
    background: linear-gradient(90deg, #ffe81f 0%, #fff500 100%);
    border-radius: 4px;
    transition: width 1s ease-out;
    box-shadow: 0 0 10px rgba(255, 232, 31, 0.5);
  }

  @media (max-width: 768px) {
    .skills-container {
      grid-template-columns: 1fr;
    }
  }
  </style>
  