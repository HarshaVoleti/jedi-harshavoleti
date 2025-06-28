<template>
  <div class="achievement-system">
    <!-- Achievement notifications -->
    <transition-group name="achievement" tag="div" class="achievement-notifications">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="achievement-notification"
      >
        <div class="achievement-icon">{{ notification.icon }}</div>
        <div class="achievement-content">
          <div class="achievement-title">{{ notification.title }}</div>
          <div class="achievement-description">{{ notification.description }}</div>
        </div>
      </div>
    </transition-group>
    
    <!-- Achievement progress indicator -->
    <div class="achievement-progress" v-if="showProgress">
      <div class="progress-text">Achievements: {{ unlockedCount }}/{{ totalAchievements }}</div>
      <div class="progress-bar">
        <div 
          class="progress-fill" 
          :style="{ width: progressPercentage + '%' }"
        ></div>
      </div>
    </div>
    
    <!-- Achievement toggle button -->
    <button 
      class="achievement-toggle" 
      @click="toggleProgress"
      title="Toggle Achievement Progress"
    >
      🏆
    </button>
    
    <!-- Achievement list toggle button -->
    <button 
      class="achievement-list-toggle" 
      @click="toggleAchievementsList"
      title="View All Achievements"
    >
      📋
    </button>
  </div>
  
  <!-- Achievements List Panel -->
  <div class="achievements-panel" v-if="showAchievementsList" @click.self="toggleAchievementsList">
    <div class="achievements-content">
      <div class="achievements-header">
        <h2>🏆 Achievement Gallery</h2>
        <button class="close-btn" @click="toggleAchievementsList">×</button>
      </div>
      
      <div class="achievements-stats">
        <div class="stat">
          <span class="stat-value">{{ unlockedCount }}</span>
          <span class="stat-label">Unlocked</span>
        </div>
        <div class="stat">
          <span class="stat-value">{{ progressPercentage }}%</span>
          <span class="stat-label">Complete</span>
        </div>
        <div class="stat">
          <span class="stat-value">{{ totalAchievements }}</span>
          <span class="stat-label">Total</span>
        </div>
      </div>
      
      <div class="achievements-grid">
        <div 
          v-for="(achievement, key) in achievements" 
          :key="key"
          class="achievement-item"
          :class="{ 'unlocked': achievement.unlocked, 'locked': !achievement.unlocked }"
        >
          <div class="achievement-icon-large">{{ achievement.icon }}</div>
          <div class="achievement-info">
            <div class="achievement-title">{{ achievement.title }}</div>
            <div class="achievement-description">{{ achievement.description }}</div>
            <div class="achievement-status">
              <span v-if="achievement.unlocked" class="status-unlocked">✅ Unlocked</span>
              <span v-else class="status-locked">🔒 Locked</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="achievements-footer">
        <p>Keep exploring to unlock more achievements!</p>
        <div class="easter-egg-hint" v-if="!achievements['easter-egg-hunter'].unlocked">
          <small>💡 Hint: Try the Konami code (↑↑↓↓←→←→BA) for a special surprise!</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const notifications = ref([])
const showProgress = ref(false)
const showAchievementsList = ref(false)
const achievements = ref({
  'first-visit': {
    title: 'Welcome to the Galaxy',
    description: 'Visited the portfolio',
    icon: '🌟',
    unlocked: false
  },
  'hologram-interaction': {
    title: 'Jedi Master',
    description: 'Interacted with the hologram',
    icon: '🎯',
    unlocked: false
  },
  'section-explorer': {
    title: 'Galaxy Explorer',
    description: 'Visited all sections',
    icon: '🚀',
    unlocked: false
  },
  'button-clicker': {
    title: 'Force User',
    description: 'Clicked 10 buttons',
    icon: '⚡',
    unlocked: false
  },
  'scroll-master': {
    title: 'Scroll Master',
    description: 'Scrolled through the entire portfolio',
    icon: '📜',
    unlocked: false
  },
  'download-master': {
    title: 'Resume Collector',
    description: 'Downloaded the resume',
    icon: '📄',
    unlocked: false
  },
  'contact-initiator': {
    title: 'Communication Expert',
    description: 'Used the contact form',
    icon: '📡',
    unlocked: false
  },
  'time-traveler': {
    title: 'Time Traveler',
    description: 'Spent 5 minutes on the site',
    icon: '⏰',
    unlocked: false
  },
  'easter-egg-hunter': {
    title: 'Easter Egg Hunter',
    description: 'Found a hidden feature',
    icon: '🥚',
    unlocked: false
  },
  'sound-master': {
    title: 'Sound Master',
    description: 'Toggled sound effects',
    icon: '🔊',
    unlocked: false
  },
  'achievement-viewer': {
    title: 'Achievement Hunter',
    description: 'Opened the achievements panel',
    icon: '🏅',
    unlocked: false
  },
  'mobile-user': {
    title: 'Mobile Warrior',
    description: 'Viewed portfolio on mobile device',
    icon: '📱',
    unlocked: false
  },
  'night-owl': {
    title: 'Night Owl',
    description: 'Visited during late hours (10PM-6AM)',
    icon: '🦉',
    unlocked: false
  }
})

