import styled from "@emotion/styled";
import dayjs from "dayjs";
import React, { useState } from "react";
import { MyText } from "../myText";
import { OneDate } from "./OneDate";

interface DatePickerBodyWrapperProps {
  isOpen: boolean;
  isReverse: boolean;
}

interface DatePickerBodyProps {
  isOpen: boolean;
  isReverse?: boolean;
  toggleFunc: () => void;
  disabledType: "startDate" | "endDate";
}

const DatePickerBodyWrapper = styled.div<DatePickerBodyWrapperProps>(
  ({ theme, isOpen, isReverse }) => {
    return {
      display: isOpen ? "block" : "none",
      transform: `translateY(${isReverse ? "-400px" : "8px"})`,
      position: "absolute",
      borderRadius: "8px",
      width: "320px",
      height: "346px",
      boxShadow: `0 4px 4px 0 ${theme.color["black-16"]}`,
      backgroundColor: theme.color.white,
    };
  }
);

const DayNameArr = ["월", "화", "수", "목", "금", "토", "일"];

const DatePickerBody: React.FC<DatePickerBodyProps> = ({
  isOpen,
  isReverse = false,
  disabledType,
}) => {
  const [curDate, setCurDate] = useState(dayjs().set("date", 1));
  const currentMonthFirstDay = curDate.get("day");
  const prevMonthStart = curDate.subtract(
    currentMonthFirstDay > 0 ? currentMonthFirstDay - 1 : 6,
    "day"
  );

  return (
    <DatePickerBodyWrapper isReverse={isReverse} isOpen={isOpen}>
      <Header>
        <MyText myFont="medium-18">{curDate.format("YYYY년 MM월")}</MyText>
        <ArrowWrapper>
          <IconWrapper onClick={() => setCurDate(curDate.subtract(1, "month"))}>
            <img src="/svg/btn-arrow-back.svg" alt="dropdown-icon" />
          </IconWrapper>
          <IconWrapper onClick={() => setCurDate(curDate.add(1, "month"))}>
            <img src="/svg/btn-arrow-forward.svg" alt="dropdown-icon" />
          </IconWrapper>
        </ArrowWrapper>
      </Header>
      <CalendarWrapper>
        <DayNameArea>
          {DayNameArr.map((name, idx) => (
            <DayNameWrapper key={`${name}-${idx}`}>
              <MyText myFont="medium-14" myColor="steel">
                {name}
              </MyText>
            </DayNameWrapper>
          ))}
        </DayNameArea>
        <DateArea>
          {Array(35)
            .fill(0)
            .map((_, idx) => {
              const targetDate = prevMonthStart.add(idx, "day");

              return (
                <OneDate
                  key={targetDate.valueOf()}
                  targetDate={targetDate}
                  curDate={curDate}
                  disabledType={disabledType}
                />
              );
            })}
        </DateArea>
      </CalendarWrapper>
    </DatePickerBodyWrapper>
  );
};

const DayNameArea = styled.div`
  display: flex;
  column-gap: 12px;
`;

const DateArea = styled.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 12px;
`;

const DayNameWrapper = styled.div`
  width: 32px;
  height: 22px;
  text-align: center;
`;

const CalendarWrapper = styled.div`
  margin-top: 30px;
  padding: 0px 12px 12px;
  width: 100%;
  min-height: 50%;
`;

const ArrowWrapper = styled.div`
  display: flex;
  column-gap: 12px;
`;

const IconWrapper = styled.div`
  cursor: pointer;
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
  padding: 30px 20px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export { DatePickerBody };
export default DatePickerBody;
