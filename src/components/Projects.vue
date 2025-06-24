<script setup>
import { ref, onMounted, nextTick } from 'vue'

const projectRefs = ref([])

const projects = [
  {
    title: "RateMe",
    description:
      "A mobile-first rating and review platform with advanced sentiment analysis. Built as part of a startup where I serve as CTO.",
    tech: ["Flutter", "Firebase", "Node.js"],
    tags: ["Startup", "Mobile App", "SaaS"],
    github: "", // private
    demo: "https://rateme.live"
  },
  {
    title: "LinkBox",
    description:
      "A sleek mobile app to organize, preview and share links in one tap. Built for public sharing and private storage.",
    tech: ["Flutter", "Firebase", "Supabase"],
    tags: ["Startup", "Mobile App", "Productivity"],
    github: "", // private
    demo: "https://linkbox.link"
    },
    {
    title: "Star Wars Portfolio",
    description:
      "My personal animated portfolio website themed on Star Wars. Built with Vue 3, custom animations, and cosmic vibes 🌌.",
    tech: ["Vue", "CSS Animations", "Vite"],
    tags: ["Portfolio", "Frontend", "Creative"],
    github: "", // optional
    demo: "" // fill in if you deploy
  },
  {
    title: "Culturize",
    description:
      "A community-first mobile app that helps people rediscover and preserve traditional arts like pottery, handloom, and folk stories.",
    tech: ["Flutter", "Firebase"],
    tags: ["Community", "Culture", "Mobile App"],
    github: "https://github.com/HarshaVoleti/culturize"
  },
  {
    title: "Tomato Leaf Disease Detector (iOS)",
    description:
      "An iOS app built in SwiftUI that uses a custom CoreML model (trained with my own dataset) to detect tomato leaf diseases offline.",
    tech: ["SwiftUI", "CoreML"],
    tags: ["ML", "iOS", "AgriTech"],
    github: "https://github.com/HarshaVoleti/Tomato_Leaf_disease_detector_IOS"
  },
  {
    title: "GrowMe",
    description:
      "A personal finance tracker app with budgeting tools, visual expense analysis, and offline data support.",
    tech: ["Flutter", "Dart"],
    tags: ["Finance", "Productivity", "Mobile App"],
    github: "https://github.com/HarshaVoleti/grow-me"
  },
  {
    title: "Lost & Found",
    description:
      "A mobile utility app to report and locate lost items on campuses or institutions. Supports geolocation and media uploads.",
    tech: ["Flutter", "Firebase"],
    tags: ["Utility", "Campus", "Mobile App"],
    github: "https://github.com/HarshaVoleti/LostandFound"
  },
  {
    title: "OhBooks",
    description:
      "A responsive web app for managing books in libraries with role-based access, book availability, and issue tracking.",
    tech: ["HTML", "CSS", "JavaScript"],
    tags: ["Library", "Web App", "CRUD"],
    github: "https://github.com/HarshaVoleti/ohbooks"
  }
]


onMounted(async () => {
  await nextTick()
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.1 })

  projectRefs.value.forEach((el) => el && observer.observe(el))
})
</script>

<template>
  <section class="projects-section">
    <h2 class="section-title">Projects</h2>
    <div class="projects-grid">
      <div
        v-for="(project, index) in projects"
        :key="project.title"
        class="project-card"
        ref="projectRefs"
        :style="{ animationDelay: `${index * 0.15}s` }"
      >
        <h3>{{ project.title }}</h3>
        <p>{{ project.description }}</p>

        <div class="tech-stack">
          <span
            v-for="tech in project.tech"
            :key="tech"
            class="tech-pill"
          >
            {{ tech }}
          </span>
        </div>

        <div class="tag-stack">
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="tag-pill"
          >
            {{ tag }}
          </span>
        </div>

        <div class="project-links">
          <a v-if="project.github" :href="project.github" target="_blank">GitHub</a>
          <a v-if="project.demo" :href="project.demo" target="_blank">Live Demo</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-section {
  padding: 4rem 2rem;
  width: 100%;
  color: #ffe81f;
  font-family: 'Orbitron', sans-serif;
  background: transparent;
  text-align: center;
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: transparent;
  -webkit-text-stroke: 1.2px #ffe81f;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.project-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #ffe81f;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: left;
  box-shadow: 0 0 12px rgba(255, 232, 31, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  opacity: 0;
  transform: translateY(60px);
}

.project-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 20px rgba(255, 232, 31, 0.6);
}

.tech-stack {
  margin: 0.5rem 0;
}

.tech-pill {
  display: inline-block;
  margin: 0.25rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid #ffe81f;
  border-radius: 6px;
  font-size: 0.75rem;
}

.tag-stack {
  margin: 0.5rem 0;
}

.tag-pill {
  display: inline-block;
  margin: 0.25rem;
  padding: 0.25rem 0.6rem;
  font-size: 0.7rem;
  background: rgba(255, 232, 31, 0.1);
  border: 1px solid #ffe81f;
  border-radius: 8px;
  color: #ffe81f;
  font-weight: bold;
}

.project-links a {
  display: inline-block;
  margin-right: 1rem;
  color: #ffe81f;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s, background 0.3s;
}

.project-links a:hover {
  color: #000;
  background: #ffe81f;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
}
</style>
