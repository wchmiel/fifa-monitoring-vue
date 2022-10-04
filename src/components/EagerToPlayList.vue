<script lang="ts">
import { defineComponent, computed } from "vue";
import UsersList from "./UsersList/UsersList.vue";
import { useStore } from "vuex";
import type { UsersListMenuConfig } from "@/types/UserTypes.interface";
import { ACTIONS, MUTATIONS } from "@/types/Store.interface";

export default defineComponent({
  components: { UsersList },
  setup() {
    const store = useStore();
    const usersEagerToPlay = computed(() => store.getters.getUsersEagerToPlay);
    const snackbar = computed(() => store.getters.getSnackbarConfig);
    const menuConfig: Array<UsersListMenuConfig> = [
      {
        text: "Usuń z listy chętny do gry",
        action: async (userId: string): Promise<void> => {
          await store.dispatch(ACTIONS.UPDATE_USER_EAGER_TO_PLAY, {
            userId,
            isEagerToPlay: false,
          });

          store.commit(MUTATIONS.SHOW_SNACKBAR, {
            text: "Zawodnik usunięty z listy chętnych.",
          });
        },
      },
    ];

    return {
      usersEagerToPlay,
      menuConfig,
      snackbar,
    };
  },
});
</script>

<template>
  <users-list :users="usersEagerToPlay" :menuConfig="menuConfig" class="mt-4" />
  <p v-if="!usersEagerToPlay.length" class="pl-4">
    Masz pecha, nikt nie chce obecnie grać!
  </p>
</template>
