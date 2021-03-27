import { css } from "@emotion/css";
import { Dayjs } from "dayjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { changeDate } from "../../redux/reducer";
import store, { getDates } from "../../redux/store";

type UseDatePicker = (
  backgroundHeight?: number
) => [
  boolean,
  () => void,
  boolean,
  React.MutableRefObject<HTMLDivElement | null>
];

export const useDatePicker: UseDatePicker = (backgroundHeight) => {
  const selfRef = useRef<null | HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isReverse, setIsReverse] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (selfRef && selfRef.current && backgroundHeight) {
      setIsReverse(backgroundHeight < selfRef.current?.offsetTop + 392);
    }

    const clickCallback = (e: any) => {
      if (selfRef && selfRef.current)
        setIsOpen(selfRef.current.contains(e.target));
    };

    if (selfRef.current) {
      document.addEventListener("click", clickCallback);
    }
    return () => document.removeEventListener("click", clickCallback);
  }, [backgroundHeight, selfRef]);
  return [isOpen, toggleOpen, isReverse, selfRef];
};

type UseOneDate = (
  disabledType: "startDate" | "endDate",
  targetDate: Dayjs,
  curDate: Dayjs
) => [() => void, string];

export const useOneDate: UseOneDate = (disabledType, targetDate, curDate) => {
  const [selectedDate, disabledDate] = getDates(disabledType);
  const isSelected = selectedDate.isSame(targetDate, "date");

  const isDisable = checkDisabled(targetDate, disabledDate, disabledType);
  const dateStyle = getDateStyle(curDate, targetDate, isDisable, isSelected);

  const onClickFunc = useCallback(() => {
    isDisable || store.dispatch(changeDate(targetDate, disabledType));
  }, [isDisable, targetDate, disabledType]);

  return [onClickFunc, dateStyle];
};

const checkDisabled = (
  targetDate: Dayjs,
  disabledDate: any,
  disabledType: "startDate" | "endDate"
) => {
  switch (disabledType) {
    case "startDate":
      if (Math.abs(disabledDate.diff(targetDate, "hour")) < 24) {
        return disabledDate.get("date") >= targetDate.get("date");
      }
      return disabledDate >= targetDate;
    case "endDate":
      if (Math.abs(disabledDate.diff(targetDate, "hour")) < 24) {
        return disabledDate.get("date") <= targetDate.get("date");
      }
      return disabledDate <= targetDate;
    default:
      throw new Error(`disabledType : ${disabledType} is not defined!!`);
  }
};

const getDateStyle: (
  curDate: Dayjs,
  targetDate: Dayjs,
  isDisable?: boolean,
  isSelected?: boolean
) => string = (curDate, targetDate, isDisable, isSelected) => {
  if (isSelected) return selectedDate;
  if (isDisable) return disabledDate;
  if (curDate.isSame(targetDate, "month")) return currentMonthDate;
  return notCurrentMonthDate;
};

const disabledDate = css`
  background-color: rgba(76, 128, 241, 0.01);
  color: rgba(76, 128, 241, 0.2);
`;

const notCurrentMonthDate = css`
  cursor: pointer;
  color: #c8c7cc;

  :hover {
    color: #4c80f1;
    background-color: rgba(76, 128, 241, 0.08);
  }
`;

const currentMonthDate = css`
  cursor: pointer;
  color: #666666;
  :hover {
    color: #4c80f1;
    background-color: rgba(76, 128, 241, 0.08);
  }
`;

const selectedDate = css`
  cursor: pointer;
  color: #fff;
  background-color: #4c80f1;
  :hover {
    background-color: #4371d4;
  }
`;
