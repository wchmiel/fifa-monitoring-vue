<script lang="ts">
import { ACTIONS, MUTATIONS } from "@/types/Store.interface";
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const isUserAuthenticated = computed(
      () => store.getters.isUserAuthenticated
    );
    const userData = computed(() => store.getters.getUserData);

    const onLogout = () => {
      store.dispatch(ACTIONS.LOGOUT_USER);
      store.commit(MUTATIONS.SHOW_SNACKBAR, { text: "Wylogowano poprawnie." });
    };

    return {
      isUserAuthenticated,
      userData,
      onLogout,
    };
  },
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="mehow-header-wrapper">
          <img src="/header_logo.png" alt="MeHow Logo" />
          <div>
            <h1>Entertainment manager</h1>
            <h3>By MeHow i Synowie</h3>
          </div>
        </div>
      </v-col>
      <v-col
        v-if="isUserAuthenticated && userData"
        cols="3"
        class="d-flex justify-center align-center pr-2"
      >
        <v-menu transition="scroll-y-transition">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" variant="outlined">
              <v-icon size="24px">mdi-format-list-bulleted-square</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <div class="mx-auto text-center">
                <v-avatar size="48px" class="mb-2">
                  <v-img alt="Avatar" :src="userData.avatar"></v-img>
                </v-avatar>
                <p class="text-h6">{{ userData.name }}</p>
                <p class="text-subtitle-2 mt-1 font-weight-light">
                  {{ userData.company }}
                </p>
                <v-divider class="my-3"></v-divider>
                <v-btn rounded variant="text" @click="onLogout">
                  Wyloguj
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.mehow-header-wrapper {
  padding: 20px;
  color: #fff;
  display: flex;
  align-items: center;
}

@media (min-width: 1280px) {
  h1 {
    font-size: 2.5rem;
    letter-spacing: 2px;
  }

  h3 {
    font-size: 1.5rem;
  }
}
</style>
