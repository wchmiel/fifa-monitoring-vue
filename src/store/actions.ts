import type { ActionContext } from "vuex";
import type { State, EagerToPlayPayload } from "@/types/Store.interface";
import { ACTIONS, MUTATIONS } from "@/types/Store.interface";
import { users } from "@/utils/mocks";
import { USER_LOCAL_STORAGE } from "@/types/UserTypes.interface";

const fakeHttpRequest = (): Promise<Record<string, number>> =>
  new Promise((resolve) => {
    setTimeout(() => resolve({ status: 200 }), 300);
  });

export default {
  async [ACTIONS.FETCH_USERS](
    context: ActionContext<State, State>
  ): Promise<void> {
    await fakeHttpRequest();
    context.commit(MUTATIONS.SAVE_USERS, { users });
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
  [ACTIONS.SAVE_USER_ID](
    context: ActionContext<State, State>,
    userId: string
  ): void {
    localStorage.setItem(USER_LOCAL_STORAGE.ID_ITEM, userId);
    context.commit(MUTATIONS.SAVE_USER_ID, userId);
  },
  [ACTIONS.GET_USER_ID](context: ActionContext<State, State>): void {
    const userId = localStorage.getItem(USER_LOCAL_STORAGE.ID_ITEM);

    if (userId) {
      context.commit(MUTATIONS.SAVE_USER_ID, userId);
    }
  },
};
