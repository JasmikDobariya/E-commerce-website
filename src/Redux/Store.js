  import { configureStore , getDefaultMiddleware  } from "@reduxjs/toolkit";
  import rootReducer from "./Reducer";

  const customSerializabilityCheck = (data) => {
   
    return true;
  };
  const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware({
      serializableCheck: {
        isSerializable: customSerializabilityCheck,
      },
    })],
  });

  export default store;
