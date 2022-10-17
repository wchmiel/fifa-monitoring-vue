<script lang="ts">
import { defineComponent, ref } from "vue";
import type { User, UsersListMenuConfig } from "@/types/UserTypes.interface";
import type { PropType } from "vue";

export default defineComponent({
  props: {
    user: { type: Object as PropType<User>, required: true },
    menuConfig: Array<UsersListMenuConfig>,
  },
  setup(props) {
    const showMenu = ref(false);

    const onToggleMenu = (show: boolean) => {
      showMenu.value = show;
    };

    return {
      props,
      onToggleMenu,
      showMenu,
    };
  },
});
</script>

<template>
  <v-row
    @mouseenter="onToggleMenu(true)"
    @mouseleave="onToggleMenu(false)"
    class="pa-2"
  >
    <v-divider />
    <v-col cols="9">
      <div class="d-flex justify-start align-center">
        <img :src="props.user.avatar" alt="Avatar" class="mehow-avatar" />
        <div class="pl-2">
          <h4>{{ props.user.name }}</h4>
          <h5>{{ props.user.company }}</h5>
        </div>
      </div>
    </v-col>
    <v-col
      v-if="props.menuConfig && props.menuConfig.length"
      cols="3"
      class="d-flex justify-center align-center pr-2"
    >
      <v-menu transition="scroll-y-transition">
        <template v-slot:activator="{ isActive, props }">
          <v-btn v-bind="props">
            <transition name="list-menu">
              <img
                v-if="showMenu || isActive"
                src="list-menu-icon.svg"
                alt="Menu icon"
              />
            </transition>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="config in props.menuConfig"
            :key="config.text"
            :disabled="config.disableProp ? !!user[config.disableProp] : false"
            link
          >
            <v-list-item-title @click="config.action(props.user.id)">
              {{ config.text }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>
  </v-row>
</template>
<style scoped>
.mehow-avatar {
  height: 54px;
  border-radius: 100%;
}
.list-menu-enter-active {
  transition: all 0.2s ease-out;
}
.list-menu-leave-active {
  transition: all 0.2s ease-in;
}
.list-menu-enter-to,
.list-menu-leave-from {
  opacity: 1;
}
.list-menu-enter-from,
.list-menu-leave-to {
  opacity: 0;
}
</style>
