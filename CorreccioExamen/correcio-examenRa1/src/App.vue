<script setup></script>

<template>
  <header>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/foods">Foods</RouterLink>
    <RouterLink to="/trainings">Trainings</RouterLink>
  </header>
  <main>
    <RouterView />
  </main>
  <!-- <footer>footer</footer> -->
</template>

<style scoped></style>
