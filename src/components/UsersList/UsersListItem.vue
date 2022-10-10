<script lang="ts">
import { defineComponent, ref, computed } from "vue";
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

    const userName = computed(() => `${props.user.name} ${props.user.surname}`);

    return {
      props,
      userName,
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
    <v-col cols="2">
      <img :src="props.user.avatar" alt="Avatar" />
    </v-col>
    <v-col>
      <v-row>
        <v-col>
          <h4>{{ userName }}</h4>
          <h5>{{ props.user.company }}</h5>
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
                :disabled="
                  config.disableProp ? !!user[config.disableProp] : false
                "
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
    </v-col>
  </v-row>
</template>
<style>
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
