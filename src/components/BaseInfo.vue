<script setup>
    import Experience from './Experience.vue'
    import TimelineExperience from './TimelineExperience.vue'
    import Projects from './Projects.vue'
    import Achievements from './Achievements.vue'
    import Skills from './Skills.vue'
    import ContactForm from './ContactForm.vue'
    import Navigation from './Navigation.vue'
    import ParticleBackground from './ParticleBackground.vue'
    import TypingEffect from './TypingEffect.vue'
    import ScrollAnimations from './ScrollAnimations.vue'
    import HologramImage from './HologramImage.vue'
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

const downloadResume = () => {
  // You can replace this with actual resume file path
  const resumeUrl = '/harsha-voleti-resume.pdf' // Add your resume to public folder
  const link = document.createElement('a')
  link.href = resumeUrl
  link.download = 'Harsha_Voleti_Resume.pdf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<template>
  <section class="base-info">
    <ParticleBackground />
    <Navigation />
    
    <div id="home" class="landing-container">
      <div class="landing-image">
        <HologramImage 
          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4ecf6bb3-e5c2-49aa-8300-365ddf7e83fa/df82mav-93f48317-0773-4787-83c7-5aceca804d6d.png/v1/fill/w_1001,h_798/darth_vader_png_by_kevingame_2_df82mav-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyMCIsInBhdGgiOiJcL2ZcLzRlY2Y2YmIzLWU1YzItNDlhYS04MzAwLTM2NWRkZjdlODNmYVwvZGY4Mm1hdi05M2Y0ODMxNy0wNzczLTQ3ODctODNjNy01YWNlY2E4MDRkNmQucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.kNJRokty4yZSpeoPsWUz-_4oDOoZGQUvY2ShKURmKJ4" 
          alt="Harsha Voleti" 
        />
      </div>
      <div class="landing-info">
        <h1 class="landing-name">Harsha Voleti</h1>
        <div class="landing-role">
          <TypingEffect />
        </div>
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
          <button class="resume-btn" @click="downloadResume">
            📄 Download Resume
          </button>
        </div>
      </div>
    </div>
    <ScrollAnimations>
      <template #skills>
        <div id="skills" class="skills-wrapper">
        <Skills />
    </div>
      </template>
      
      <template #experience>
        <div id="experience" class="experience-wrapper">
          <TimelineExperience />
        </div>
      </template>
      
      <template #projects>
        <div id="projects" class="projects-wrapper">
          <Projects />
        </div>
      </template>
      
      <template #achievements>
        <div id="achievements" class="achievements-wrapper">
          <Achievements @show-workshop="goToWorkshopPage" />
        </div>
      </template>
      
      <template #contact>
        <div id="contact" class="contact-wrapper">
          <ContactForm />
        </div>
      </template>
    </ScrollAnimations>
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
  position: relative;
  z-index: 1;
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

.landing-image {
  display: flex;
  justify-content: center;
  align-items: center;
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
  min-height: 2rem; /* Prevent layout shift during typing */
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

.resume-btn {
  background: linear-gradient(45deg, #ffe81f, #fff200);
  color: #000 !important;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: bold;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 232, 31, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.resume-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
  z-index: -1;
}

.resume-btn:hover::before {
  left: 100%;
}

.resume-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 232, 31, 0.6);
  background: linear-gradient(45deg, #fff200, #ffe81f);
  color: #000 !important;
}

.experience-wrapper {
  width: 100%;
  max-width: 1200px;
  padding: 2rem 1rem;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .landing-container {
    flex-direction: column;
    height: auto;
    padding: 2rem 1rem;
    gap: 2rem;
  }

  .landing-image img {
    width: 280px;
    height: 280px;
  }

  .landing-info {
    text-align: center;
  }

  .landing-name {
    font-size: 2rem;
  }

  .landing-role {
    font-size: 1.2rem;
  }

  .landing-links {
    justify-content: center;
    gap: 0.5rem;
  }

  .landing-links a,
  .resume-btn {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }
}
</style>
