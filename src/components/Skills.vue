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
    padding: 4rem 1.5rem 3rem;
    text-align: center;
    font-family: 'Orbitron', sans-serif;
    color: var(--text-color);
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    margin: 2rem 0;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .skills-section h2 {
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: transparent;
    -webkit-text-stroke: 1px var(--accent-color);
    text-shadow: 0 0 20px var(--accent-color);
    position: relative;
  }

  .skills-section h2::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--accent-color), transparent);
  }

  .skills-container {
    max-width: 900px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    text-align: left;
  }

  .skill-item {
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: rgba(255, 232, 31, 0.05);
    border: 1px solid rgba(255, 232, 31, 0.2);
    border-radius: 12px;
    transition: all 0.3s ease;
  }

  .skill-item:hover {
    background: rgba(255, 232, 31, 0.1);
    border-color: var(--accent-color);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255, 232, 31, 0.3);
  }

  .skill-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.8rem;
    align-items: center;
  }

  .skill-name {
    font-weight: bold;
    color: var(--accent-color);
    font-size: 1.1rem;
  }

  .skill-percentage {
    color: var(--text-secondary);
    font-size: 0.9rem;
    font-weight: bold;
  }

  .skill-bar {
    height: 10px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid rgba(255, 232, 31, 0.3);
    position: relative;
  }

  .skill-progress {
    height: 100%;
    background: linear-gradient(90deg, #ffe81f 0%, #fff500 50%, #ffe81f 100%);
    border-radius: 8px;
    transition: width 1.5s ease-out;
    box-shadow: 0 0 15px rgba(255, 232, 31, 0.6);
    position: relative;
  }

  .skill-progress::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  @media (max-width: 768px) {
    .skills-section {
      padding: 3rem 1rem 2rem;
    }
    
    .skills-section h2 {
      font-size: 2rem;
    }
    
    .skills-container {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .skill-item {
      padding: 0.8rem;
    }
  }
  </style>
  