<script setup>
const achievements = [
  {
    title: "GDSC Volunteer",
    role: "Mobile App Development Volunteer",
    year: "3rd Year B.Tech",
    description: "Contributed to student development as a mobile developer.",
    image: ""
  },
  {
    title: "GDSC Lead",
    role: "App Development Lead",
    year: "4th Year B.Tech",
    description: "Led the app development initiatives, mentoring juniors and driving mobile innovation.",
    image: ""
  },
  {
    title: "Freelance Developer",
    role: "Independent",
    year: "2023-2024",
    description: "Delivered multiple freelance app and web development projects for startups.",
    image: ""
  },
  {
    title: "Guest Speaker - Marketing",
    role: "Invited Speaker",
    year: "2025",
    description: "Delivered a 1-hour session on ‘Marketing for Startups & Professionals’.",
    image: "your-image.jpg", // replace with actual path
    showWorkshop: true
  }
]
</script>

<template>
  <section class="achievements-section">
    <h2 class="section-title">Achievements</h2>
    <div class="achievement-grid">
      <div
        class="achievement-card"
        v-for="(a, i) in achievements"
        :key="i"
      >
        <h3>{{ a.title }}</h3>
        <h4>{{ a.role }} <span class="year">({{ a.year }})</span></h4>
        <p>{{ a.description }}</p>

        <button
          v-if="a.showWorkshop"
          class="view-more"
          @click="$emit('show-workshop')"
        >
          View Workshop
        </button>

        <img
          v-if="a.image && !a.showWorkshop"
          :src="a.image"
          alt="Achievement"
          class="achievement-image"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.achievements-section {
  padding: 4rem 2rem;
  background: transparent;
  width: 100%;
  color: #ffe81f;
  font-family: 'Orbitron', sans-serif;
  text-align: center;
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: transparent;
  -webkit-text-stroke: 1.2px #ffe81f;
}

.achievement-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.achievement-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #ffe81f;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 0 12px rgba(255, 232, 31, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: left;
}

.achievement-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 20px rgba(255, 232, 31, 0.5);
}

.achievement-card h3 {
  margin: 0;
  font-size: 1.4rem;
}

.achievement-card h4 {
  margin: 0.5rem 0;
  font-size: 1.1rem;
}

.year {
  color: #ccc;
  font-size: 0.9rem;
  margin-left: 0.5rem;
}

.achievement-card p {
  font-size: 0.95rem;
  line-height: 1.4;
}

.view-more {
  margin-top: 1rem;
  background: transparent;
  color: #ffe81f;
  border: 1px solid #ffe81f;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.view-more:hover {
  background: #ffe81f;
  color: black;
}

.achievement-image {
  margin-top: 1rem;
  width: 100%;
  max-height: 150px;
  object-fit: cover;
  border-radius: 8px;
}
</style>
