// import { createWrapper, HYDRATE } from 'next-redux-wrapper';
// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';

// import eventReducer from './action/eventSlice';
// import metadataReducer from './action/metadataSlice';

// const combinedReducer = combineReducers({
//   events: eventReducer,
//   metadata: metadataReducer,
// });

// const reducer = (state: any, action: any) => {
//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state,
//       ...action.payload,
//     };
//     return nextState;
//   } else {
//     return combinedReducer(state, action);
//   }
// };

// export const makeStore = () =>
//   configureStore({
//     reducer,
//   });

// export type AppStore = ReturnType<typeof makeStore>;
// export type RootState = ReturnType<AppStore['getState']>;
// export type AppDispatch = AppStore['dispatch'];

// export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

// export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });