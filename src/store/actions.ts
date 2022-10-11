import type { ActionContext } from "vuex";
import type { State, EagerToPlayPayload } from "@/types/Store.interface";
import { ACTIONS, MUTATIONS } from "@/types/Store.interface";
import { USER_LOCAL_STORAGE, type User } from "@/types/UserTypes.interface";
import axios from "axios";

const fakeHttpRequest = (): Promise<Record<string, number>> =>
  new Promise((resolve) => {
    setTimeout(() => resolve({ status: 200 }), 300);
  });

export default {
  async [ACTIONS.FETCH_USERS](
    context: ActionContext<State, State>
  ): Promise<void> {
    const result = await axios.get(
      import.meta.env.VITE_APP_API_SERVER + "/users/"
    );
    context.commit(MUTATIONS.SAVE_USERS, { users: result.data.users });
  },
  async [ACTIONS.UPDATE_USER_EAGER_TO_PLAY](
    context: ActionContext<State, State>,
    payload: EagerToPlayPayload
  ): Promise<Record<string, number>> {
    const response = await fakeHttpRequest();

    if (response.status === 200) {
      context.commit(MUTATIONS.UPDATE_USER_EAGER_TO_PLAY, payload);
    }

    return response;
  },
  async [ACTIONS.GET_ROOM_STATUS](
    context: ActionContext<State, State>
  ): Promise<void> {
    await fakeHttpRequest();

    const roomStatus = Math.random() > 0.7 ? true : false;
    context.commit(MUTATIONS.UPDATE_ROOM_STATUS, roomStatus);
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
