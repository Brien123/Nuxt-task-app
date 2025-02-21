<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-3xl font-bold">Welcome to My App</h1>
    <div class="mt-6 space-x-4">
      <NuxtLink to="/auth/signup" class="px-4 py-2 bg-blue-500 text-white rounded">Signup</NuxtLink>
      <NuxtLink to="/auth/login" class="px-4 py-2 bg-green-500 text-white rounded">Login</NuxtLink>
    </div>
  </div>
</template>
