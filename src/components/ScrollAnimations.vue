<template>
  <div class="scroll-animations">
    <!-- Section reveal animations -->
    <div 
      v-for="(section, index) in sections" 
      :key="index"
      class="reveal-section"
      :class="{ 'revealed': section.isVisible }"
      :ref="el => setSectionRef(el, index)"
    >
      <slot :name="section.name"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const sections = ref([
  { name: 'skills', isVisible: false },
  { name: 'experience', isVisible: false },
  { name: 'projects', isVisible: false },
  { name: 'achievements', isVisible: false },
  { name: 'contact', isVisible: false }
])

const sectionRefs = ref([])

const setSectionRef = (el, index) => {
  if (el) {
    sectionRefs.value[index] = el
  }
}

const observeElements = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const index = sectionRefs.value.indexOf(entry.target)
      if (index !== -1) {
        sections.value[index].isVisible = entry.isIntersecting
      }
    })
  }, { threshold: 0.2 })

  sectionRefs.value.forEach(ref => {
    if (ref) observer.observe(ref)
  })
}

onMounted(() => {
  setTimeout(observeElements, 100)
})
</script>

<style scoped>
.reveal-section {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.reveal-section.revealed {
  opacity: 1;
  transform: translateY(0);
}
</style>