const visitedSections = ref(new Set())
const clickCount = ref(0)
const startTime = ref(Date.now())

const totalAchievements = computed(() => Object.keys(achievements.value).length)
const unlockedCount = computed(() => 
  Object.values(achievements.value).filter(a => a.unlocked).length
)
const progressPercentage = computed(() => 
  Math.round((unlockedCount.value / totalAchievements.value) * 100)
)

const unlockAchievement = (achievementId) => {
  if (!achievements.value[achievementId] || achievements.value[achievementId].unlocked) {
    return
  }
  
  const achievement = achievements.value[achievementId]
  achievement.unlocked = true
  
  // Show notification
  const notification = {
    id: Date.now(),
    ...achievement
  }
  
  notifications.value.push(notification)
  
  // Remove notification after 4 seconds
  setTimeout(() => {
    const index = notifications.value.findIndex(n => n.id === notification.id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }, 4000)
  
  // Save progress
  saveProgress()
}

const checkSectionVisit = (sectionId) => {
  visitedSections.value.add(sectionId)
  
  if (visitedSections.value.size >= 5) {
    unlockAchievement('section-explorer')
  }
}

const incrementClickCount = () => {
  clickCount.value++
  
  if (clickCount.value >= 10) {
    unlockAchievement('button-clicker')
  }
}

const checkTimeSpent = () => {
  const timeSpent = Date.now() - startTime.value
  if (timeSpent >= 5 * 60 * 1000) { // 5 minutes
    unlockAchievement('time-traveler')
  }
}

const checkScrollCompletion = () => {
  const scrollPosition = window.scrollY + window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  
  if (scrollPosition >= documentHeight - 100) {
    unlockAchievement('scroll-master')
  }
}

const toggleProgress = () => {
  showProgress.value = !showProgress.value
}

const toggleAchievementsList = () => {
  showAchievementsList.value = !showAchievementsList.value
  
  // Unlock achievement for viewing achievements panel
  if (showAchievementsList.value) {
    unlockAchievement('achievement-viewer')
  }
}

const saveProgress = () => {
  localStorage.setItem('portfolio-achievements', JSON.stringify(achievements.value))
}

const loadProgress = () => {
  const saved = localStorage.getItem('portfolio-achievements')
  if (saved) {
    const savedAchievements = JSON.parse(saved)
    Object.keys(savedAchievements).forEach(key => {
      if (achievements.value[key]) {
        achievements.value[key].unlocked = savedAchievements[key].unlocked
      }
    })
  }
}

onMounted(() => {
  // Load saved progress
  loadProgress()
  
  // Check for mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  if (isMobile) {
    unlockAchievement('mobile-user')
  }
  
  // Check for night owl (late hours)
  const currentHour = new Date().getHours()
  if (currentHour >= 22 || currentHour <= 6) {
    unlockAchievement('night-owl')
  }
  
  // First visit achievement
  setTimeout(() => {
    unlockAchievement('first-visit')
  }, 2000)
  
  // Set up event listeners
  document.addEventListener('click', (e) => {
    incrementClickCount()
    
    // Check for specific interactions
    if (e.target.closest('.hologram-container')) {
      unlockAchievement('hologram-interaction')
    }
    
    if (e.target.closest('.resume-btn')) {
      unlockAchievement('download-master')
    }
    
    if (e.target.closest('.contact-section button')) {
      unlockAchievement('contact-initiator')
    }
    
    if (e.target.closest('.sound-toggle')) {
      unlockAchievement('sound-master')
    }
  })
  
  // Scroll tracking
  document.addEventListener('scroll', checkScrollCompletion)
  
  // Section visit tracking using Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target.id) {
        checkSectionVisit(entry.target.id)
      }
    })
  }, { threshold: 0.3 })
  
  // Observe sections
  setTimeout(() => {
    const sections = document.querySelectorAll('[id]')
    sections.forEach(section => observer.observe(section))
  }, 1000)
  
  // Check time spent periodically
  setInterval(checkTimeSpent, 60000) // Check every minute
  
  // Easter egg: Konami code
  let konamiCode = []
  const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ]
  
  document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code)
    if (konamiCode.length > konamiSequence.length) {
      konamiCode.shift()
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
      unlockAchievement('easter-egg-hunter')
      // Add special effect
      document.body.style.filter = 'hue-rotate(180deg)'
      setTimeout(() => {
        document.body.style.filter = ''
      }, 3000)
    }
  })
})

// Expose functions for external use
defineExpose({
  unlockAchievement,
  checkSectionVisit
})
</script>

<style scoped>
.achievement-system {
  position: fixed;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
}

.achievement-notifications {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
}

.achievement-notification {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid #ffe81f;
  border-radius: 12px;
  padding: 1rem;
  min-width: 250px;
  box-shadow: 0 4px 15px rgba(255, 232, 31, 0.3);
  backdrop-filter: blur(10px);
}

