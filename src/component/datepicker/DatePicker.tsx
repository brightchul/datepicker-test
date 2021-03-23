import styled from "@emotion/styled";
import { Dayjs } from "dayjs";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { MyText } from "../myText";
import DatePickerBody from "./DatePickerBody";

interface DatePickerProps {
  width?: string;
  backgroundHeight?: number;
  selectedDate: Dayjs;
  setFunc: any;
  disabledDate: Dayjs;
  disabledType: "before" | "after";
}

type UseDatePicker = (
  selfRef: React.MutableRefObject<HTMLDivElement | null>,
  backgroundHeight?: number
) => [boolean, () => void, boolean];

const useDatePicker: UseDatePicker = (selfRef, backgroundHeight) => {
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
  return [isOpen, toggleOpen, isReverse];
};

const DatePicker: React.FC<DatePickerProps> = ({
  width,
  backgroundHeight,
  selectedDate,
  setFunc,
  disabledDate,
  disabledType,
}) => {
  const selfRef = useRef<null | HTMLDivElement>(null);

  const [isOpen, toggleOpen, isReverse] = useDatePicker(
    selfRef,
    backgroundHeight
  );

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
        setFunc={setFunc}
        selectedDate={selectedDate}
        disabledDate={disabledDate}
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
