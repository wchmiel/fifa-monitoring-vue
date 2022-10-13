<script lang="ts">
import { defineComponent, computed } from "vue";
import UsersList from "./UsersList/UsersList.vue";
import { useStore } from "vuex";
import type { UsersListMenuConfig } from "@/types/UserTypes.interface";
import CardItem from "./CardItem.vue";

export default defineComponent({
  components: { UsersList, CardItem },
  setup() {
    const store = useStore();
    const isUserAuthenticated = computed(
      () => store.getters.isUserAuthenticated
    );
    const users = computed(() => store.getters.getUsersWithoutLoggedUser);
    const snackbar = computed(() => store.getters.getSnackbarConfig);

    const menuConfig: Array<UsersListMenuConfig> = [
      {
        text: "Wyzwij na pojedynek",
        action: (): void => {
          console.log("Wyzwij na pojedynek!");
        },
      },
    ];

    return {
      users,
      menuConfig,
      snackbar,
      isUserAuthenticated,
    };
  },
});
</script>

<template>
  <card-item
    title="Gracze"
    subtitle="Profesjonalni gracze"
    iconSrc="/players_icon.png"
  >
    <users-list
      :users="users"
      :menuConfig="isUserAuthenticated ? menuConfig : []"
      class="mt-4 mehow-all-players-list"
    />
  </card-item>
</template>

<style scoped>
.mehow-all-players-list {
  max-height: 50vh;
  overflow-y: scroll;
}
</style>
