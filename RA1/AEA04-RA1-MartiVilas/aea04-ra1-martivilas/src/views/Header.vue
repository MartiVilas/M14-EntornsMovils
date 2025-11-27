<script setup></script>
<template>
  <header>
    <navbar class="header">
      <RouterLink to="/">Inici</RouterLink>
      <RouterLink to="/receptes">Receptes</RouterLink>
      <RouterLink to="/gadgets">Gadgets</RouterLink>
    </navbar>
  </header>
</template>
<style>
.header {
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: end;
  text-decoration: none;
}
</style>
