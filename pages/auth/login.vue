<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h2 class="text-2xl font-bold mb-4">Login</h2>
    <form @submit.prevent="login" class="flex flex-col space-y-3">
      <input v-model="email" type="email" placeholder="Email" class="border p-2 rounded" required />
      <input v-model="password" type="password" placeholder="Password" class="border p-2 rounded" required />
      <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

async function login() {
  const res = await fetch('http://localhost:5000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.value, password: password.value })
  })
  const data = await res.json()
  if (res.ok) {
    localStorage.setItem('token', data.accessToken)
    console.log(data)
    router.push('/tasks')
  }
}
</script>

