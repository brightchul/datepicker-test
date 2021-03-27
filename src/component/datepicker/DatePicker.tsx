import styled from "@emotion/styled";
import React, { useEffect, useReducer } from "react";
import store, { getSelectedDate } from "../../redux/store";
import { MyText } from "../myText";
import { useDatePicker } from "./customHook";
import DatePickerBody from "./DatePickerBody";

interface DatePickerProps {
  width?: string;
  backgroundHeight?: number;
  disabledType: "startDate" | "endDate";
}

const DatePicker: React.FC<DatePickerProps> = ({
  width,
  backgroundHeight,
  disabledType,
}) => {
  const selectedDate = getSelectedDate(disabledType);
  const [isOpen, toggleOpen, isReverse, selfRef] = useDatePicker(
    backgroundHeight
  );

  const [, forceUpdate] = useReducer((v) => v + 1, 0);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => forceUpdate());
    return () => unsubscribe();
  }, []);

  return (
    <DatePickerWrapper ref={selfRef} width={width}>
      <DatePickerHeaderWrapper onClick={toggleOpen}>
        <MyText myFont="regular-16" myColor="black">
          {selectedDate.format("YYYY년 MM월 DD일")}
        </MyText>
      </DatePickerHeaderWrapper>
      <DatePickerBody
        isOpen={isOpen}
        isReverse={isReverse}
        disabledType={disabledType}
        toggleFunc={toggleOpen}
      ></DatePickerBody>
    </DatePickerWrapper>
  );
};

const DatePickerHeaderWrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.color.silver};
  padding: 0px 16px;
  border-radius: 8px;
`;

const DatePickerWrapper = styled.div<{ width?: string }>`
  width: ${({ width }) => width || "100%"};
  user-select: none;
`;

export { DatePicker };
export default DatePicker;
