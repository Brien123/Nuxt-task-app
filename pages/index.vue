<template>
  <div class="container mx-auto p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Task List</h1>
      <router-link
        to="/task/new"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        + Create Task
      </router-link>
    </div>

    <table class="w-full border-collapse border border-gray-300 shadow-lg">
      <thead>
        <tr class="bg-gray-200">
          <th class="border border-gray-300 p-2 text-left">Title</th>
          <th class="border border-gray-300 p-2 text-left">Description</th>
          <th class="border border-gray-300 p-2 text-left">Status</th>
          <th class="border border-gray-300 p-2 text-left">Created At</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task._id" class="hover:bg-gray-100">
          <td class="border border-gray-300 p-2">
            <router-link :to="`/task/${task._id}`" class="text-blue-500 hover:underline">
              {{ task.title }}
            </router-link>
          </td>
          <td class="border border-gray-300 p-2">{{ task.description }}</td>
          <td class="border border-gray-300 p-2">
            <span :class="statusClass(task.status)">{{ task.status }}</span>
          </td>
          <td class="border border-gray-300 p-2">{{ formatDate(task.createdAt) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
// Fetch tasks from the API
const { data: tasks, error } = useFetch('http://localhost:5000/tasks')

// Format the date to a more readable format
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Return the appropriate CSS class based on the task status
const statusClass = (status) => {
  return status === 'completed' ? 'text-green-600 font-semibold' : 'text-yellow-600 font-semibold'
}
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
