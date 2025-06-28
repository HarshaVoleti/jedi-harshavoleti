<template>
  <div class="mini-games-container">
    <!-- Game launcher button -->
    <button 
      class="games-toggle" 
      @click="toggleGamesMenu"
      title="Star Wars Mini Games"
    >
      🎮
    </button>
    
    <!-- Games menu -->
    <div class="games-menu" v-if="showGamesMenu">
      <h3>🎮 Star Wars Mini Games</h3>
      <div class="games-list">
        <button @click="startLightsaberGame" class="game-btn">
          ⚔️ Lightsaber Defense
        </button>
        <button @click="startTargetPractice" class="game-btn">
          🎯 Force Target Practice
        </button>
        <button @click="startMemoryGame" class="game-btn">
          🧠 Jedi Memory Test
        </button>
      </div>
    </div>
    
    <!-- Lightsaber Defense Game -->
    <div class="game-modal" v-if="currentGame === 'lightsaber'" @click.self="closeGame">
      <div class="game-content">
        <div class="game-header">
          <h2>⚔️ Lightsaber Defense</h2>
          <div class="game-stats">
            <span>Score: {{ lightsaberScore }}</span>
            <span>Lives: {{ lightsaberLives }}</span>
          </div>
          <button class="close-game" @click="closeGame">×</button>
        </div>
        
        <div class="game-arena" ref="gameArena" @mousemove="moveLightsaber">
          <!-- Player lightsaber -->
          <div 
            class="player-saber" 
            :style="{ left: playerX + 'px', top: playerY + 'px' }"
          ></div>
          
          <!-- Blaster bolts -->
          <div
            v-for="bolt in blasterBolts"
            :key="bolt.id"
            class="blaster-bolt"
            :style="{ left: bolt.x + 'px', top: bolt.y + 'px' }"
          ></div>
          
          <!-- Game instructions -->
          <div class="game-instructions" v-if="!gameRunning">
            <p>Move your mouse to control the lightsaber!</p>
            <p>Deflect the incoming blaster bolts!</p>
            <button @click="startLightsaberDefense" class="start-btn">Start Defense</button>
          </div>
          
          <!-- Game over -->
          <div class="game-over" v-if="gameOver">
            <h3>{{ lightsaberLives <= 0 ? 'Defeated!' : 'Victory!' }}</h3>
            <p>Final Score: {{ lightsaberScore }}</p>
            <button @click="resetLightsaberGame" class="restart-btn">Try Again</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Target Practice Game -->
    <div class="game-modal" v-if="currentGame === 'target'" @click.self="closeGame">
      <div class="game-content">
        <div class="game-header">
          <h2>🎯 Force Target Practice</h2>
          <div class="game-stats">
            <span>Score: {{ targetScore }}</span>
            <span>Time: {{ targetTime }}s</span>
          </div>
          <button class="close-game" @click="closeGame">×</button>
        </div>
        
        <div class="target-arena" @click="shootTarget">
          <!-- Targets -->
          <div
            v-for="target in targets"
            :key="target.id"
            class="target"
            :style="{ 
              left: target.x + 'px', 
              top: target.y + 'px',
              transform: `scale(${target.scale})`
            }"
            @click.stop="hitTarget(target)"
          >
            🎯
          </div>
          
          <!-- Instructions -->
          <div class="game-instructions" v-if="!targetGameRunning">
            <p>Use the Force to hit the targets!</p>
            <p>Click on targets as they appear!</p>
            <button @click="startTargetPracticeGame" class="start-btn">Begin Training</button>
          </div>
          
          <!-- Game over -->
          <div class="game-over" v-if="targetGameOver">
            <h3>Training Complete!</h3>
            <p>Targets Hit: {{ targetScore }}</p>
            <p>Accuracy: {{ Math.round((targetScore / totalTargets) * 100) }}%</p>
            <button @click="resetTargetGame" class="restart-btn">Train Again</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Memory Game -->
    <div class="game-modal" v-if="currentGame === 'memory'" @click.self="closeGame">
      <div class="game-content">
        <div class="game-header">
          <h2>🧠 Jedi Memory Test</h2>
          <div class="game-stats">
            <span>Level: {{ memoryLevel }}</span>
            <span>Score: {{ memoryScore }}</span>
          </div>
          <button class="close-game" @click="closeGame">×</button>
        </div>
        
        <div class="memory-arena">
          <!-- Memory sequence display -->
          <div class="memory-grid">
            <div
              v-for="(cell, index) in memoryCells"
              :key="index"
              class="memory-cell"
              :class="{ 'active': cell.active, 'player-click': cell.playerClick }"
              @click="playerMemoryClick(index)"
            >
              {{ memorySymbols[index] }}
            </div>
          </div>
          
          <!-- Instructions -->
          <div class="game-instructions" v-if="!memoryGameRunning">
            <p>Watch the sequence, then repeat it!</p>
            <p>Each level adds one more step!</p>
            <button @click="startMemoryGame" class="start-btn">Begin Test</button>
          </div>
          
          <!-- Game over -->
          <div class="game-over" v-if="memoryGameOver">
            <h3>{{ memorySuccess ? 'Well Done, Padawan!' : 'Focus, you must!' }}</h3>
            <p>Level Reached: {{ memoryLevel }}</p>
            <p>Score: {{ memoryScore }}</p>
            <button @click="resetMemoryGame" class="restart-btn">Test Again</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Main game state
