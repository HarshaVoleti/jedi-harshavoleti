<template>
  <div class="loading-overlay" v-if="showLoading">
    <div class="loading-content">
      <div class="death-star-loader">
        <div class="death-star">
          <div class="laser"></div>
        </div>
      </div>
      <p class="loading-text">{{ loadingText }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: 'Loading...'
  }
})

const showLoading = ref(props.modelValue)
const loadingText = ref(props.text)

const loadingTexts = [
  'Charging hyperdrive...',
  'Connecting to the Force...',
  'Assembling droids...',
  'Scanning galaxy...',
  'Loading portfolio...'
]

onMounted(() => {
  // Cycle through loading texts
  let textIndex = 0
  const textInterval = setInterval(() => {
    if (showLoading.value) {
      loadingText.value = loadingTexts[textIndex]
      textIndex = (textIndex + 1) % loadingTexts.length
    } else {
      clearInterval(textInterval)
    }
  }, 1000)
})
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(5px);
}

.loading-content {
  text-align: center;
  color: #ffe81f;
  font-family: 'Orbitron', sans-serif;
}

.death-star-loader {
  margin-bottom: 2rem;
}

.death-star {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ccc 0%, #999 50%, #666 100%);
  position: relative;
  animation: rotate 2s linear infinite;
  margin: 0 auto;
  box-shadow: 0 0 30px rgba(255, 232, 31, 0.3);
}

.laser {
  position: absolute;
  top: 20px;
  right: 15px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ff4444;
  box-shadow: 0 0 10px #ff4444;
  animation: pulse 1s ease-in-out infinite;
}

.loading-text {
  font-size: 1.2rem;
  color: #ffe81f;
  margin: 0;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
}
</style>
