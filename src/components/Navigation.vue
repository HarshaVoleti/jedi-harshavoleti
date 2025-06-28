<template>
  <nav class="floating-nav" :class="{ 'nav-visible': showNav }">
    <div class="nav-toggle" @click="toggleNav">
      <span></span>
      <span></span>
      <span></span>
    </div>
    
    <ul class="nav-links" :class="{ 'links-open': navOpen }">
      <li><a href="#home" @click="scrollTo('home')">Home</a></li>
      <li><a href="#skills" @click="scrollTo('skills')">Skills</a></li>
      <li><a href="#experience" @click="scrollTo('experience')">Experience</a></li>
      <li><a href="#projects" @click="scrollTo('projects')">Projects</a></li>
      <li><a href="#achievements" @click="scrollTo('achievements')">Achievements</a></li>
      <li><a href="#contact" @click="scrollTo('contact')">Contact</a></li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showNav = ref(false)
const navOpen = ref(false)

const toggleNav = () => {
  navOpen.value = !navOpen.value
}

const scrollTo = (elementId) => {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
    navOpen.value = false
  }
}

const handleScroll = () => {
  showNav.value = window.scrollY > 100
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.floating-nav {
  position: fixed;
  top: 2rem;
  left: 2rem;
  z-index: 1000;
  transition: opacity 0.3s ease;
  opacity: 0;
  pointer-events: none;
}

.floating-nav.nav-visible {
  opacity: 1;
  pointer-events: auto;
}

.nav-toggle {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  background: rgba(255, 232, 31, 0.1);
  border: 1px solid #ffe81f;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.nav-toggle:hover {
  background: rgba(255, 232, 31, 0.2);
  transform: scale(1.1);
}

.nav-toggle span {
  width: 20px;
  height: 2px;
  background: #ffe81f;
  transition: 0.3s;
}

.nav-links {
  position: absolute;
  top: 60px;
  left: 0;
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid #ffe81f;
  border-radius: 12px;
  padding: 1rem;
  list-style: none;
  margin: 0;
  min-width: 150px;
  opacity: 0;
  transform: translateY(-20px);
  pointer-events: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(15px);
}

.nav-links.links-open {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.nav-links li {
  margin: 0.5rem 0;
}

.nav-links a {
  color: #ffe81f;
  text-decoration: none;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.9rem;
  padding: 0.5rem;
  display: block;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.nav-links a:hover {
  background: #ffe81f;
  color: #000;
  transform: translateX(5px);
}

@media (max-width: 768px) {
  .floating-nav {
    left: 1rem;
    top: 1rem;
  }
  
  .nav-links {
    min-width: 120px;
  }
}
</style>