const showGamesMenu = ref(false)
const currentGame = ref(null)

// Lightsaber Defense Game
const lightsaberScore = ref(0)
const lightsaberLives = ref(3)
const gameRunning = ref(false)
const gameOver = ref(false)
const playerX = ref(200)
const playerY = ref(300)
const blasterBolts = ref([])
const gameArena = ref(null)

// Target Practice Game
const targetScore = ref(0)
const targetTime = ref(30)
const targetGameRunning = ref(false)
const targetGameOver = ref(false)
const targets = ref([])
const totalTargets = ref(0)

// Memory Game
const memoryLevel = ref(1)
const memoryScore = ref(0)
const memoryGameRunning = ref(false)
const memoryGameOver = ref(false)
const memorySuccess = ref(false)
const memoryCells = ref(Array(9).fill().map(() => ({ active: false, playerClick: false })))
const memorySymbols = ['⚡', '🌟', '✨', '🔮', '⭐', '🌙', '☄️', '💫', '🌠']
const memorySequence = ref([])
const playerSequence = ref([])
const showingSequence = ref(false)

let gameInterval = null
let targetInterval = null
let memoryTimeout = null

// Game menu functions
const toggleGamesMenu = () => {
  showGamesMenu.value = !showGamesMenu.value
}

const startLightsaberGame = () => {
  currentGame.value = 'lightsaber'
  showGamesMenu.value = false
}

const startTargetPractice = () => {
  currentGame.value = 'target'
  showGamesMenu.value = false
}

const startMemoryGame = () => {
  currentGame.value = 'memory'
  showGamesMenu.value = false
}

const closeGame = () => {
  currentGame.value = null
  resetAllGames()
}

// Lightsaber Defense Game Functions
const moveLightsaber = (event) => {
  if (!gameRunning.value) return
  
  const rect = gameArena.value.getBoundingClientRect()
  playerX.value = event.clientX - rect.left - 25
  playerY.value = event.clientY - rect.top - 25
}

const startLightsaberDefense = () => {
  gameRunning.value = true
  gameOver.value = false
  
  gameInterval = setInterval(() => {
    spawnBlasterBolt()
    updateBlasterBolts()
  }, 100)
}

const spawnBlasterBolt = () => {
  if (Math.random() < 0.03) { // 3% chance per frame
    blasterBolts.value.push({
      id: Date.now(),
      x: Math.random() * 400,
      y: -10,
      speed: 2 + Math.random() * 2
    })
  }
}

const updateBlasterBolts = () => {
  blasterBolts.value.forEach((bolt, index) => {
    bolt.y += bolt.speed
    
    // Check collision with player
    const distance = Math.sqrt(
      Math.pow(bolt.x - playerX.value, 2) + 
      Math.pow(bolt.y - playerY.value, 2)
    )
    
    if (distance < 30) {
      // Deflected!
      lightsaberScore.value += 10
      blasterBolts.value.splice(index, 1)
    } else if (bolt.y > 400) {
      // Missed - lose life
      lightsaberLives.value--
      blasterBolts.value.splice(index, 1)
      
      if (lightsaberLives.value <= 0) {
        endLightsaberGame()
      }
    }
  })
}

const endLightsaberGame = () => {
  gameRunning.value = false
  gameOver.value = true
  clearInterval(gameInterval)
}

