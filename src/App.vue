<script lang="ts">
import { defineComponent, computed } from "vue";
import { RouterView } from "vue-router";
import { useStore } from "vuex";
import TheHeader from "./components/TheHeader.vue";
import { SNACKBAR_TYPE } from "./types/Store.interface";

export default defineComponent({
  components: { TheHeader, RouterView },
  setup() {
    const store = useStore();
    const snackbar = computed(() => store.getters.getSnackbarConfig);
    const color = computed(() => {
      switch (snackbar.value.type) {
        case SNACKBAR_TYPE.ERROR:
          return "light-error";
        case SNACKBAR_TYPE.INFO:
          return "primary";
        default:
          return "success";
      }
    });

    return {
      snackbar,
      color,
    };
  },
});
</script>

<template>
  <header>
    <TheHeader />
  </header>
  <RouterView />
  <v-snackbar
    v-model="snackbar.show"
    :timeout="2000"
    :color="color"
    variant="tonal"
  >
    <p>{{ snackbar.text }}</p>
  </v-snackbar>
</template>

<style scoped></style>
