<script setup>
import Receptes from '@/data/Receptes'
import RecepteDetail from './RecepteDetail.vue'
</script>
<template>
  <div>
    <h1>RECEPTES</h1>
    <div v-for="recepte in Receptes" :key="recepte.id">
      <RecepteDetail :nom="recepte.nom" :descripcio="recepte.descripcio" />
    </div>
  </div>
</template>
<style></style>
