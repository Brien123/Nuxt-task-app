<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Edit Task</h1>

    <form @submit.prevent="updateTask" class="bg-white p-6 rounded shadow-md">
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
          Update Task
        </button>
        <router-link :to="`/task/${task._id}`" class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition">
          Cancel
        </router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const route = useRoute()
const router = useRouter()
const task = ref({ title: '', description: '', status: 'pending' })

// Fetch task by ID from query parameters
onMounted(async () => {
  const taskId = route.query.id
  const res = await fetch(`http://localhost:5000/tasks/${taskId}`)
  task.value = await res.json()
})

const updateTask = async () => {
  const taskId = route.query.id
  await fetch(`http://localhost:5000/tasks/${taskId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task.value)
  })
  router.push(`/task/${taskId}`)
}
</script>
