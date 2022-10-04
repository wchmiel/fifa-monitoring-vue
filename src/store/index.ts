import { createStore, useStore as baseUseStore, Store } from "vuex";
import type { InjectionKey } from "vue";
import {
  type State,
  type EagerToPlayPayload,
  type Snackbar,
  SNACKBAR_TYPE,
  MUTATIONS,
} from "@/types/Store.interface";
import type { User } from "@/types/UserTypes.interface";
import actions from "./actions";

export const key: InjectionKey<Store<State>> = Symbol();

export default createStore<State>({
  state() {
    return {
      users: [],
      isRoomAvailable: true,
      snackbar: {
        show: false,
        type: SNACKBAR_TYPE.SUCCESS,
        text: "",
      },
    };
  },
  getters: {
    getUsers(state: State): Array<User> {
      return state.users;
    },
    getUsersEagerToPlay(state: State): Array<User> {
      return state.users.filter((user) => user.eagerToPlay);
    },
    getRoomStatus(state: State): boolean {
      return state.isRoomAvailable;
    },
    getSnackbarConfig(state: State): Snackbar {
      return state.snackbar;
    },
  },
  mutations: {
    [MUTATIONS.SAVE_USERS](
      state: State,
      payload: Record<string, Array<User>>
    ): void {
      state.users = payload.users;
    },
    [MUTATIONS.UPDATE_USER_EAGER_TO_PLAY](
      state: State,
      payload: EagerToPlayPayload
    ): void {
      const user = state.users.find((user) => user.id === payload.userId);

      if (user) {
        user.eagerToPlay = payload.isEagerToPlay;
      }
    },
    [MUTATIONS.UPDATE_ROOM_STATUS](
      state: State,
      isRoomAvailable: boolean
    ): void {
      state.isRoomAvailable = isRoomAvailable;
    },
    [MUTATIONS.SHOW_SNACKBAR](state: State, payload: Snackbar): void {
      state.snackbar = {
        show: true,
        type: SNACKBAR_TYPE.SUCCESS,
        ...payload,
      };
    },
  },
  actions,
});

export function useStore() {
  return baseUseStore(key);
}
