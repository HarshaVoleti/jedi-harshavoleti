<template>
  <div class="planets-container">
    <div
      v-for="(planet, index) in planets"
      :key="index"
      class="planet"
      :class="planet.type"
      :style="{
        left: planet.x + 'px',
        top: planet.y + 'px',
        transform: `scale(${planet.scale})`,
        animationDelay: planet.delay + 's'
      }"
      @mousedown="startDrag(index, $event)"
      @touchstart="startDrag(index, $event)"
    >
      <div class="planet-glow"></div>
      <div class="planet-ring" v-if="planet.hasRing"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const planets = ref([])
const dragging = ref(null)
const offset = ref({ x: 0, y: 0 })

const planetTypes = [
  { type: 'tatooine', hasRing: false, color: '#D2B48C' },
  { type: 'coruscant', hasRing: false, color: '#4169E1' },
  { type: 'endor', hasRing: false, color: '#228B22' },
  { type: 'hoth', hasRing: false, color: '#F0F8FF' },
  { type: 'mustafar', hasRing: false, color: '#FF4500' },
  { type: 'saturn', hasRing: true, color: '#DAA520' }
]

onMounted(() => {
  // Create planets
  for (let i = 0; i < 6; i++) {
    const planetType = planetTypes[i]
    planets.value.push({
      ...planetType,
      x: Math.random() * (window.innerWidth - 100),
      y: Math.random() * (window.innerHeight - 100),
      scale: Math.random() * 0.5 + 0.5, // 0.5 to 1.0
      delay: Math.random() * 5
    })
  }
})

const startDrag = (index, event) => {
  event.preventDefault()
  dragging.value = index
  
  const clientX = event.touches ? event.touches[0].clientX : event.clientX
  const clientY = event.touches ? event.touches[0].clientY : event.clientY
  
  offset.value = {
    x: clientX - planets.value[index].x,
    y: clientY - planets.value[index].y
  }
  
  document.addEventListener('mousemove', drag)
  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('touchmove', drag)
  document.addEventListener('touchend', stopDrag)
}

const drag = (event) => {
  if (dragging.value === null) return
  
  const clientX = event.touches ? event.touches[0].clientX : event.clientX
  const clientY = event.touches ? event.touches[0].clientY : event.clientY
  
  planets.value[dragging.value].x = clientX - offset.value.x
  planets.value[dragging.value].y = clientY - offset.value.y
}

const stopDrag = () => {
  dragging.value = null
  document.removeEventListener('mousemove', drag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', drag)
  document.removeEventListener('touchend', stopDrag)
}

onUnmounted(() => {
  document.removeEventListener('mousemove', drag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', drag)
  document.removeEventListener('touchend', stopDrag)
})
</script>

<style scoped>
.planets-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}

.planet {
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: grab;
  pointer-events: auto;
  animation: float-planet 20s infinite linear;
  transition: transform 0.2s ease;
}

.planet:active {
  cursor: grabbing;
  transform: scale(1.1) !important;
}

.planet-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: inherit;
  filter: blur(2px);
  opacity: 0.6;
  animation: pulse-glow 3s ease-in-out infinite;
}

.planet-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120%;
  height: 20%;
  border: 2px solid rgba(255, 232, 31, 0.6);
  border-radius: 50%;
  transform: translate(-50%, -50%) rotateX(75deg);
  animation: rotate-ring 15s linear infinite;
}

/* Planet Types */
.tatooine {
  background: radial-gradient(circle at 30% 30%, #F4A460, #D2B48C, #CD853F);
  box-shadow: 0 0 20px rgba(244, 164, 96, 0.5);
}

.coruscant {
  background: radial-gradient(circle at 30% 30%, #4169E1, #1E90FF, #000080);
  box-shadow: 0 0 20px rgba(65, 105, 225, 0.5);
}

.endor {
  background: radial-gradient(circle at 30% 30%, #32CD32, #228B22, #006400);
  box-shadow: 0 0 20px rgba(34, 139, 34, 0.5);
}

.hoth {
  background: radial-gradient(circle at 30% 30%, #F0F8FF, #E6E6FA, #B0C4DE);
  box-shadow: 0 0 20px rgba(240, 248, 255, 0.5);
}

.mustafar {
  background: radial-gradient(circle at 30% 30%, #FF6347, #FF4500, #8B0000);
  box-shadow: 0 0 20px rgba(255, 69, 0, 0.7);
}

.saturn {
  background: radial-gradient(circle at 30% 30%, #DAA520, #B8860B, #8B6914);
  box-shadow: 0 0 20px rgba(218, 165, 32, 0.5);
}

@keyframes float-planet {
  0% { transform: rotate(0deg) translateY(0px); }
  25% { transform: rotate(90deg) translateY(-10px); }
  50% { transform: rotate(180deg) translateY(0px); }
  75% { transform: rotate(270deg) translateY(10px); }
  100% { transform: rotate(360deg) translateY(0px); }
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
}

@keyframes rotate-ring {
  0% { transform: translate(-50%, -50%) rotateX(75deg) rotateZ(0deg); }
  100% { transform: translate(-50%, -50%) rotateX(75deg) rotateZ(360deg); }
}

@media (max-width: 768px) {
  .planet {
    width: 40px;
    height: 40px;
  }
}
</style>
