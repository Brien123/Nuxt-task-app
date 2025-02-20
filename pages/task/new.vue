<template>
    <div class="container mx-auto p-6">
      <h1 class="text-2xl font-bold mb-4">Create New Task</h1>
  
      <form @submit.prevent="createTask" class="bg-white p-6 rounded shadow-md">
        <div class="mb-4">
          <label class="block font-semibold mb-1">Title</label>
          <input v-model="task.title" type="text" class="w-full p-2 border rounded" required />
        </div>
  
        <div class="mb-4">
          <label class="block font-semibold mb-1">Description</label>
          <textarea v-model="task.description" class="w-full p-2 border rounded" required></textarea>
        </div>
  
        <div class="mb-4">
          <label class="block font-semibold mb-1">Status</label>
          <select v-model="task.status" class="w-full p-2 border rounded">
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
  
        <div class="flex gap-4">
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Create Task
          </button>
          <router-link to="/" class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition">
            Cancel
          </router-link>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const task = ref({
    title: '',
    description: '',
    status: 'pending'
  })
  
  const createTask = async () => {
    try {
      await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task.value)
      })
      router.push('/')
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
  }
  </style>
  