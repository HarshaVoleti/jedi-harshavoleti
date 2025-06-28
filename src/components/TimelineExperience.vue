<template>
  <section class="timeline-experience">
    <h2 class="section-title">Experience Timeline</h2>
    
    <div class="timeline-container">
      <div class="timeline-line"></div>
      
      <div 
        v-for="(exp, index) in experiences" 
        :key="index"
        class="timeline-item"
        :class="{ 'left': index % 2 === 0, 'right': index % 2 === 1, 'visible': exp.isVisible }"
        :ref="el => setExpRef(el, index)"
      >
        <div class="timeline-dot">
          <div class="dot-pulse"></div>
        </div>
        
        <div class="timeline-content">
          <div class="timeline-date">{{ exp.years }}</div>
          <h3 class="timeline-role">{{ exp.role }}</h3>
          <h4 class="timeline-company">{{ exp.company }}</h4>
          <p class="timeline-desc">{{ exp.description }}</p>
          
          <div class="timeline-tech">
            <span v-for="tech in exp.technologies" :key="tech" class="tech-tag">
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const experiences = ref([
  {
    role: 'Co-Founder & CTO',
    company: 'Apps By Me LLC',
    years: 'Mar 2024 – Present',
    description: 'Leading tech vision and development. Built LinkBox and RateMe applications.',
    technologies: ['Flutter', 'Firebase', 'Vue.js', 'Leadership'],
    isVisible: false
  },
  {
    role: 'Associate Product Engineer',
    company: 'DeltaX, Bangalore',
    years: 'Oct 2024 – Present',
    description: 'Building production-grade applications using modern tech stack.',
    technologies: ['Vue.js', 'Flutter', '.NET', 'SQL'],
    isVisible: false
  },
  {
    role: 'Product Engineer Intern',
    company: 'DeltaX, Bangalore',
    years: 'Feb 2024 – Aug 2024',
    description: 'Full-stack development training and real-world project implementation.',
    technologies: ['Vue.js', '.NET', 'SQL', 'Training'],
    isVisible: false
  },
  {
    role: 'Mobile App Developer Intern',
    company: 'Anantkal',
    years: 'June 2023 – July 2023',
    description: 'Frontend development for health and fitness tracking application.',
    technologies: ['Flutter', 'UI/UX', 'Mobile'],
    isVisible: false
  },
  {
    role: 'Mobile App Developer',
    company: 'Bewingz, Chennai',
    years: 'Feb 2022 – Feb 2023',
    description: 'Solo-developed e-bike tracking app similar to Ola Electric app.',
    technologies: ['Flutter', 'Backend', 'IoT', 'Startup'],
    isVisible: false
  }
])

const expRefs = ref([])

const setExpRef = (el, index) => {
  if (el) {
    expRefs.value[index] = el
  }
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const index = expRefs.value.indexOf(entry.target)
      if (index !== -1 && entry.isIntersecting) {
        setTimeout(() => {
          experiences.value[index].isVisible = true
        }, index * 200)
      }
    })
  }, { threshold: 0.3 })

  setTimeout(() => {
    expRefs.value.forEach(ref => {
      if (ref) observer.observe(ref)
    })
  }, 100)
})
</script>

<style scoped>
.timeline-experience {
  padding: 4rem 2rem;
  color: #ffe81f;
  font-family: 'Orbitron', sans-serif;
  max-width: 1000px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: transparent;
  -webkit-text-stroke: 1.2px #ffe81f;
}

.timeline-container {
  position: relative;
  padding: 2rem 0;
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(to bottom, transparent, #ffe81f, transparent);
  transform: translateX(-50%);
  z-index: 1;
}

.timeline-item {
  position: relative;
  margin: 3rem 0;
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.timeline-item.left {
  transform: translateX(-100px);
}

.timeline-item.right {
  transform: translateX(100px);
}

.timeline-item.visible {
  opacity: 1;
  transform: translateX(0);
}

.timeline-dot {
  position: absolute;
  left: 50%;
  top: 20px;
  width: 20px;
  height: 20px;
  background: #ffe81f;
  border-radius: 50%;
  transform: translateX(-50%);
  z-index: 2;
  box-shadow: 0 0 20px rgba(255, 232, 31, 0.5);
}

.dot-pulse {
  position: absolute;
  top: -5px;
  left: -5px;
  width: 30px;
  height: 30px;
  border: 2px solid #ffe81f;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.timeline-content {
  position: relative;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid #ffe81f;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 0 3rem;
  backdrop-filter: blur(10px);
}

.timeline-item.left .timeline-content {
  margin-right: 60%;
  text-align: right;
}

.timeline-item.right .timeline-content {
  margin-left: 60%;
  text-align: left;
}

.timeline-date {
  font-size: 0.9rem;
  color: #ccc;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.timeline-role {
  font-size: 1.3rem;
  color: #ffe81f;
  margin: 0.5rem 0;
}

.timeline-company {
  font-size: 1.1rem;
  color: #fff;
  margin: 0.5rem 0;
}

.timeline-desc {
  font-size: 0.95rem;
  color: #ccc;
  line-height: 1.5;
  margin: 1rem 0;
}

.timeline-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.timeline-item.left .timeline-tech {
  justify-content: flex-end;
}

.tech-tag {
  background: rgba(255, 232, 31, 0.1);
  border: 1px solid #ffe81f;
  color: #ffe81f;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .timeline-line {
    left: 30px;
  }
  
  .timeline-dot {
    left: 30px;
  }
  
  .timeline-item.left .timeline-content,
  .timeline-item.right .timeline-content {
    margin: 0 0 0 60px;
    text-align: left;
  }
  
  .timeline-item.left .timeline-tech {
    justify-content: flex-start;
  }
}
</style>
