<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Task Details</h1>
  
      <!-- Display task details if task is found -->
      <div v-if="task">
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
          <input 
            type="text" 
            id="title" 
            v-model="task.title" 
            class="mt-1 p-2 w-full border border-gray-300 rounded"
            :readonly="isUpdating"
          />
        </div>
  
        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea 
            id="description" 
            v-model="task.description" 
            class="mt-1 p-2 w-full border border-gray-300 rounded"
            :readonly="isUpdating"
          ></textarea>
        </div>
  
        <div class="mb-4">
          <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
          <select 
            id="status" 
            v-model="task.status" 
            class="mt-1 p-2 w-full border border-gray-300 rounded"
            :disabled="isUpdating"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
  
        <div class="flex justify-between">
          <!-- Button to toggle task edit mode -->
          <button 
            v-if="!isUpdating" 
            @click="editTask" 
            class="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Edit Task
          </button>
  
          <!-- Button to update the task -->
          <button 
            v-if="isUpdating" 
            @click="updateTask" 
            class="px-4 py-2 bg-green-500 text-white rounded"
          >
            Update Task
          </button>

          <button>
            <router-link to="/tasks" class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition">
              Home
            </router-link>
            </button>
  
          <!-- Button to delete the task -->
          <button 
            @click="deleteTask" 
            class="px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete Task
          </button>
        </div>
      </div>
  
      <!-- Error message if task not found -->
      <p v-else class="text-red-500">Task not found.</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  
  // Initialize task object and update flag
  const task = ref(null)
  const isUpdating = ref(false)
  const router = useRouter()
  
  // Get taskId from route params
  const { taskId } = router.currentRoute.value.params
  
  // Fetch task details on component mount
  onMounted(async () => {
    // Get token from localStorage
    const token = localStorage.getItem('token')
  
    // If token is not found, redirect to login page
    if (!token) {
      router.push('/auth/login')
      return
    }
  
    // Fetch the task details
    try {
      const res = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
  
      // If task is found, store it
      if (res.ok) {
        task.value = await res.json()
      } else {
        // If task is not found, show error
        router.push('/tasks')
      }
    } catch (error) {
      console.error('Error fetching task:', error)
      router.push('/auth/login') // Redirect to login if any error occurs
    }
  })
  
  // Enable editing mode
  const editTask = () => {
    isUpdating.value = true
  }
  
  // Update task
  const updateTask = async () => {
    // Get token from localStorage
    const token = localStorage.getItem('token')
  
    // If token is not found, redirect to login page
    if (!token) {
      router.push('/auth/login')
      return
    }
  
    // Send updated task data to API
    try {
      const res = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: task.value.title,
          description: task.value.description,
          status: task.value.status
        })
      })
  
      if (res.ok) {
        isUpdating.value = false
        // Optionally show success message or refetch data
      } else {
        // Handle error (e.g., invalid data)
        console.error('Failed to update task')
      }
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }
  
  // Delete task
  const deleteTask = async () => {
    // Get token from localStorage
    const token = localStorage.getItem('token')
  
    // If token is not found, redirect to login page
    if (!token) {
      router.push('/auth/login')
      return
    }
  
    // Confirm task deletion
    const confirmDelete = window.confirm('Are you sure you want to delete this task?')
  
    if (confirmDelete) {
      // Send delete request to API
      try {
        const res = await fetch(`http://localhost:5000/tasks/${taskId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        })
  
        if (res.ok) {
          router.push('/tasks') // Redirect to tasks list after deletion
        } else {
          console.error('Failed to delete task')
        }
      } catch (error) {
        console.error('Error deleting task:', error)
      }
    }
  }
  </script>
  