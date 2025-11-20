<script setup></script>

<template>
  <header>
    <title>FoodExplorer</title>
    <navbar class="header">
      <RouterLink to="/">Inici</RouterLink>
      <RouterLink to="/receptes">Receptes</RouterLink>
    </navbar>
  </header>
  <RouterView></RouterView>
</template>

<style scoped></style>
