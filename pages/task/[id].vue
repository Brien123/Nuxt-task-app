<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Task Details</h1>

    <div v-if="task" class="bg-white p-6 rounded shadow-md">
      <h2 class="text-gray-700 mt-2"><strong>Title:</strong>{{ task.title }}</h2>
      <p class="text-gray-700 mt-2"><strong>Description:</strong>{{ task.description }}</p>
      <p class="mt-2"><strong>Status:</strong> <span :class="statusClass(task.status)">{{ task.status }}</span></p>
      <p class="mt-2"><strong>Created At:</strong> {{ formatDate(task.createdAt) }}</p>

      <div class="flex gap-4 mt-4">
        <router-link :to="`/task/edit?id=${task._id}`" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          Edit Task
        </router-link>
        <button @click="confirmDelete" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
          Delete Task
        </button>

        <button>
          <router-link to="/" class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition">
            Home
          </router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const route = useRoute()
const router = useRouter()
const task = ref(null)

onMounted(async () => {
  const res = await fetch(`http://localhost:5000/tasks/${route.params.id}`)
  task.value = await res.json()
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const statusClass = (status) => {
  return status === 'completed' ? 'text-green-600 font-semibold' : 'text-yellow-600 font-semibold'
}

const confirmDelete = async () => {
  if (confirm("Are you sure you want to delete this task?")) {
    await fetch(`http://localhost:5000/tasks/${route.params.id}`, { method: 'DELETE' })
    router.push('/')
  }
}
</script>
