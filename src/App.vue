<script lang="ts">
import { defineComponent, computed } from "vue";
import { RouterView } from "vue-router";
import { useStore } from "vuex";
import TheHeader from "./components/TheHeader.vue";
import { ACTIONS, SNACKBAR_TYPE } from "./types/Store.interface";

export default defineComponent({
  components: { TheHeader, RouterView },
  setup() {
    const store = useStore();

    // Check if user is logged in.
    store.dispatch(ACTIONS.GET_USER);

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
  <v-app>
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
  </v-app>
</template>

<style scoped></style>
