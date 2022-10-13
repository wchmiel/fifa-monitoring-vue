<script lang="ts">
import CardItem from "./../components/CardItem.vue";
import AllPlayersList from "./../components/AllPlayersList.vue";
import EagerToPlayList from "./../components/EagerToPlayList.vue";
import RoomStatus from "./../components/RoomStatus.vue";
import { useStore } from "vuex";
import { defineComponent } from "vue";
import { ACTIONS } from "@/types/Store.interface";

export default defineComponent({
  components: {
    CardItem,
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
        <v-col>
          <all-players-list />
        </v-col>
        <v-col cols="8">
          <v-row class="mb-3">
            <v-col>
              <room-status />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <eager-to-play-list />
            </v-col>
            <v-col>
              <card-item
                title="Rezerwacje"
                subtitle="Lista rezerwacji"
                iconSrc="/calendar_icon.png"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<style scoped></style>
