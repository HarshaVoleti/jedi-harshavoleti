<template>
  <div class="jedi-elements">
    <!-- Floating Lightsabers -->
    <div
      v-for="(saber, index) in lightsabers"
      :key="`saber-${index}`"
      class="lightsaber"
      :class="saber.color"
      :style="{
        left: saber.x + 'px',
        top: saber.y + 'px',
        transform: `rotate(${saber.rotation}deg)`
      }"
      @mousedown="startDragSaber(index, $event)"
      @touchstart="startDragSaber(index, $event)"
    >
      <div class="saber-hilt"></div>
      <div class="saber-blade"></div>
      <div class="saber-glow"></div>
    </div>

    <!-- Floating Jedi Symbols -->
    <div
      v-for="(symbol, index) in jediSymbols"
      :key="`symbol-${index}`"
      class="jedi-symbol"
      :style="{
        left: symbol.x + 'px',
        top: symbol.y + 'px',
        transform: `rotate(${symbol.rotation}deg) scale(${symbol.scale})`
      }"
      @mousedown="startDragSymbol(index, $event)"
      @touchstart="startDragSymbol(index, $event)"
    >
      {{ symbol.icon }}
    </div>

    <!-- Force Effects -->
    <div
      v-for="(effect, index) in forceEffects"
      :key="`effect-${index}`"
      class="force-effect"
      :style="{
        left: effect.x + 'px',
        top: effect.y + 'px'
      }"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const lightsabers = ref([])
const jediSymbols = ref([])
const forceEffects = ref([])
const dragging = ref({ type: null, index: null })
const offset = ref({ x: 0, y: 0 })

const saberColors = ['blue', 'green', 'red', 'purple']
const jediIcons = ['⚡', '🌟', '✨', '🔮', '⭐']

onMounted(() => {
  // Create lightsabers
  for (let i = 0; i < 3; i++) {
    lightsabers.value.push({
      x: Math.random() * (window.innerWidth - 100),
      y: Math.random() * (window.innerHeight - 100),
      rotation: Math.random() * 360,
      color: saberColors[Math.floor(Math.random() * saberColors.length)]
    })
  }

  // Create Jedi symbols
  for (let i = 0; i < 5; i++) {
    jediSymbols.value.push({
      x: Math.random() * (window.innerWidth - 50),
      y: Math.random() * (window.innerHeight - 50),
      rotation: Math.random() * 360,
      scale: Math.random() * 0.5 + 0.5,
      icon: jediIcons[Math.floor(Math.random() * jediIcons.length)]
    })
  }

  // Create force effects
  setInterval(createForceEffect, 3000)
})

const createForceEffect = () => {
  if (forceEffects.value.length < 3) {
    forceEffects.value.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight
    })

    // Remove effect after animation
    setTimeout(() => {
      forceEffects.value.shift()
    }, 2000)
  }
}

const startDragSaber = (index, event) => {
  startDrag('saber', index, event)
}

const startDragSymbol = (index, event) => {
  startDrag('symbol', index, event)
}

const startDrag = (type, index, event) => {
  event.preventDefault()
  dragging.value = { type, index }
  
  const clientX = event.touches ? event.touches[0].clientX : event.clientX
  const clientY = event.touches ? event.touches[0].clientY : event.clientY
  
  const item = type === 'saber' ? lightsabers.value[index] : jediSymbols.value[index]
  
  offset.value = {
    x: clientX - item.x,
    y: clientY - item.y
  }
  
  document.addEventListener('mousemove', drag)
  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('touchmove', drag)
  document.addEventListener('touchend', stopDrag)
}

const drag = (event) => {
  if (!dragging.value.type) return
  
  const clientX = event.touches ? event.touches[0].clientX : event.clientX
  const clientY = event.touches ? event.touches[0].clientY : event.clientY
  
  const items = dragging.value.type === 'saber' ? lightsabers.value : jediSymbols.value
  const item = items[dragging.value.index]
  
  item.x = clientX - offset.value.x
  item.y = clientY - offset.value.y
  
  // Rotate while dragging for cool effect
  item.rotation += 2
}

const stopDrag = () => {
  dragging.value = { type: null, index: null }
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
.jedi-elements {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 3;
}

/* Lightsaber Styles */
.lightsaber {
  position: absolute;
  width: 80px;
  height: 12px;
  cursor: grab;
  pointer-events: auto;
  transition: transform 0.2s ease;
}

.lightsaber:active {
  cursor: grabbing;
  transform: scale(1.1) !important;
}

.saber-hilt {
  position: absolute;
  left: 0;
  top: 0;
  width: 20px;
  height: 12px;
  background: linear-gradient(45deg, #333, #666, #333);
  border-radius: 2px;
  border: 1px solid #222;
}

.saber-blade {
  position: absolute;
  left: 20px;
  top: 2px;
  width: 60px;
  height: 8px;
  border-radius: 4px;
  animation: blade-hum 2s ease-in-out infinite;
}

.saber-glow {
  position: absolute;
  left: 20px;
  top: 0;
  width: 60px;
  height: 12px;
  border-radius: 6px;
  filter: blur(3px);
  opacity: 0.6;
  animation: blade-glow 2s ease-in-out infinite;
}

/* Lightsaber Colors */
.blue .saber-blade { background: #00BFFF; }
.blue .saber-glow { background: #00BFFF; }

.green .saber-blade { background: #32CD32; }
.green .saber-glow { background: #32CD32; }

.red .saber-blade { background: #FF4500; }
.red .saber-glow { background: #FF4500; }

.purple .saber-blade { background: #8A2BE2; }
.purple .saber-glow { background: #8A2BE2; }

/* Jedi Symbol Styles */
.jedi-symbol {
  position: absolute;
  font-size: 2rem;
  cursor: grab;
  pointer-events: auto;
  animation: symbol-float 6s ease-in-out infinite;
  filter: drop-shadow(0 0 10px #ffe81f);
  transition: transform 0.2s ease;
}

.jedi-symbol:active {
  cursor: grabbing;
  transform: scale(1.2) !important;
}

/* Force Effect Styles */
.force-effect {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 232, 31, 0.3), transparent);
  animation: force-pulse 2s ease-out forwards;
  pointer-events: none;
}

@keyframes blade-hum {
  0%, 100% { opacity: 1; transform: scaleY(1); }
  50% { opacity: 0.8; transform: scaleY(1.1); }
}

@keyframes blade-glow {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
}

@keyframes symbol-float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(90deg); }
  50% { transform: translateY(0px) rotate(180deg); }
  75% { transform: translateY(10px) rotate(270deg); }
}

@keyframes force-pulse {
  0% {
    transform: scale(0);
    opacity: 0.8;
  }
  100% {
    transform: scale(3);
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .lightsaber {
    width: 60px;
    height: 10px;
  }
  
  .saber-blade {
    width: 40px;
    height: 6px;
  }
  
  .saber-glow {
    width: 40px;
    height: 10px;
  }
  
  .jedi-symbol {
    font-size: 1.5rem;
  }
}
</style>
