<template>
  <div class="mouse-trail-container">
    <!-- Mouse trail particles -->
    <div
      v-for="(particle, index) in particles"
      :key="index"
      class="trail-particle"
      :style="{
        left: particle.x + 'px',
        top: particle.y + 'px',
        opacity: particle.opacity,
        transform: `scale(${particle.scale}) rotate(${particle.rotation}deg)`,
        background: particle.color,
        boxShadow: `0 0 ${particle.glow}px ${particle.color}`
      }"
    ></div>
    
    <!-- Force effects -->
    <div
      v-for="(effect, index) in forceEffects"
      :key="`force-${index}`"
      class="force-effect"
      :style="{
        left: effect.x + 'px',
        top: effect.y + 'px',
        opacity: effect.opacity,
        transform: `scale(${effect.scale})`
      }"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const particles = ref([])
const forceEffects = ref([])
const maxParticles = 20
const maxForceEffects = 5

const colors = ['#ffe81f', '#00ffff', '#ff69b4', '#00ff00', '#ff4500']

let animationId = null

const createParticle = (x, y) => {
  const particle = {
    x: x - 3,
    y: y - 3,
    opacity: 1,
    scale: Math.random() * 0.5 + 0.5,
    rotation: Math.random() * 360,
    color: colors[Math.floor(Math.random() * colors.length)],
    glow: Math.random() * 10 + 5,
    velocity: {
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2
    }
  }
  
  particles.value.push(particle)
  
  if (particles.value.length > maxParticles) {
    particles.value.shift()
  }
}

const createForceEffect = (x, y) => {
  if (Math.random() < 0.1) { // 10% chance
    const effect = {
      x: x - 25,
      y: y - 25,
      opacity: 0.8,
      scale: 0.1
    }
    
    forceEffects.value.push(effect)
    
    if (forceEffects.value.length > maxForceEffects) {
      forceEffects.value.shift()
    }
  }
}

const updateParticles = () => {
  particles.value.forEach((particle, index) => {
    particle.opacity -= 0.03
    particle.scale *= 0.98
    particle.x += particle.velocity.x
    particle.y += particle.velocity.y
    particle.rotation += 2
    
    if (particle.opacity <= 0) {
      particles.value.splice(index, 1)
    }
  })
  
  forceEffects.value.forEach((effect, index) => {
    effect.opacity -= 0.02
    effect.scale += 0.05
    
    if (effect.opacity <= 0) {
      forceEffects.value.splice(index, 1)
    }
  })
}

const animate = () => {
  updateParticles()
  animationId = requestAnimationFrame(animate)
}

const handleMouseMove = (event) => {
  createParticle(event.clientX, event.clientY)
  createForceEffect(event.clientX, event.clientY)
}

const handleClick = (event) => {
  // Create burst effect on click
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      createParticle(
        event.clientX + (Math.random() - 0.5) * 50,
        event.clientY + (Math.random() - 0.5) * 50
      )
    }, i * 20)
  }
  
  // Create force wave
  createForceEffect(event.clientX, event.clientY)
}

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('click', handleClick)
  animate()
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('click', handleClick)
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style scoped>
.mouse-trail-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 999;
  overflow: hidden;
}

.trail-particle {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  pointer-events: none;
  transition: opacity 0.1s ease;
}

.force-effect {
  position: absolute;
  width: 50px;
  height: 50px;
  border: 2px solid #ffe81f;
  border-radius: 50%;
  pointer-events: none;
  background: radial-gradient(
    circle,
    rgba(255, 232, 31, 0.3) 0%,
    rgba(255, 232, 31, 0.1) 50%,
    transparent 100%
  );
  animation: force-pulse 1s ease-out forwards;
}

@keyframes force-pulse {
  0% {
    transform: scale(0.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

/* Disable on mobile for performance */
@media (max-width: 768px) {
  .mouse-trail-container {
    display: none;
  }
}
</style>
