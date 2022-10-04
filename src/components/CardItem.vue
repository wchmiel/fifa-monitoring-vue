<script setup lang="ts">
const props = defineProps({
  title: String,
  subtitle: String,
  iconSrc: String,
});
</script>

<template>
  <v-card tonal class="mehow-card py-3">
    <v-card-title class="mb-0 pb-0">
      <img
        class="mehow-card__icon rounded-circle pa-2 mb-2 d-block bg-white"
        :src="iconSrc"
        alt="Players Icon"
      />
      <p>{{ props.title }}</p>
    </v-card-title>
    <v-card-subtitle>
      <p>{{ props.subtitle }}</p>
    </v-card-subtitle>
    <slot></slot>
  </v-card>
</template>
