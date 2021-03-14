import styled from "@emotion/styled";
import React, { useState } from "react";
import { MyText } from "../myText";
import DatePickerBody from "./DatePickerBody";

interface DatePickerProps {
  width?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ width }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DatePickerWrapper width={width}>
      <DatePickerHeaderWrapper onClick={() => setIsOpen(!isOpen)}>
        <MyText myFont="regular-16" myColor="black">
          {"selectedValue"}
        </MyText>
      </DatePickerHeaderWrapper>
      <DatePickerBody
        isOpen={isOpen}
        toggleFunc={() => setIsOpen(!isOpen)}
        stateFunc={setSelectedValue}
      ></DatePickerBody>
    </DatePickerWrapper>
  );
};

const DatePickerHeaderWrapper = styled.div`
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
