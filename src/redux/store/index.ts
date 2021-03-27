import { createStore, combineReducers } from "redux";
import { dates } from "../reducer";

const reducer = combineReducers({
  dates,
});

export const store = createStore(reducer);

export const getSelectedDate = (disabledType: "startDate" | "endDate") => {
  const state = store.getState();
  switch (disabledType) {
    case "startDate":
      return state.dates.endDate;
    case "endDate":
      return state.dates.startDate;
    default:
      throw new Error("다른 값입니다.");
  }
};

export const getDates = (disabledType: "startDate" | "endDate") => {
  const state = store.getState();
  switch (disabledType) {
    case "startDate":
      return [state.dates.endDate, state.dates.startDate];
    case "endDate":
      return [state.dates.startDate, state.dates.endDate];
    default:
      throw new Error("다른 값입니다.");
  }
};

export default store;
