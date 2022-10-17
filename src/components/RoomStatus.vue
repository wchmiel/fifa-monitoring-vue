<script lang="ts">
import { computed, onBeforeUnmount, defineComponent } from "vue";
import { useStore } from "vuex";
import { ACTIONS } from "@/types/Store.interface";
import CardItem from "./CardItem.vue";

export default defineComponent({
  components: { CardItem },
  setup() {
    const store = useStore();
    const roomStatus = computed(() => store.getters.getRoomStatus);

    store.dispatch(ACTIONS.GET_ROOM_STATUS);

    // Check status every 10 sec.
    const roomStatusInterval = setInterval(() => {
      store.dispatch(ACTIONS.GET_ROOM_STATUS);
    }, 10000);

    onBeforeUnmount(() => {
      clearInterval(roomStatusInterval);
    });

    return {
      roomStatus,
    };
  },
});
</script>

<template>
  <card-item
    title="Fifa room status"
    subtitle="Co jest grane?"
    iconSrc="/monitor_icon.png"
  >
    <div class="ml-4 mt-5">
      <h2>
        Status:
        <v-chip
          v-if="!roomStatus.occupied"
          class="ma-2"
          color="green"
          text-color="white"
          variant="outlined"
          size="x-large"
        >
          WOLNE
        </v-chip>
        <v-chip
          v-else
          class="ma-2"
          color="red"
          text-color="white"
          variant="outlined"
          size="x-large"
        >
          ZAJĘTE
        </v-chip>
      </h2>
    </div>
    <h3 class="ml-4 mt-5">
      <span v-if="roomStatus.occupied"
        >Mecz trwa, godzina rozpoczęcia: {{ roomStatus.startTime }}</span
      >
      <span v-else>Fifa room jest wolny!</span>
    </h3>
  </card-item>
</template>
