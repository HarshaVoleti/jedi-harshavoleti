<!-- src/components/ContactForm.vue -->
<template>
    <section class="contact-section">
      <h2>Contact Master Harsha - Voleti</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Your Name</label>
          <input v-model="form.name" type="text" id="name" required />
        </div>
  
        <div class="form-group">
          <label for="email">Your Email</label>
          <input v-model="form.email" type="email" id="email" required />
        </div>
  
        <div class="form-group">
          <label for="message">Your Message</label>
          <textarea v-model="form.message" id="message" rows="4" required></textarea>
        </div>
  
        <button type="submit">Send Transmission</button>
      </form>
    </section>
  </template>
  
  <script setup>
    import { reactive } from 'vue'
    import emailjs from 'emailjs-com'

  
  const form = reactive({
    name: '',
    email: '',
    message: ''
  })
  
  function handleSubmit() {
  const serviceID = 'service_cv2zvpe'
  const templateID = 'template_mpvigj3'  // ⚠️ Change this
  const publicKey = 'LPG1CD-0AttTzYaX6'

  const templateParams = {
    name: form.name,
    email: form.email,
    message: form.message
  }

  emailjs.send(serviceID, templateID, templateParams, publicKey)
    .then(() => {
      alert(`📡 Transmission sent successfully! Master Harsha will respond soon.`)
      form.name = ''
      form.email = ''
      form.message = ''
    })
    .catch((err) => {
      alert('⚠️ Transmission failed. The dark side might be interfering. Try again.')
      console.error('EmailJS Error:', err)
    })
}

  </script>
  
  <style scoped>
  .contact-section {
    padding: 4rem 2rem;
    text-align: center;
    color: #ffe81f;
    font-family: 'Orbitron', sans-serif;
    background: transparent;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .contact-section h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: transparent;
    -webkit-text-stroke: 1px #ffe81f;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    text-align: left;
  }
  
  label {
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #ffe81f;
  }
  
  input,
  textarea {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid #ffe81f;
    border-radius: 8px;
    padding: 0.8rem;
    color: #ffe81f;
    font-family: inherit;
    font-size: 1rem;
    outline: none;
    transition: 0.3s;
  }
  
  input:focus,
  textarea:focus {
    border-color: #fff500;
    box-shadow: 0 0 8px #fff500;
  }
  
  button {
    background: #ffe81f;
    color: #000;
    padding: 0.8rem 1.2rem;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  button:hover {
    background: #fff500;
  }
  </style>
  