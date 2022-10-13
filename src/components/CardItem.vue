<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: String,
    subtitle: String,
    iconSrc: String,
    buttonText: String,
    buttonAction: Function,
  },
  setup(props) {
    return {
      props,
    };
  },
});
</script>

<template>
  <v-card tonal class="mehow-card py-3">
    <v-card-title class="mb-0 pb-0">
      <v-row no-gutters>
        <v-col>
          <img
            class="mehow-card__icon rounded-circle pa-2 mb-2 d-block bg-white"
            :src="iconSrc"
            alt="Players Icon"
          />
        </v-col>
        <v-col
          v-if="props.buttonAction"
          class="d-flex justify-center align-center"
        >
          <v-btn color="secondary" @click="props.buttonAction">
            {{ props.buttonText }}
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p>{{ props.title }}</p>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-subtitle>
      <p>{{ props.subtitle }}</p>
    </v-card-subtitle>
    <slot></slot>
  </v-card>
</template>
