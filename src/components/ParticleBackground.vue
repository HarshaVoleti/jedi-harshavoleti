<template>
  <div class="particle-background">
    <div
      v-for="(particle, index) in particles"
      :key="index"
      class="particle"
      :style="{
        left: particle.x + 'px',
        top: particle.y + 'px',
        animationDuration: particle.duration + 's',
        animationDelay: particle.delay + 's'
      }"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const particles = ref([])

onMounted(() => {
  // Create particles
  for (let i = 0; i < 50; i++) {
    particles.value.push({
      x: Math.random() * (window.innerWidth || 1200),
      y: Math.random() * (window.innerHeight || 800),
      duration: Math.random() * 15 + 8, // 8-23 seconds
      delay: Math.random() * 3 // 0-3 seconds delay
    })
  }
})
</script>

<style scoped>
.particle-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: #ffe81f;
  border-radius: 50%;
  opacity: 0.8;
  animation: float infinite linear;
  box-shadow: 0 0 6px #ffe81f;
}

.particle:nth-child(3n) {
  background: #ffffff;
  opacity: 0.4;
}

.particle:nth-child(5n) {
  width: 1px;
  height: 1px;
  opacity: 0.8;
}

@keyframes float {
  0% {
    transform: translateY(100vh) translateX(-20px);
    opacity: 0;
  }
  5% {
    opacity: 0.8;
  }
  95% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(-100px) translateX(20px);
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .particle-background {
    z-index: 0;
  }
  
  .particle {
    width: 2px;
    height: 2px;
    opacity: 0.5;
  }
}
</style>
