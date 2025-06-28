<template>
  <div class="hologram-container" @mousemove="handleMouseMove" @mouseleave="resetHologram">
    <div class="hologram-image" :style="hologramStyle">
      <img :src="src" :alt="alt" />
      <div class="hologram-overlay"></div>
      <div class="hologram-glitch"></div>
      <div class="scan-line"></div>
    </div>
    <div class="hologram-base"></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: 'Hologram'
  }
})

const mouseX = ref(0)
const mouseY = ref(0)
const isHovered = ref(false)

const hologramStyle = computed(() => ({
  transform: `
    perspective(1000px) 
    rotateX(${isHovered.value ? (mouseY.value - 0.5) * 15 : 0}deg) 
    rotateY(${isHovered.value ? (mouseX.value - 0.5) * 15 : 0}deg)
    translateZ(${isHovered.value ? '20px' : '0px'})
  `,
  filter: `
    hue-rotate(${isHovered.value ? mouseX.value * 30 : 0}deg)
    brightness(${isHovered.value ? 1.2 : 1})
  `
}))

const handleMouseMove = (event) => {
  isHovered.value = true
  const rect = event.currentTarget.getBoundingClientRect()
  mouseX.value = (event.clientX - rect.left) / rect.width
  mouseY.value = (event.clientY - rect.top) / rect.height
}

const resetHologram = () => {
  isHovered.value = false
  mouseX.value = 0
  mouseY.value = 0
}
</script>

<style scoped>
.hologram-container {
  position: relative;
  display: inline-block;
  cursor: pointer;
  perspective: 1000px;
}

.hologram-image {
  position: relative;
  width: 400px;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  transform-style: preserve-3d;
}

.hologram-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s ease;
}

.hologram-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    rgba(0, 255, 255, 0.1) 0%,
    rgba(255, 0, 255, 0.1) 25%,
    rgba(255, 255, 0, 0.1) 50%,
    rgba(0, 255, 255, 0.1) 75%,
    rgba(255, 0, 255, 0.1) 100%
  );
  background-size: 400% 400%;
  animation: hologram-shift 3s ease-in-out infinite;
  opacity: 0.7;
  mix-blend-mode: screen;
}

.hologram-glitch {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 2px,
    rgba(255, 232, 31, 0.03) 2px,
    rgba(255, 232, 31, 0.03) 4px
  );
  animation: glitch-lines 2s linear infinite;
}

.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00ffff, transparent);
  animation: scan 2.5s linear infinite;
  box-shadow: 0 0 10px #00ffff;
}

.hologram-base {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 350px;
  height: 20px;
  background: linear-gradient(
    ellipse,
    rgba(255, 232, 31, 0.3) 0%,
    rgba(255, 232, 31, 0.1) 50%,
    transparent 100%
  );
  border-radius: 50%;
  animation: base-pulse 2s ease-in-out infinite;
}

.hologram-container:hover .hologram-image {
  box-shadow: 
    0 0 30px rgba(0, 255, 255, 0.5),
    0 0 60px rgba(255, 0, 255, 0.3),
    0 0 90px rgba(255, 232, 31, 0.2);
}

.hologram-container:hover .hologram-overlay {
  opacity: 1;
  animation-duration: 1s;
}

.hologram-container:hover .scan-line {
  animation-duration: 1s;
}

@keyframes hologram-shift {
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
}

@keyframes glitch-lines {
  0% { transform: translateX(0); }
  10% { transform: translateX(-2px); }
  20% { transform: translateX(2px); }
  30% { transform: translateX(0); }
  100% { transform: translateX(0); }
}

@keyframes scan {
  0% { top: 0; opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

@keyframes base-pulse {
  0%, 100% { opacity: 0.5; transform: translateX(-50%) scale(1); }
  50% { opacity: 1; transform: translateX(-50%) scale(1.1); }
}

@media (max-width: 768px) {
  .hologram-image {
    width: 280px;
    height: 280px;
  }
  
  .hologram-base {
    width: 250px;
  }
}
</style>
