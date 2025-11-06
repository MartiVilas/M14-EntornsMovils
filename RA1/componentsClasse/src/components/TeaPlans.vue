<script setup>
//recibir
const props = defineProps({
  type: String,
})

//enviar
const emit = defineEmits(['typeTea'])

const enviarNom = () => {
  emit('typeTea', props.type)
}
</script>

<template>
  <div class="plans" @click="enviarNom">
    <div class="plan">
      <div class="description">
        <span class="title">{{ props.type }}</span>
      </div>
    </div>
  </div>
</template>
