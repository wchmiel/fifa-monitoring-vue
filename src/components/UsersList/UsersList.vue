<script lang="ts">
import { defineComponent } from "vue";
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
    return {
      props,
    };
  },
});
</script>

<template>
  <v-sheet>
    <v-container>
      <users-list-item
        v-for="user in props.users"
        :key="user.id"
        :user="user"
        :menuConfig="props.menuConfig"
      ></users-list-item>
    </v-container>
  </v-sheet>
</template>