.achievement-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.achievement-content {
  flex: 1;
}

.achievement-title {
  color: #ffe81f;
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.achievement-description {
  color: #ccc;
  font-size: 0.8rem;
}

.achievement-progress {
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid #ffe81f;
  border-radius: 8px;
  padding: 0.75rem;
  min-width: 200px;
  backdrop-filter: blur(10px);
}

.progress-text {
  color: #ffe81f;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  text-align: center;
}

.progress-bar {
  height: 6px;
  background: rgba(255, 232, 31, 0.2);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ffe81f, #fff200);
  border-radius: 3px;
  transition: width 0.5s ease;
  box-shadow: 0 0 8px rgba(255, 232, 31, 0.5);
}

.achievement-toggle {
  background: rgba(255, 232, 31, 0.1);
  border: 1px solid #ffe81f;
  color: #ffe81f;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.achievement-toggle:hover {
  background: rgba(255, 232, 31, 0.2);
  transform: scale(1.1);
  box-shadow: 0 4px 15px rgba(255, 232, 31, 0.3);
}

.achievement-list-toggle {
  background: rgba(255, 232, 31, 0.1);
  border: 1px solid #ffe81f;
  color: #ffe81f;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.achievement-list-toggle:hover {
  background: rgba(255, 232, 31, 0.2);
  transform: scale(1.1);
  box-shadow: 0 4px 15px rgba(255, 232, 31, 0.3);
}

/* Achievements Panel */
.achievements-panel {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1003;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  animation: fadeIn 0.3s ease;
}

.achievements-content {
  background: rgba(0, 0, 0, 0.95);
  border: 2px solid #ffe81f;
  border-radius: 20px;
  padding: 2rem;
  max-width: 800px;
  max-height: 80vh;
  width: 90%;
  overflow-y: auto;
  box-shadow: 0 0 30px rgba(255, 232, 31, 0.5);
}

.achievements-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 232, 31, 0.3);
  padding-bottom: 1rem;
}

.achievements-header h2 {
  color: #ffe81f;
  margin: 0;
  font-size: 1.8rem;
  text-shadow: 0 0 10px rgba(255, 232, 31, 0.5);
}

.close-btn {
  background: transparent;
  border: 1px solid #ffe81f;
  color: #ffe81f;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: #ffe81f;
  color: #000;
  transform: scale(1.1);
}

.achievements-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
  background: rgba(255, 232, 31, 0.1);
  padding: 1rem;
  border-radius: 12px;
}

.stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  color: #ffe81f;
  text-shadow: 0 0 10px rgba(255, 232, 31, 0.5);
}

.stat-label {
  color: #ccc;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.achievement-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.achievement-item.unlocked {
  background: rgba(255, 232, 31, 0.1);
  border-color: rgba(255, 232, 31, 0.3);
}

.achievement-item.locked {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
  opacity: 0.6;
}

.achievement-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 232, 31, 0.2);
}

.achievement-icon-large {
  font-size: 3rem;
  flex-shrink: 0;
  filter: grayscale(0);
  transition: filter 0.3s ease;
}

.achievement-item.locked .achievement-icon-large {
  filter: grayscale(1);
}

.achievement-info {
  flex: 1;
}

.achievement-title {
  color: #ffe81f;
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.achievement-item.locked .achievement-title {
  color: #999;
}

.achievement-description {
  color: #ccc;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.achievement-item.locked .achievement-description {
  color: #666;
}

.achievement-status {
  font-size: 0.8rem;
}

.status-unlocked {
  color: #4CAF50;
  font-weight: bold;
}

.status-locked {
  color: #999;
}

.achievements-footer {
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 232, 31, 0.3);
}

.achievements-footer p {
  color: #ccc;
  margin-bottom: 1rem;
}

.easter-egg-hint {
  background: rgba(255, 232, 31, 0.1);
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 232, 31, 0.3);
}

.easter-egg-hint small {
  color: #ffe81f;
  font-style: italic;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Animation for notifications */
.achievement-enter-active {
  transition: all 0.5s ease;
}

.achievement-leave-active {
  transition: all 0.5s ease;
}

.achievement-enter-from {
  opacity: 0;
  transform: translateX(100px) scale(0.8);
}

.achievement-leave-to {
  opacity: 0;
  transform: translateX(100px) scale(0.8);
}

@media (max-width: 768px) {
  .achievement-system {
    right: 0.5rem;
    top: auto;
    bottom: 1rem;
    transform: none;
  }
  
  .achievement-notification {
    min-width: 200px;
    padding: 0.75rem;
  }
  
  .achievement-toggle,
  .achievement-list-toggle {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
  
  .achievements-content {
    padding: 1rem;
    width: 95%;
    max-height: 85vh;
  }
  
  .achievements-header h2 {
    font-size: 1.4rem;
  }
  
  .achievements-stats {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .stat {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .stat-value {
    font-size: 1.5rem;
  }
  
  .achievements-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  .achievement-item {
    padding: 0.75rem;
  }
  
  .achievement-icon-large {
    font-size: 2rem;
  }
}
</style>
