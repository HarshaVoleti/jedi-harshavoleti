<template>
  <div class="sound-manager">
    <!-- Audio elements for different sounds -->
    <audio ref="lightsaberHum" preload="auto" loop>
      <!-- Using data URL for a simple tone - in production you'd use actual sound files -->
    </audio>
    <audio ref="buttonClick" preload="auto">
    </audio>
    <audio ref="forceEffect" preload="auto">
    </audio>
    
    <!-- Sound control toggle -->
    <button 
      class="sound-toggle" 
      @click="toggleSound" 
      :title="soundEnabled ? 'Disable Sound' : 'Enable Sound'"
    >
      {{ soundEnabled ? '🔊' : '🔇' }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const soundEnabled = ref(true)
const lightsaberHum = ref(null)
const buttonClick = ref(null)
const forceEffect = ref(null)

// Simple audio generation using Web Audio API
const audioContext = ref(null)

const createBeepSound = (frequency = 440, duration = 200, type = 'sine') => {
  if (!soundEnabled.value || !audioContext.value) return
  
  const oscillator = audioContext.value.createOscillator()
  const gainNode = audioContext.value.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.value.destination)
  
  oscillator.frequency.value = frequency
  oscillator.type = type
  
  gainNode.gain.setValueAtTime(0, audioContext.value.currentTime)
  gainNode.gain.linearRampToValueAtTime(0.1, audioContext.value.currentTime + 0.01)
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.value.currentTime + duration / 1000)
  
  oscillator.start(audioContext.value.currentTime)
  oscillator.stop(audioContext.value.currentTime + duration / 1000)
}

const playButtonSound = () => {
  createBeepSound(800, 150, 'square')
}

const playHoverSound = () => {
  createBeepSound(600, 100, 'sine')
}

const playForceSound = () => {
  createBeepSound(300, 500, 'sawtooth')
}

const playLightsaberSound = () => {
  // Create a continuous hum
  if (!soundEnabled.value || !audioContext.value) return
  
  const oscillator = audioContext.value.createOscillator()
  const gainNode = audioContext.value.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.value.destination)
  
  oscillator.frequency.value = 200
  oscillator.type = 'sawtooth'
  
  gainNode.gain.setValueAtTime(0.05, audioContext.value.currentTime)
  
  oscillator.start()
  
  // Stop after 2 seconds
  setTimeout(() => {
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.value.currentTime + 0.1)
    oscillator.stop(audioContext.value.currentTime + 0.1)
  }, 2000)
}

const toggleSound = () => {
  soundEnabled.value = !soundEnabled.value
  localStorage.setItem('portfolio-sound', soundEnabled.value)
  
  if (soundEnabled.value) {
    playButtonSound()
  }
}

// Global sound functions
const setupGlobalSounds = () => {
  // Add sound to all buttons
  const addButtonSounds = () => {
    const buttons = document.querySelectorAll('button, .nav-links a, .landing-links a')
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        if (soundEnabled.value) playHoverSound()
      })
      button.addEventListener('click', () => {
        if (soundEnabled.value) playButtonSound()
      })
    })
  }
  
  // Add sounds to interactive elements
  const addInteractiveSounds = () => {
    const cards = document.querySelectorAll('.project-card, .skill-item, .achievement-card')
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        if (soundEnabled.value) playHoverSound()
      })
    })
  }
  
  // Initial setup
  setTimeout(addButtonSounds, 1000)
  setTimeout(addInteractiveSounds, 1000)
  
  // Re-setup when content changes
  const observer = new MutationObserver(() => {
    setTimeout(addButtonSounds, 100)
    setTimeout(addInteractiveSounds, 100)
  })
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
}

onMounted(() => {
  // Initialize Web Audio API
  audioContext.value = new (window.AudioContext || window.webkitAudioContext)()
  
  // Load sound preference
  const savedSound = localStorage.getItem('portfolio-sound')
  if (savedSound !== null) {
    soundEnabled.value = savedSound === 'true'
  }
  
  // Setup global sound effects
  setupGlobalSounds()
  
  // Add special effects
  document.addEventListener('click', (e) => {
    if (e.target.closest('.hologram-container')) {
      playLightsaberSound()
    }
  })
  
  // Force effects on mouse trail
  document.addEventListener('mousemove', (e) => {
    if (Math.random() < 0.002 && soundEnabled.value) { // Very rare
      playForceSound()
    }
  })
})

// Expose sound functions globally
defineExpose({
  playButtonSound,
  playHoverSound,
  playForceSound,
  playLightsaberSound,
  soundEnabled
})
</script>

<style scoped>
.sound-manager {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 1001;
}

.sound-toggle {
  background: rgba(255, 232, 31, 0.1);
  border: 1px solid #ffe81f;
  color: #ffe81f;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.sound-toggle:hover {
  background: rgba(255, 232, 31, 0.2);
  transform: scale(1.1);
  box-shadow: 0 4px 15px rgba(255, 232, 31, 0.3);
}

@media (max-width: 768px) {
  .sound-manager {
    top: 1rem;
    right: 1rem;
  }
  
  .sound-toggle {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
}
</style>