const resetLightsaberGame = () => {
  lightsaberScore.value = 0
  lightsaberLives.value = 3
  gameRunning.value = false
  gameOver.value = false
  blasterBolts.value = []
}

// Target Practice Functions
const startTargetPracticeGame = () => {
  targetGameRunning.value = true
  targetGameOver.value = false
  targetTime.value = 30
  totalTargets.value = 0
  
  targetInterval = setInterval(() => {
    targetTime.value--
    spawnTarget()
    
    if (targetTime.value <= 0) {
      endTargetGame()
    }
  }, 1000)
}

const spawnTarget = () => {
  if (targets.value.length < 3) {
    targets.value.push({
      id: Date.now(),
      x: Math.random() * 350,
      y: Math.random() * 250,
      scale: 0.8 + Math.random() * 0.4
    })
    totalTargets.value++
    
    // Remove target after 3 seconds
    setTimeout(() => {
      targets.value = targets.value.filter(t => t.id !== targets.value[0]?.id)
    }, 3000)
  }
}

const hitTarget = (target) => {
  targetScore.value++
  targets.value = targets.value.filter(t => t.id !== target.id)
}

const endTargetGame = () => {
  targetGameRunning.value = false
  targetGameOver.value = true
  clearInterval(targetInterval)
}

const resetTargetGame = () => {
  targetScore.value = 0
  targetTime.value = 30
  targetGameRunning.value = false
  targetGameOver.value = false
  targets.value = []
  totalTargets.value = 0
}

// Memory Game Functions
const startMemoryGamePlay = () => {
  memoryGameRunning.value = true
  memoryGameOver.value = false
  generateMemorySequence()
}

const generateMemorySequence = () => {
  memorySequence.value = []
  for (let i = 0; i < memoryLevel.value; i++) {
    memorySequence.value.push(Math.floor(Math.random() * 9))
  }
  showMemorySequence()
}

const showMemorySequence = () => {
  showingSequence.value = true
  playerSequence.value = []
  
  memorySequence.value.forEach((cellIndex, i) => {
    memoryTimeout = setTimeout(() => {
      memoryCells.value[cellIndex].active = true
      
      setTimeout(() => {
        memoryCells.value[cellIndex].active = false
        if (i === memorySequence.value.length - 1) {
          showingSequence.value = false
        }
      }, 500)
    }, i * 800)
  })
}

const playerMemoryClick = (index) => {
  if (showingSequence.value || memoryGameOver.value) return
  
  memoryCells.value[index].playerClick = true
  setTimeout(() => {
    memoryCells.value[index].playerClick = false
  }, 200)
  
  playerSequence.value.push(index)
  
  // Check if correct
  if (playerSequence.value[playerSequence.value.length - 1] !== memorySequence.value[playerSequence.value.length - 1]) {
    // Wrong!
    memoryGameOver.value = true
    memorySuccess.value = false
  } else if (playerSequence.value.length === memorySequence.value.length) {
    // Level complete!
    memoryScore.value += memoryLevel.value * 100
    memoryLevel.value++
    
    if (memoryLevel.value > 10) {
      // Game won!
      memoryGameOver.value = true
      memorySuccess.value = true
    } else {
      // Next level
      setTimeout(generateMemorySequence, 1000)
    }
  }
}

const resetMemoryGame = () => {
  memoryLevel.value = 1
  memoryScore.value = 0
  memoryGameRunning.value = false
  memoryGameOver.value = false
  memorySuccess.value = false
  memorySequence.value = []
  playerSequence.value = []
  memoryCells.value.forEach(cell => {
    cell.active = false
    cell.playerClick = false
  })
}

const resetAllGames = () => {
  clearInterval(gameInterval)
  clearInterval(targetInterval)
  clearTimeout(memoryTimeout)
  resetLightsaberGame()
  resetTargetGame()
  resetMemoryGame()
}

onUnmounted(() => {
  resetAllGames()
})

// Expose functions for achievements
defineExpose({
  startLightsaberGame,
  startTargetPractice,
  startMemoryGame
})
</script>

<style scoped>
.mini-games-container {
  position: fixed;
  bottom: 6rem;
  right: 2rem;
  z-index: 1000;
}

