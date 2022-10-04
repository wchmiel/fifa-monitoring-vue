<script lang="ts">
import { defineComponent, computed } from "vue";
import UsersList from "./UsersList/UsersList.vue";
import { useStore } from "vuex";
import { SNACKBAR_TYPE, ACTIONS, MUTATIONS } from "@/types/Store.interface";
import type { User, UsersListMenuConfig } from "@/types/UserTypes.interface";

export default defineComponent({
  components: { UsersList },
  setup() {
    const store = useStore();
    const users = computed(() => store.getters.getUsers);
    const snackbar = computed(() => store.getters.getSnackbarConfig);

    const menuConfig: Array<UsersListMenuConfig> = [
      {
        text: "Wyzwij na pojedynek",
        action: (): void => {
          console.log("Wyzwij na pojedynek!");
        },
      },
      {
        text: "Dodaj jako chętny do gry",
        disableProp: "eagerToPlay",
        action: async (userId: number): Promise<void> => {
          const user = users.value.find((u: User) => u.id === userId);

          if (!user.eagerToPlay) {
            const result = await store.dispatch(
              ACTIONS.UPDATE_USER_EAGER_TO_PLAY,
              {
                userId,
                isEagerToPlay: true,
              }
            );

            if (result.status === 200) {
              store.commit(MUTATIONS.SHOW_SNACKBAR, {
                text: "Zawodnik dodany do listy chętnych.",
              });
            } else {
              store.commit(MUTATIONS.SHOW_SNACKBAR, {
                text: "Coś poszło nie tak!",
                type: SNACKBAR_TYPE.ERROR,
              });
            }
          } else {
            store.commit(MUTATIONS.SHOW_SNACKBAR, {
              text: "Zawodnik jest już na liście chętnych.",
              type: SNACKBAR_TYPE.INFO,
            });
          }
        },
      },
    ];

    return {
      users,
      menuConfig,
      snackbar,
    };
  },
});
</script>

<template>
  <users-list :users="users" :menuConfig="menuConfig" class="mt-4" />
</template>
