<script setup>
    import Experience from './Experience.vue'
    import Projects from './Projects.vue'
    import Achievements from './Achievements.vue'
    import Skills from './Skills.vue'
    import ContactForm from './ContactForm.vue';
    import { useRouter } from 'vue-router'


const socialLinks = [
  { label: 'GitHub', url: 'https://github.com/HarshaVoleti' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/harshavoleti/' },
  { label: 'Instagram', url: 'https://www.instagram.com/harsha.voleti/' },
  { label: 'Email', url: 'mailto:mailharshavoleti@gmail.com' },
  { label: 'Portfolio', url: 'https://masterharshavoleti.netlify.app/' }
]
const router = useRouter()

function goToWorkshopPage() {
  router.push('/workshop')
}
</script>

<template>
  <section class="base-info">
    <div class="landing-container">
      <div class="landing-image">
        <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4ecf6bb3-e5c2-49aa-8300-365ddf7e83fa/df82mav-93f48317-0773-4787-83c7-5aceca804d6d.png/v1/fill/w_1001,h_798/darth_vader_png_by_kevingame_2_df82mav-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyMCIsInBhdGgiOiJcL2ZcLzRlY2Y2YmIzLWU1YzItNDlhYS04MzAwLTM2NWRkZjdlODNmYVwvZGY4Mm1hdi05M2Y0ODMxNy0wNzczLTQ3ODctODNjNy01YWNlY2E4MDRkNmQucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.kNJRokty4yZSpeoPsWUz-_4oDOoZGQUvY2ShKURmKJ4" alt="Harsha Voleti" />
      </div>
      <div class="landing-info">
        <h1 class="landing-name">Harsha Voleti</h1>
        <h2 class="landing-role">Software Developer</h2>
        <div class="landing-links">
          <a
            v-for="link in socialLinks"
            :key="link.label"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ link.label }}
          </a>
        </div>
      </div>
    </div>
    <div class="skills-wrapper">
        <Skills />
    </div>
    <div class="experience-wrapper">
      <Experience />
    </div>
    <div class="projects-wrapper">
        <Projects />
    </div>
    <div class="achievements-wrapper">
        <Achievements @show-workshop="goToWorkshopPage" />
    </div>
    <div class="contact-wrapper">
        <ContactForm />
    </div>
  </section>
</template>

<style scoped>
.base-info {
  width: 100%;
  padding: 4rem 2rem;
  height: 100;
  box-sizing: border-box;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.landing-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
  width: 100%;
  height: 90vh;
  color: #ffe81f;
  font-family: 'Orbitron', sans-serif;
  margin-bottom: 4rem;
}

.landing-image img {
  width: 400px;
  height: 400px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
  transition: transform 0.4s ease;
}

.landing-image img:hover {
  transform: scale(1.05);
}

.landing-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
}

.landing-name {
  font-size: 3rem;
  margin: 0;
  color: transparent;
  -webkit-text-stroke: 1.5px #ffe81f;
}

.landing-role {
  font-size: 1.5rem;
  color: #ccc;
  margin: 0;
}

.landing-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}

.landing-links a {
  color: #ffe81f;
  text-decoration: none;
  font-weight: bold;
  border: 1px solid #ffe81f;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background 0.3s, color 0.3s;
}

.landing-links a:hover {
  background: #ffe81f;
  color: #000;
}

.experience-wrapper {
  width: 100%;
  max-width: 1200px;
  padding: 2rem 1rem;
}
</style>
