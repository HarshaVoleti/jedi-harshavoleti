<!-- components/Experience.vue -->
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // You could add scroll-triggered animation with IntersectionObserver later
})
</script>

<template>
  <section class="experience-wrapper">
    <h2 class="section-title">Experience</h2>

    <div class="experience-list">
      <div class="experience-card" v-for="(exp, i) in experiences" :key="i">
        <h3 class="role">{{ exp.role }}</h3>
        <p class="company">{{ exp.company }}</p>
        <p class="years">{{ exp.years }}</p>
        <p class="desc">{{ exp.description }}</p>
      </div>
    </div>
  </section>
</template>

<script>
    const experiences = [
    {
    role: 'Co-Founder & CTO',
    company: 'Apps By Me LLC, Remote',
    years: 'Mar 2024 – Present',
    description: `Leading the tech vision and development at Apps By Me LLC. 
      Built and launched LinkBox, currently in closed testing.
      Also RateMe — currently in active development. 
      Responsible for full-stack architecture, team guidance, and product engineering decisions.`
  },
  {
    role: 'Associate Product Engineer',
    company: 'DeltaX, Bangalore',
    years: 'Oct 2024 – Present',
    description: `Currently working as a full-time Associate Product Engineer. 
      Building production-grade applications using Vue.js, Flutter, .NET, and SQL. 
      Contributing to interactive tools and features across the full stack.`
  },
  {
    role: 'Associate Product Engineer Intern',
    company: 'DeltaX, Bangalore',
    years: 'Feb 2024 – Aug 2024',
    description: `Completed comprehensive training in full-stack development including Vue.js, .NET, and SQL. 
      Delivered multiple assignments simulating real-world scenarios and internal tools. 
      Gained hands-on experience used directly in my full-time role.`
  },
  {
    role: 'Mobile App Developer Intern',
    company: 'Anantkal, Remote',
    years: 'June 2023 – July 2023',
    description: `Worked on the front-end of a health and fitness tracking app. 
      Focused on creating user interfaces and smooth experiences in Flutter, with a focus on responsive design and usability.`
  },
  {
    role: 'Mobile App Developer',
    company: 'Bewingz, Chennai',
    years: 'Feb 2022 – Feb 2023',
    description: `Solo-developed a mobile app to track and manage e-bike status, battery, and location — 
      similar to the Ola Electric app. Delivered complete frontend and backend integration for a working prototype at this startup.`
  }
]

</script>

<style scoped>
.experience-wrapper {
  padding: 4rem 2rem;
  color: #ffe81f;
  font-family: 'Orbitron', sans-serif;
  text-align: center;
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px #000;
}

.experience-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.experience-card {
  border: 2px solid #ffe81f;
  padding: 1.5rem;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.4);
  box-shadow: 0 0 15px #ffe81f55;
  text-align: left;
  transition: transform 0.5s ease, box-shadow 0.5s;
}

.experience-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 0 25px #ffe81f;
}

.role {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.company {
  font-size: 1.2rem;
  color: #ffffffaa;
  margin-bottom: 0.25rem;
}

.years {
  font-size: 1rem;
  color: #aaa;
  margin-bottom: 0.75rem;
}

.desc {
  font-size: 1rem;
  color: #ccc;
}
</style>
