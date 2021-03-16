import styled from "@emotion/styled";
import { Dayjs } from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { MyText } from "../myText";
import DatePickerBody from "./DatePickerBody";

interface DatePickerProps {
  width?: string;
  selectedDate: Dayjs;
  setFunc: any;
  disabledDate: Dayjs;
  disabledType: "before" | "after";
}

const DatePicker: React.FC<DatePickerProps> = ({
  width,
  selectedDate,
  setFunc,
  disabledDate,
  disabledType,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selfRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const clickCallback = (e: any) => {
      setIsOpen(selfRef.current!.contains(e.target));
    };

    if (selfRef.current) {
      document.addEventListener("click", clickCallback);
    }
    return () => document.removeEventListener("click", clickCallback);
  }, []);

  return (
    <DatePickerWrapper ref={selfRef} width={width}>
      <DatePickerHeaderWrapper onClick={() => setIsOpen(!isOpen)}>
        <MyText myFont="regular-16" myColor="black">
          {selectedDate.format("YYYY년 MM월 DD일")}
        </MyText>
      </DatePickerHeaderWrapper>
      <DatePickerBody
        selectedDate={selectedDate}
        setFunc={setFunc}
        disabledDate={disabledDate}
        disabledType={disabledType}
        isOpen={isOpen}
        toggleFunc={() => setIsOpen(!isOpen)}
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
