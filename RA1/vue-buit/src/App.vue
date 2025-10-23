<script setup lang="ts">
import { ref } from 'vue'
const contador = ref(0)

const sumar = () => {
  return contador.value++
}

const restar = () => {
  if (contador.value <= 0) {
    return
  }
  return contador.value--
}

const reiniciar = () => {
  return (contador.value = 0)
}
</script>

<template>
  <h1>Counter</h1>
  <span>Número: {{ contador }}</span
  ><br /><br />
  <button @click="sumar">Sumar</button><br /><br />
  <button @click="restar">Restar</button><br /><br />
  <button @click="reiniciar">Reiniciar</button>
</template>

<style scoped>
/* Fondo y fuente general */
body {
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #1e1f29, #2d2f3a);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* Contenedor principal */
h1 {
  text-align: center;
  font-size: 2.5rem;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  color: #00d4ff;
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.6);
}

/* Texto del número */
span {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  margin: 10px 0;
  text-align: center;
  color: #ffd166;
  transition:
    transform 0.2s ease,
    color 0.3s ease;
}

span:hover {
  transform: scale(1.1);
  color: #ffb703;
}

/* Botón */
button {
  background: linear-gradient(135deg, #00d4ff, #0077ff);
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  border: none;
  padding: 10px 20px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin: 0 auto;
}

button:hover {
  background: linear-gradient(135deg, #00b4d8, #023e8a);
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.6);
}

button:active {
  transform: scale(0.97);
}
</style>
