<script lang="ts">
import AllPlayersList from "./../components/AllPlayersList.vue";
import EagerToPlayList from "./../components/EagerToPlayList.vue";
import RoomStatus from "./../components/RoomStatus.vue";
import { useStore } from "vuex";
import { defineComponent } from "vue";
import { ACTIONS } from "@/types/Store.interface";

export default defineComponent({
  components: {
    RoomStatus,
    AllPlayersList,
    EagerToPlayList,
  },
  setup() {
    const store = useStore();

    // Fetch users.
    store.dispatch(ACTIONS.FETCH_USERS);

    return {};
  },
});
</script>

<template>
  <main>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <room-status />
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <eager-to-play-list />
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <all-players-list />
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<style scoped></style>
