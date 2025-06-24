<script setup>
import { ref } from 'vue'
import Intro from '../components/Intro.vue'
    import BaseInfo from '../components/BaseInfo.vue'


const showHero = ref(false)
const hideIntro = ref(false)

const handleIntroComplete = () => {
  // Start showing hero early
  showHero.value = true

  // Later, hide intro
  setTimeout(() => {
    hideIntro.value = true
  }, 15000) // match crawl duration
}
</script>


<template>
    <div class="full-wrapper">
      <Intro v-if="!hideIntro" @intro-complete="handleIntroComplete" />
  
      <transition name="fade-up">
        <div v-if="showHero" class="hero-container-absolute">
          <BaseInfo />
        </div>
      </transition>
    </div>
  </template>
  
  

<style scoped>
.full-wrapper {
  position: relative;
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
}

/* Layer the hero-container on top, centered */
.hero-container-absolute {
  /* position: absolute; */
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  pointer-events: none; /* optional if crawl is interactive */
}

/* Bring text back from transparent */
.hero-container-absolute * {
  color: #ffe81f;
  pointer-events: auto;
}

/* Fade-up animation */
.fade-up-enter-active {
  transition: opacity 2s ease, transform 2s ease;
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(100px);
}
.fade-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}

</style>
