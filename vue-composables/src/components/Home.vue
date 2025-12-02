<script setup>
import { useCounter } from '../composables/useCounter.js'
const { count, increment, decrement } = useCounter()
</script>

<template>
  <div>
    <p>Compte: {{ count }}</p>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
  </div>
</template>
