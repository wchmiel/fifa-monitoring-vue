import { createStore, useStore as baseUseStore, Store } from "vuex";
import type { InjectionKey } from "vue";
import {
  type State,
  type Snackbar,
  type RoomStatus,
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
      players: [],
      roomStatus: {
        occupied: false,
      },
      snackbar: {
        show: false,
        type: SNACKBAR_TYPE.SUCCESS,
        text: "",
      },
      userId: "",
    };
  },
  getters: {
    getUsers(state: State): Array<User> {
      return state.users;
    },
    getUsersWithoutLoggedUser(state: State): Array<User> {
      const userDataId = state.userData?.id;

      if (userDataId) {
        return state.users.filter((u) => u.id !== userDataId);
      }

      return state.users;
    },
    getPlayers(state: State): Array<User> {
      return state.players;
    },
    getRoomStatus(state: State): RoomStatus {
      return state.roomStatus;
    },
    getSnackbarConfig(state: State): Snackbar {
      return state.snackbar;
    },
    getUserId(state: State): string {
      return state.userId;
    },
    isUserAuthenticated(state: State): boolean {
      return !!state.userId;
    },
    isUserEagerToPlay(state: State): boolean {
      const userId = state.userData?.id;

      if (userId) {
        return !!state.players.find((p) => p.id === userId);
      }

      return false;
    },
    getUserData(state: State): User | undefined {
      return state.userData;
    },
  },
  mutations: {
    [MUTATIONS.SAVE_USERS](
      state: State,
      payload: Record<string, Array<User>>
    ): void {
      state.users = payload.users;
    },
    [MUTATIONS.SAVE_PLAYERS](
      state: State,
      payload: Record<string, Array<User>>
    ): void {
      state.players = payload.players;
    },
    [MUTATIONS.UPDATE_ROOM_STATUS](state: State, roomStatus: RoomStatus): void {
      state.roomStatus = roomStatus;
    },
    [MUTATIONS.SHOW_SNACKBAR](state: State, payload: Snackbar): void {
      state.snackbar = {
        show: true,
        type: SNACKBAR_TYPE.SUCCESS,
        ...payload,
      };
    },
    [MUTATIONS.SAVE_USER_ID](state: State, userId: string): void {
      state.userId = userId;
    },
    [MUTATIONS.SAVE_USER_DATA](state: State, userData: User): void {
      state.userData = userData;
    },
    [MUTATIONS.REMOVE_USER_ID](state: State): void {
      state.userId = "";
    },
    [MUTATIONS.REMOVE_USER_DATA](state: State): void {
      state.userData = void 0;
    },
  },
  actions,
});

export function useStore() {
  return baseUseStore(key);
}
