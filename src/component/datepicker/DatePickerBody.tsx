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
  position: absolute;
  margin-top: 8px;
  padding: 30px 20px;
  border-radius: 8px;
  width: 320px;
  height: 346px;

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
      <Header>
        <MyText myFont="medium-18">2019년 12월</MyText>
        <ArrowWrapper>
          <IconWrapper>
            <img src="/svg/btn-arrow-back.svg" alt="dropdown-icon" />
          </IconWrapper>
          <IconWrapper>
            <img src="/svg/btn-arrow-forward.svg" alt="dropdown-icon" />
          </IconWrapper>
        </ArrowWrapper>
      </Header>
    </DatePickerBodyWrapper>
  );
};

const ArrowWrapper = styled.div`
  display: flex;
  column-gap: 12px;
`;

const IconWrapper = styled.div`
  width: 36px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  border-radius: 50%;
  :hover {
    background-color: ${({ theme }) => theme.color["black-004"]};
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export { DatePickerBody };
export default DatePickerBody;
