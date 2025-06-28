<template>
  <div class="pwa-installer" v-if="showInstallPrompt">
    <div class="install-banner">
      <div class="install-content">
        <div class="install-icon">📱</div>
        <div class="install-text">
          <div class="install-title">Install Portfolio App</div>
          <div class="install-description">Access offline & get a native app experience</div>
        </div>
      </div>
      <div class="install-actions">
        <button @click="installApp" class="install-btn">Install</button>
        <button @click="dismissPrompt" class="dismiss-btn">×</button>
      </div>
    </div>
  </div>
  
  <!-- Offline indicator -->
  <div class="offline-indicator" v-if="!isOnline">
    <div class="offline-content">
      <span class="offline-icon">📡</span>
      <span>You're offline - cached content available</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showInstallPrompt = ref(false)
const deferredPrompt = ref(null)
const isOnline = ref(navigator.onLine)

const installApp = async () => {
  if (deferredPrompt.value) {
    deferredPrompt.value.prompt()
    const { outcome } = await deferredPrompt.value.userChoice
    
    if (outcome === 'accepted') {
      console.log('PWA installed')
    }
    
    deferredPrompt.value = null
    showInstallPrompt.value = false
  }
}

const dismissPrompt = () => {
  showInstallPrompt.value = false
  localStorage.setItem('pwa-install-dismissed', 'true')
}

const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js')
      console.log('SW registered:', registration)
      
      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content available
              showUpdateAvailable()
            }
          })
        }
      })
    } catch (error) {
      console.log('SW registration failed:', error)
    }
  }
}

const showUpdateAvailable = () => {
  // You could show a notification here
  console.log('New content available! Please refresh.')
}

onMounted(() => {
  // Register service worker
  registerServiceWorker()
  
  // Listen for install prompt
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt.value = e
    
    // Check if user hasn't dismissed before
    const dismissed = localStorage.getItem('pwa-install-dismissed')
    if (!dismissed) {
      setTimeout(() => {
        showInstallPrompt.value = true
      }, 5000) // Show after 5 seconds
    }
  })
  
  // Listen for online/offline events
  window.addEventListener('online', () => {
    isOnline.value = true
  })
  
  window.addEventListener('offline', () => {
    isOnline.value = false
  })
  
  // Check if already installed
  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed')
    showInstallPrompt.value = false
  })
})
</script>

<style scoped>
.pwa-installer {
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  z-index: 1002;
  animation: slideUp 0.5s ease;
}

.install-banner {
  background: rgba(0, 0, 0, 0.95);
  border: 1px solid #ffe81f;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 15px rgba(255, 232, 31, 0.3);
  backdrop-filter: blur(10px);
  max-width: 400px;
  margin: 0 auto;
}

.install-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.install-icon {
  font-size: 2rem;
}

.install-text {
  flex: 1;
}

.install-title {
  color: #ffe81f;
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.install-description {
  color: #ccc;
  font-size: 0.8rem;
}

.install-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.install-btn {
  background: #ffe81f;
  color: #000;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.install-btn:hover {
  background: #fff200;
  transform: translateY(-1px);
}

.dismiss-btn {
  background: transparent;
  color: #ccc;
  border: 1px solid #ccc;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.dismiss-btn:hover {
  color: #ffe81f;
  border-color: #ffe81f;
}

.offline-indicator {
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1001;
  animation: slideDown 0.5s ease;
}

.offline-content {
  background: rgba(255, 69, 0, 0.9);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  box-shadow: 0 4px 15px rgba(255, 69, 0, 0.3);
  backdrop-filter: blur(10px);
}

.offline-icon {
  font-size: 1.1rem;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(100px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@media (max-width: 768px) {
  .pwa-installer {
    left: 0.5rem;
    right: 0.5rem;
  }
  
  .install-banner {
    padding: 0.75rem;
  }
  
  .install-title {
    font-size: 0.8rem;
  }
  
  .install-description {
    font-size: 0.7rem;
  }
}
</style>
