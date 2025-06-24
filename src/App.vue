<template>
  <router-view  class="app-wrapper"/>
</template>

<script setup>
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&display=swap');

body, html, #app {
  margin: 0;
  padding: 0;
  /* width: 100%; */
  font-family: 'Orbitron', sans-serif;
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