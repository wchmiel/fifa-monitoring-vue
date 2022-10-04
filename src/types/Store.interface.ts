import type { User } from "./UserTypes.interface";

export interface State {
  users: Array<User>;
  isRoomAvailable: boolean;
  snackbar: Snackbar;
}

export interface Snackbar {
  text: string;
  show?: boolean;
  type?: SNACKBAR_TYPE;
}

export interface EagerToPlayPayload {
  userId: number;
  isEagerToPlay: boolean;
}

export enum ACTIONS {
  FETCH_USERS = "FETCH_USERS",
  UPDATE_USER_EAGER_TO_PLAY = "UPDATE_USER_EAGER_TO_PLAY",
  GET_ROOM_STATUS = "GET_ROOM_STATUS",
}

export enum MUTATIONS {
  SAVE_USERS = "SAVE_USERS",
  UPDATE_USER_EAGER_TO_PLAY = "UPDATE_USER_EAGER_TO_PLAY",
  UPDATE_ROOM_STATUS = "UPDATE_ROOM_STATUS",
  SHOW_SNACKBAR = "SHOW_SNACKBAR",
}

export enum SNACKBAR_TYPE {
  ERROR = "error",
  SUCCESS = "success",
  INFO = "info",
}
