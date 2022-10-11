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
          <card-item
            title="Gracze"
            subtitle="Profesjonalni gracze"
            iconSrc="/players_icon.png"
          >
            <all-players-list />
          </card-item>
        </v-col>
        <v-col cols="8">
          <v-row class="mb-3">
            <v-col>
              <card-item
                title="Fifa room status"
                subtitle="Co jest grane?"
                iconSrc="/monitor_icon.png"
              >
                <room-status />
              </card-item>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <card-item
                title="Chętni do gry"
                subtitle="Gracze szukający kolegów do gry"
                iconSrc="/pad_icon.png"
              >
                <eager-to-play-list />
              </card-item>
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
