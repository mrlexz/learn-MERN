export const actionCreator = (key) => ({
  REQUEST: `${key}:REQUEST`,
  SUCCESS: `${key}:SUCCESS`,
  FAILED: `${key}:FAILED`,
  REFRESH: `${key}:REFRESH`,
});
