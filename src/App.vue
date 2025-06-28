<template>
  <div class="app-container">
    <MouseTrail />
    <SoundManager />
    <AchievementSystem />
    <PWAInstaller />
    <MiniGames />
    <router-view class="app-wrapper"/>
  </div>
</template>

<script setup>
import MouseTrail from './components/MouseTrail.vue'
import SoundManager from './components/SoundManager.vue'
import AchievementSystem from './components/AchievementSystem.vue'
import PWAInstaller from './components/PWAInstaller.vue'
import MiniGames from './components/MiniGames.vue'
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&display=swap');

body, html, #app {
  margin: 0;
  padding: 0;
  /* width: 100%; */
  font-family: 'Orbitron', sans-serif;
}

.app-container {
  position: relative;
  min-height: 100vh;
  width: 100vw;
}

.app-wrapper {
  /* background: url('https://www.transparenttextures.com/patterns/stardust.png'), black;
  background-size: cover;
  background-repeat: repeat; */
  min-height: 100vh;
  width: 100vw;
  color: #ffe81f;
}
</style>