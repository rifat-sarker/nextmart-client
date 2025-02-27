import { configureStore } from "@reduxjs/toolkit";

// we won't do this
// const store = configureStore({});


export const makeStore = () => {
  return configureStore({
    reducer: {},
  });
};


// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
