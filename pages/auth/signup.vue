<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h2 class="text-2xl font-bold mb-4">Signup</h2>
    <form @submit.prevent="signup" class="flex flex-col space-y-3">
      <input v-model="email" type="email" placeholder="Email" class="border p-2 rounded" required />
      <input v-model="password" type="password" placeholder="Password" class="border p-2 rounded" required />
      <input v-model="name" type="text" placeholder="Name (Optional)" class="border p-2 rounded" />
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Signup</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const name = ref('')
const router = useRouter()

async function signup() {
  const res = await fetch('http://localhost:5000/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.value, password: password.value, name: name.value })
  })
  if (res.ok) router.push('/auth/login')
}
</script>
