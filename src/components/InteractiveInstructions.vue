<template>
  <div class="instructions-tooltip" v-if="showInstructions">
    <div class="tooltip-content">
      <h3>🌌 Interactive Star Wars Elements</h3>
      <p>🪐 <strong>Drag planets</strong> around the galaxy</p>
      <p>⚔️ <strong>Move lightsabers</strong> and symbols</p>
      <p>💀 <strong>Click Death Star</strong> to fire superlaser!</p>
      <button @click="hideInstructions" class="got-it-btn">Got it!</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showInstructions = ref(false)

onMounted(() => {
  // Show instructions after a delay
  setTimeout(() => {
    showInstructions.value = true
  }, 3000)
})

const hideInstructions = () => {
  showInstructions.value = false
  localStorage.setItem('starwars-instructions-seen', 'true')
}

// Check if user has seen instructions before
onMounted(() => {
  const seen = localStorage.getItem('starwars-instructions-seen')
  if (!seen) {
    setTimeout(() => {
      showInstructions.value = true
    }, 3000)
  }
})
</script>

<style scoped>
.instructions-tooltip {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  animation: slide-in 0.5s ease-out;
}

.tooltip-content {
  background: rgba(0, 0, 0, 0.9);
  border: 2px solid #ffe81f;
  border-radius: 12px;
  padding: 2rem;
  color: #ffe81f;
  font-family: 'Orbitron', sans-serif;
  text-align: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 30px rgba(255, 232, 31, 0.3);
  max-width: 300px;
}

.tooltip-content h3 {
  margin: 0 0 1rem 0;
  color: #ffe81f;
}

.tooltip-content p {
  margin: 0.5rem 0;
  font-size: 0.9rem;
}

.got-it-btn {
  background: #ffe81f;
  color: #000;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.3s ease;
}

.got-it-btn:hover {
  background: #fff500;
  transform: translateY(-2px);
}

@keyframes slide-in {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
