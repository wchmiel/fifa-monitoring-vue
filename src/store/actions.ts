import type { ActionContext } from "vuex";
import type { State, EagerToPlayPayload } from "@/types/Store.interface";
import { ACTIONS, MUTATIONS } from "@/types/Store.interface";
import { users } from "@/utils/mocks";

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
};
