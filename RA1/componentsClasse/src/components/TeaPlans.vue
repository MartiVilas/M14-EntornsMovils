<script setup>
defineProps({
  type: String,
})
</script>

<template>
  <div class="plans">
    <div class="plan">
      <div class="description">
        <span class="title"> {{ type }} </span>
      </div>
    </div>
  </div>
</template>
