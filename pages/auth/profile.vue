<template>
    <div class="flex flex-col items-center justify-center h-screen">
      <h2 class="text-2xl font-bold mb-4">Profile</h2>
      <div v-if="profile">
        <p><strong>Email:</strong> {{ profile.email }}</p>
        <p><strong>Name:</strong> {{ profile.name }}</p>
      </div>
      <button @click="logout" class="mt-4 bg-red-500 text-white px-4 py-2 rounded">Logout</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  
  const profile = ref(null)
  const router = useRouter()
  
  onMounted(async () => {
    const token = localStorage.getItem('token')
    if (!token) return router.push('/auth/login')
  
    const res = await fetch('http://localhost:5000/auth/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (res.ok) profile.value = await res.json()
  })
  
  function logout() {
    localStorage.removeItem('token')
    router.push('/auth/login')
  }
  </script>
  