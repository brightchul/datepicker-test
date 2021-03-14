import styled from "@emotion/styled";
import React from "react";
import { MyText } from "../myText";

interface DatePickerBodyWrapperProps {
  isOpen: boolean;
}

interface DatePickerBodyProps {
  isOpen: boolean;
  toggleFunc: () => void;
  stateFunc: React.Dispatch<React.SetStateAction<any>>;
}

const DatePickerBodyWrapper = styled.div<DatePickerBodyWrapperProps>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  margin-top: 8px;
  padding: 8px 0;
  border-radius: 8px;
  overflow: scroll;
  max-height: 236px;
  box-shadow: 0 4px 4px 0 ${({ theme }) => theme.color["black-16"]};
  background-color: ${({ theme }) => theme.color.white};
`;

const DatePickerBody: React.FC<DatePickerBodyProps> = ({
  isOpen,
  stateFunc,
  toggleFunc,
}) => {
  return (
    <DatePickerBodyWrapper isOpen={isOpen}>
      <MyText myFont="regular-16">test123</MyText>
    </DatePickerBodyWrapper>
  );
};

export { DatePickerBody };
export default DatePickerBody;
