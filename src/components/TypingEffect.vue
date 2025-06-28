<template>
  <div class="typing-text">
    <span class="typed-text">{{ displayText }}</span>
    <span class="cursor" :class="{ 'blinking': showCursor }">|</span>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue'

const props = defineProps({
  texts: {
    type: Array,
    default: () => ['Software Developer', 'Co-Founder & CTO', 'Flutter Expert', 'Vue.js Developer', 'Full Stack Engineer']
  },
  typeSpeed: {
    type: Number,
    default: 100
  },
  deleteSpeed: {
    type: Number,
    default: 50
  },
  pauseTime: {
    type: Number,
    default: 2000
  }
})

const displayText = ref('')
const showCursor = ref(true)
let currentTextIndex = 0
let currentCharIndex = 0
let isDeleting = false

const typeEffect = () => {
  const currentText = props.texts[currentTextIndex]
  
  if (isDeleting) {
    displayText.value = currentText.substring(0, currentCharIndex - 1)
    currentCharIndex--
    
    if (currentCharIndex === 0) {
      isDeleting = false
      currentTextIndex = (currentTextIndex + 1) % props.texts.length
      setTimeout(typeEffect, 200)
    } else {
      setTimeout(typeEffect, props.deleteSpeed)
    }
  } else {
    displayText.value = currentText.substring(0, currentCharIndex + 1)
    currentCharIndex++
    
    if (currentCharIndex === currentText.length) {
      setTimeout(() => {
        isDeleting = true
        typeEffect()
      }, props.pauseTime)
    } else {
      setTimeout(typeEffect, props.typeSpeed)
    }
  }
}

onMounted(() => {
  setTimeout(typeEffect, 1000) // Start after 1 second
})
</script>

<style scoped>
.typing-text {
  display: inline-block;
  font-family: 'Orbitron', sans-serif;
}

.typed-text {
  font-weight: bold;
}

.cursor {
  color: #ffe81f;
  animation: blink 1s infinite;
}

.cursor.blinking {
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
</style>
