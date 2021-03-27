import dayjs, { Dayjs } from "dayjs";

const START_DATE_CHANGE = "START_DATE_CHANGE";
const END_DATE_CHANGE = "END_DATE_CHANGE";

export const changeDate = (date: Dayjs, disableType: "startDate" | "endDate") =>
  disableType === "endDate" ? changeStartDate(date) : changeEndDate(date);

export const changeStartDate = (date: Dayjs) => ({
  type: START_DATE_CHANGE,
  date,
});

export const changeEndDate = (date: Dayjs) => ({
  type: END_DATE_CHANGE,
  date,
});

const startDate = dayjs();

const initState = {
  startDate,
  endDate: startDate.add(1, "day"),
};

const dates = (state = initState, action: any) => {
  switch (action.type) {
    case START_DATE_CHANGE:
      return {
        ...state,
        startDate: action.date,
      };

    case END_DATE_CHANGE:
      return {
        ...state,
        endDate: action.date,
      };

    default:
      return state;
  }
};

export { dates };
export default dates;
