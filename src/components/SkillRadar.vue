<template>
  <div class="radar-chart-container">
    <h2>Skills Radar</h2>
    <div class="chart-wrapper">
      <svg class="radar-chart" width="300" height="300" viewBox="0 0 300 300">
        <!-- Grid circles -->
        <g class="grid">
          <circle cx="150" cy="150" r="120" fill="none" stroke="rgba(255, 232, 31, 0.1)" stroke-width="1"/>
          <circle cx="150" cy="150" r="90" fill="none" stroke="rgba(255, 232, 31, 0.1)" stroke-width="1"/>
          <circle cx="150" cy="150" r="60" fill="none" stroke="rgba(255, 232, 31, 0.1)" stroke-width="1"/>
          <circle cx="150" cy="150" r="30" fill="none" stroke="rgba(255, 232, 31, 0.1)" stroke-width="1"/>
        </g>
        
        <!-- Grid lines -->
        <g class="grid-lines">
          <line v-for="(skill, index) in skills" :key="index"
            x1="150" y1="150" 
            :x2="150 + Math.cos(getAngle(index) - Math.PI/2) * 120"
            :y2="150 + Math.sin(getAngle(index) - Math.PI/2) * 120"
            stroke="rgba(255, 232, 31, 0.2)" stroke-width="1"/>
        </g>
        
        <!-- Skill area -->
        <polygon 
          :points="getPolygonPoints()" 
          fill="rgba(255, 232, 31, 0.2)" 
          stroke="#ffe81f" 
          stroke-width="2"
          class="skill-area"
        />
        
        <!-- Skill points -->
        <circle 
          v-for="(skill, index) in skills" 
          :key="index"
          :cx="150 + Math.cos(getAngle(index) - Math.PI/2) * (skill.animatedLevel * 1.2)"
          :cy="150 + Math.sin(getAngle(index) - Math.PI/2) * (skill.animatedLevel * 1.2)"
          r="4" 
          fill="#ffe81f"
          class="skill-point"
          @mouseenter="hoveredSkill = skill.name"
          @mouseleave="hoveredSkill = null"
        />
        
        <!-- Skill labels -->
        <text 
          v-for="(skill, index) in skills" 
          :key="`label-${index}`"
          :x="150 + Math.cos(getAngle(index) - Math.PI/2) * 140"
          :y="150 + Math.sin(getAngle(index) - Math.PI/2) * 140"
          text-anchor="middle"
          dominant-baseline="middle"
          fill="#ffe81f"
          font-size="12"
          font-family="Orbitron"
          class="skill-label"
        >
          {{ skill.name }}
        </text>
      </svg>
      
      <!-- Hover tooltip -->
      <div v-if="hoveredSkill" class="skill-tooltip">
        {{ hoveredSkill }}: {{ getSkillLevel(hoveredSkill) }}%
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const skills = ref([
  { name: 'Flutter', level: 90, animatedLevel: 0 },
  { name: 'Vue.js', level: 85, animatedLevel: 0 },
  { name: 'JavaScript', level: 88, animatedLevel: 0 },
  { name: 'Firebase', level: 80, animatedLevel: 0 },
  { name: 'UI/UX', level: 80, animatedLevel: 0 },
  { name: 'API Dev', level: 85, animatedLevel: 0 }
])

const hoveredSkill = ref(null)

const getAngle = (index) => {
  return (index * 2 * Math.PI) / skills.value.length
}

const getPolygonPoints = () => {
  return skills.value.map((skill, index) => {
    const angle = getAngle(index) - Math.PI/2
    const x = 150 + Math.cos(angle) * (skill.animatedLevel * 1.2)
    const y = 150 + Math.sin(angle) * (skill.animatedLevel * 1.2)
    return `${x},${y}`
  }).join(' ')
}

const getSkillLevel = (skillName) => {
  const skill = skills.value.find(s => s.name === skillName)
  return skill ? skill.level : 0
}

onMounted(() => {
  // Animate skill levels
  setTimeout(() => {
    skills.value.forEach((skill, index) => {
      setTimeout(() => {
        skill.animatedLevel = skill.level
      }, index * 200)
    })
  }, 500)
})
</script>

<style scoped>
.radar-chart-container {
  text-align: center;
  color: #ffe81f;
  font-family: 'Orbitron', sans-serif;
  padding: 2rem;
}

.chart-wrapper {
  position: relative;
  display: inline-block;
}

.radar-chart {
  max-width: 100%;
  height: auto;
}

.skill-area {
  transition: all 1s ease-out;
  filter: drop-shadow(0 0 10px rgba(255, 232, 31, 0.3));
}

.skill-point {
  transition: all 0.8s ease-out;
  cursor: pointer;
}

.skill-point:hover {
  filter: drop-shadow(0 0 8px #ffe81f);
  transform: scale(1.5);
}

.skill-label {
  font-weight: bold;
  pointer-events: none;
}

.skill-tooltip {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: #ffe81f;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  white-space: nowrap;
}
</style>
