import { actionCreator } from "../helpers/actionCreator";

const TO_LEARN = "TO_LEARN";
const LEARNING = "LEARNING";
const LEARNED = "LEARNED";

export const POST_PROCESS = {
  TO_LEARN,
  LEARNING,
  LEARNED,
};

export const ARR_POST_PROCESS = [
  {
    id: TO_LEARN,
    name: TO_LEARN,
  },
  {
    id: LEARNING,
    name: LEARNING,
  },
  {
    id: LEARNED,
    name: LEARNED,
  },
];

export const GETS_POST = actionCreator("GETS_POST");
export const GET_POST = actionCreator("GET_POST");
export const ADD_POST = actionCreator("ADD_POST");
export const UPDATE_POST = actionCreator("UPDATE_POST");
export const DELETE_POST = actionCreator("DELETE_POST");