.games-toggle {
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

.games-toggle:hover {
  background: rgba(255, 232, 31, 0.2);
  transform: scale(1.1);
  box-shadow: 0 4px 15px rgba(255, 232, 31, 0.3);
}

.games-menu {
  position: absolute;
  bottom: 60px;
  right: 0;
  background: rgba(0, 0, 0, 0.95);
  border: 1px solid #ffe81f;
  border-radius: 12px;
  padding: 1rem;
  min-width: 250px;
  backdrop-filter: blur(10px);
  animation: slideUp 0.3s ease;
}

.games-menu h3 {
  color: #ffe81f;
  margin: 0 0 1rem 0;
  text-align: center;
}

.games-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.game-btn {
  background: rgba(255, 232, 31, 0.1);
  border: 1px solid #ffe81f;
  color: #ffe81f;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Orbitron', sans-serif;
}

.game-btn:hover {
  background: #ffe81f;
  color: #000;
  transform: translateY(-2px);
}

.game-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1004;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  animation: fadeIn 0.3s ease;
}

.game-content {
  background: rgba(0, 0, 0, 0.95);
  border: 2px solid #ffe81f;
  border-radius: 20px;
  padding: 1.5rem;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  box-shadow: 0 0 30px rgba(255, 232, 31, 0.5);
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 232, 31, 0.3);
  padding-bottom: 1rem;
}

.game-header h2 {
  color: #ffe81f;
  margin: 0;
}

.game-stats {
  display: flex;
  gap: 1rem;
  color: #ccc;
}

.close-game {
  background: transparent;
  border: 1px solid #ffe81f;
  color: #ffe81f;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-game:hover {
  background: #ffe81f;
  color: #000;
}

/* Lightsaber Game Styles */
.game-arena {
  position: relative;
  width: 500px;
  height: 400px;
  background: linear-gradient(to bottom, #000428, #004e92);
  border: 1px solid #ffe81f;
  border-radius: 8px;
  overflow: hidden;
  cursor: none;
}

.player-saber {
  position: absolute;
  width: 50px;
  height: 8px;
  background: linear-gradient(90deg, #333, #00ff00, #333);
  border-radius: 4px;
  box-shadow: 0 0 15px #00ff00;
  pointer-events: none;
}

.blaster-bolt {
  position: absolute;
  width: 8px;
  height: 20px;
  background: #ff4444;
  border-radius: 4px;
  box-shadow: 0 0 8px #ff4444;
  pointer-events: none;
}

/* Target Game Styles */
.target-arena {
  position: relative;
  width: 500px;
  height: 400px;
  background: linear-gradient(45deg, #2c1810, #8b4513);
  border: 1px solid #ffe81f;
  border-radius: 8px;
  overflow: hidden;
  cursor: crosshair;
}

.target {
  position: absolute;
  font-size: 2rem;
  cursor: pointer;
  transition: transform 0.1s ease;
  animation: targetFloat 2s ease-in-out infinite;
}

.target:hover {
  transform: scale(1.2) !important;
}

/* Memory Game Styles */
.memory-arena {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.memory-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.memory-cell {
  aspect-ratio: 1;
  background: rgba(255, 232, 31, 0.1);
  border: 1px solid #ffe81f;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.memory-cell.active {
  background: #ffe81f;
  color: #000;
  box-shadow: 0 0 20px #ffe81f;
  transform: scale(1.1);
}

.memory-cell.player-click {
  background: rgba(255, 232, 31, 0.3);
  transform: scale(0.95);
}

/* Common Game Styles */
.game-instructions {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #ffe81f;
  background: rgba(0, 0, 0, 0.8);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #ffe81f;
}

.start-btn {
  background: #ffe81f;
  color: #000;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
  font-family: 'Orbitron', sans-serif;
}

.game-over {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #ffe81f;
  background: rgba(0, 0, 0, 0.9);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #ffe81f;
}

.restart-btn {
  background: #ffe81f;
  color: #000;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
  font-family: 'Orbitron', sans-serif;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes targetFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@media (max-width: 768px) {
  .mini-games-container {
    right: 0.5rem;
    bottom: 4rem;
  }
  
  .games-toggle {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
  
  .games-menu {
    min-width: 200px;
  }
  
  .game-content {
    width: 95%;
    padding: 1rem;
  }
  
  .game-arena,
  .target-arena {
    width: 100%;
    max-width: 400px;
    height: 300px;
  }
}
</style>
