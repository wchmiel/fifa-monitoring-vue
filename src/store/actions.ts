import type { ActionContext } from "vuex";
import type { State, EagerToPlayPayload } from "@/types/Store.interface";
import { ACTIONS, MUTATIONS } from "@/types/Store.interface";
import { USER_LOCAL_STORAGE, type User } from "@/types/UserTypes.interface";
import axios from "axios";

export default {
  async [ACTIONS.FETCH_USERS](
    context: ActionContext<State, State>
  ): Promise<void> {
    const result = await axios.get(
      import.meta.env.VITE_APP_API_SERVER + "/users/"
    );
    context.commit(MUTATIONS.SAVE_USERS, { users: result.data.users });
  },
  async [ACTIONS.FETCH_PLAYERS](
    context: ActionContext<State, State>
  ): Promise<void> {
    const result = await axios.get(
      import.meta.env.VITE_APP_API_SERVER + "/room/players"
    );
    context.commit(MUTATIONS.SAVE_PLAYERS, { players: result.data.players });
  },
  async [ACTIONS.UPDATE_USER_EAGER_TO_PLAY](
    context: ActionContext<State, State>,
    payload: EagerToPlayPayload
  ): Promise<number> {
    const userData = context.getters.getUserData;
    const userId = context.getters.getUserId;
    const apiUrl = payload.isEagerToPlay
      ? "/room/add-player"
      : "/room/remove-player";

    const result = await axios.post(
      import.meta.env.VITE_APP_API_SERVER + apiUrl,
      {
        userSlackId: userId,
        ...userData,
      }
    );

    if (result.status === 200) {
      context.commit(MUTATIONS.SAVE_PLAYERS, { players: result.data.players });
    }

    return result.status;
  },
  async [ACTIONS.GET_ROOM_STATUS](
    context: ActionContext<State, State>
  ): Promise<void> {
    const result = await axios.get(
      `${import.meta.env.VITE_APP_API_SERVER}/room/status`
    );

    if (result.status === 200) {
      context.commit(MUTATIONS.UPDATE_ROOM_STATUS, {
        occupied: result.data.occupied,
        startTime: result.data.startTime,
      });
    }
  },
  async [ACTIONS.FETCH_USER_DATA](
    _: ActionContext<State, State>,
    userId: string
  ): Promise<User | undefined> {
    // Get user data by slack id.
    const result = await axios.get(
      `${import.meta.env.VITE_APP_API_SERVER}/users/${userId}`
    );

    return result.data.user;
  },
  async [ACTIONS.SAVE_USER](
    context: ActionContext<State, State>,
    userId: string
  ): Promise<void> {
    const userData = await context.dispatch(ACTIONS.FETCH_USER_DATA, userId);

    if (userData) {
      localStorage.setItem(USER_LOCAL_STORAGE.ID_ITEM, userId);
      context.commit(MUTATIONS.SAVE_USER_ID, userId);
      context.commit(MUTATIONS.SAVE_USER_DATA, userData);
    }
  },
  async [ACTIONS.GET_USER](
    context: ActionContext<State, State>
  ): Promise<void> {
    const userId = localStorage.getItem(USER_LOCAL_STORAGE.ID_ITEM);

    if (userId) {
      const userData = await context.dispatch(ACTIONS.FETCH_USER_DATA, userId);

      if (userData) {
        context.commit(MUTATIONS.SAVE_USER_ID, userId);
        context.commit(MUTATIONS.SAVE_USER_DATA, userData);
      }
    }
  },
  [ACTIONS.LOGOUT_USER](context: ActionContext<State, State>): void {
    localStorage.removeItem(USER_LOCAL_STORAGE.ID_ITEM);
    context.commit(MUTATIONS.REMOVE_USER_ID);
    context.commit(MUTATIONS.REMOVE_USER_DATA);
  },
};
