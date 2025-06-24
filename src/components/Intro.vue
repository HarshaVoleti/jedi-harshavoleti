<script setup>
import { ref, onMounted, defineEmits } from 'vue'
const emit = defineEmits(['intro-complete'])

const showOpeningLine = ref(true)
const showNameZoom = ref(false)
const showCrawl = ref(false)

onMounted(() => {
  setTimeout(() => {
    showOpeningLine.value = false
    showNameZoom.value = true

    setTimeout(() => {
      showCrawl.value = true

      setTimeout(() => {
        showNameZoom.value = false
      }, 4000)

      setTimeout(() => {
        // showCrawl.value = false
        emit('intro-complete') // Let parent know intro is done
      }, 10000)

    }, 3000) // Slight delay before crawl
  }, 2000) // Initial opening line
})
</script>

<template>
  <div class="intro-wrapper">
    <transition name="fade">
      <div v-if="showOpeningLine" class="opening-line">
        Not so long ago,<br />a galaxy not so far away...
      </div>
    </transition>

    <div v-if="showNameZoom" class="zoom-name">
      <div class="name-stacked">
        <div>Harsha</div>
        <div>Voleti</div>
      </div>
    </div>

    <div v-if="showCrawl" class="intro-container">
      <div class="crawl">
        <p class="title">Episode H<br /><strong>THE RISE OF HARSHA</strong></p>
        <p>
          It is a time of great opportunity. Developers across the galaxy search for wisdom and
          clean UI.<br /><br />
          Among them rises a force unknown, a coder destined to bring balance — Harsha Voleti.
          <br /><br />
          This is his story.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.intro-wrapper {
  position: fixed;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #ffe81f;
  font-family: 'Orbitron', sans-serif;
  overflow: hidden;
}

.opening-line {
  font-size: 2rem;
  text-align: center;
  text-shadow: 1px 1px 2px black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.zoom-name {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(6);
  animation: zoomOutNoFade 4s ease-out forwards;
  text-align: center;
}

.name-stacked {
  display: flex;
  flex-direction: column;
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 2px #ffe81f;
  font-size: 6vw;
  white-space: nowrap;
}
.name-stacked div {
  margin: 0;
  padding: 0;
}

.intro-container {
  height: 100vh;
  width: 100%;
  perspective: 600px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.crawl {
  width: 100%;
  max-width: 600px;
  padding: 0 20px;
  text-align: center;
  font-size: 1.6rem;
  transform: rotateX(25deg);
  animation: crawl 15s linear forwards;
}

.title {
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
}

@keyframes zoomOutNoFade {
  0% { transform: translate(-50%, -50%) scale(6); }
  100% { transform: translate(-50%, -50%) scale(0); }
}

@keyframes crawl {
  0% { transform: rotateX(50deg) translateY(100%); opacity: 1; }
  100% { transform: rotateX(50deg) translateY(-250%); opacity: 0; }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
