<script lang="ts">
import { defineComponent, computed, onBeforeUnmount } from "vue";
import UsersList from "./UsersList/UsersList.vue";
import { useStore } from "vuex";
import { ACTIONS, MUTATIONS } from "@/types/Store.interface";
import CardItem from "./CardItem.vue";

export default defineComponent({
  components: { UsersList, CardItem },
  setup() {
    const store = useStore();

    store.dispatch(ACTIONS.FETCH_PLAYERS);

    // Check players every 10 sec.
    const getPlayersInterval = setInterval(() => {
      store.dispatch(ACTIONS.FETCH_PLAYERS);
    }, 10000);

    onBeforeUnmount(() => {
      clearInterval(getPlayersInterval);
    });

    const isUserAuthenticated = computed(
      () => store.getters.isUserAuthenticated
    );
    const userData = computed(() => store.getters.getUserData);
    const players = computed(() => store.getters.getPlayers);
    const snackbar = computed(() => store.getters.getSnackbarConfig);
    const isUserEagerToPlay = computed(() => store.getters.isUserEagerToPlay);

    const onAddToEagerList = async (): Promise<void> => {
      await store.dispatch(ACTIONS.UPDATE_USER_EAGER_TO_PLAY, {
        userId: userData.value.id,
        isEagerToPlay: true,
      });

      store.commit(MUTATIONS.SHOW_SNACKBAR, {
        text: "Zawodnik dodany do listy chętnych.",
      });
    };

    const onRemoveFromEagerList = async (): Promise<void> => {
      await store.dispatch(ACTIONS.UPDATE_USER_EAGER_TO_PLAY, {
        userId: userData.value.id,
        isEagerToPlay: false,
      });

      store.commit(MUTATIONS.SHOW_SNACKBAR, {
        text: "Zawodnik usunięty z listy chętnych.",
      });
    };

    const onButtonClick = computed(() =>
      isUserAuthenticated.value
        ? () => {
            if (isUserEagerToPlay.value) {
              onRemoveFromEagerList();
            } else {
              onAddToEagerList();
            }
          }
        : void 0
    );

    return {
      snackbar,
      isUserAuthenticated,
      onAddToEagerList,
      onRemoveFromEagerList,
      onButtonClick,
      players,
      isUserEagerToPlay,
    };
  },
});
</script>

<template>
  <card-item
    title="Chętni do gry"
    subtitle="Gracze szukający kolegów do gry"
    iconSrc="/pad_icon.png"
    :buttonText="isUserEagerToPlay ? 'Usuń mnie' : 'Dodaj mnie'"
    :buttonAction="onButtonClick"
  >
    <users-list :users="players" class="mt-4 mehow-eager-to-play-list" />
    <p v-if="!players.length" class="pl-4">
      Masz pecha, nikt nie chce obecnie grać!
    </p>
  </card-item>
</template>

<style scoped>
.mehow-eager-to-play-list {
  max-height: 25vh;
  overflow-y: scroll;
}
</style>
