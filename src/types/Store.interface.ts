import type { User } from "./UserTypes.interface";

export interface State {
  users: Array<User>;
  players: Array<User>;
  roomStatus: RoomStatus;
  snackbar: Snackbar;
  userId: string;
  userData?: User;
}

export interface RoomStatus {
  occupied: boolean;
  startTime?: string;
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
  SAVE_USER = "SAVE_USER",
  GET_USER = "GET_USER",
  FETCH_USER_DATA = "FETCH_USER_DATA",
  LOGOUT_USER = "LOGOUT_USER",
  FETCH_PLAYERS = "FETCH_PLAYERS",
  SEND_CHALLENGE = "SEND_CHALLENGE",
}

export enum MUTATIONS {
  SAVE_USERS = "SAVE_USERS",
  SAVE_PLAYERS = "SAVE_PLAYERS",
  UPDATE_ROOM_STATUS = "UPDATE_ROOM_STATUS",
  SHOW_SNACKBAR = "SHOW_SNACKBAR",
  SAVE_USER_ID = "SAVE_USER_ID",
  SAVE_USER_DATA = "SAVE_USER_DATA",
  REMOVE_USER_ID = "REMOVE_USER_ID",
  REMOVE_USER_DATA = "REMOVE_USER_DATA",
}

export enum SNACKBAR_TYPE {
  ERROR = "error",
  SUCCESS = "success",
  INFO = "info",
}
