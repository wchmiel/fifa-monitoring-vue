<script lang="ts">
import { defineComponent, computed } from "vue";
import type {
  User,
  UsersListMenuConfig,
} from "./../../types/UserTypes.interface";
import UsersListItem from "./UsersListItem.vue";

export default defineComponent({
  props: {
    users: Array<User>,
    menuConfig: Array<UsersListMenuConfig>,
  },
  components: { UsersListItem },
  setup(props) {
    const sortedUsers = computed(() =>
      (props.users || []).sort((a, b) => a.name.localeCompare(b.name))
    );

    return {
      props,
      sortedUsers,
    };
  },
});
</script>

<template>
  <v-sheet>
    <v-container>
      <users-list-item
        v-for="user in sortedUsers"
        :key="user.id"
        :user="user"
        :menuConfig="props.menuConfig"
      ></users-list-item>
    </v-container>
  </v-sheet>
</template>
