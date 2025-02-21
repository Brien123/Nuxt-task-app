<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Your Tasks</h1>
  
      <!-- Button to create a new task -->
      <NuxtLink to="/tasks/create" class="px-4 py-2 bg-blue-500 text-white rounded">Create Task</NuxtLink>
  
      <!-- Task List -->
      <ul v-if="tasks.length" class="mt-4">
        <li v-for="task in tasks" :key="task.id" class="border p-2 my-2 rounded flex justify-between items-center">
          <div>
            <NuxtLink :to="`/tasks/${task.id}`" class="text-lg font-semibold">{{ task.title }}</NuxtLink>
            <p class="text-sm text-gray-500">{{ task.description }}</p>
          </div>
          <span class="text-xs text-gray-500">{{ task.status }}</span>
        </li>
      </ul>
  
      <!-- No Tasks Found Message -->
      <p v-else>No tasks found.</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  
  // Initialize tasks array to hold fetched tasks
  const tasks = ref([])
  const router = useRouter()
  
  // Fetch tasks on component mount
  onMounted(async () => {
    // Get token from localStorage
    const token = localStorage.getItem('token')
  
    // If token is not found, redirect user to login page
    if (!token) {
      router.push('/auth/login')
      return
    }
  
    // Fetch the tasks of the authenticated user
    try {
      const res = await fetch('http://localhost:5000/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      })
  
      // If the request is successful, store tasks
      if (res.ok) {
        tasks.value = await res.json()
      } else {
        // Handle errors (e.g., unauthorized)
        router.push('/auth/login') // Redirect to login if unauthorized
      }
    } catch (error) {
      console.error('Error fetching tasks:', error)
      router.push('/auth/login') // Redirect to login if any error occurs
    }
  })
  </script>
  