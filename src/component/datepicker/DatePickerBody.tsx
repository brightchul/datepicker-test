import { cx, css } from "@emotion/css";
import styled from "@emotion/styled";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";
import { MyText } from "../myText";

interface DatePickerBodyWrapperProps {
  isOpen: boolean;
}

interface DatePickerBodyProps {
  isOpen: boolean;
  toggleFunc: () => void;
  selectedDate: Dayjs;
  setFunc: any;
  disabledDate: Dayjs;
  disabledType: "before" | "after";
}

const DatePickerBodyWrapper = styled.div<DatePickerBodyWrapperProps>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  margin-top: 8px;
  border-radius: 8px;
  width: 320px;
  height: 346px;

  box-shadow: 0 4px 4px 0 ${({ theme }) => theme.color["black-16"]};
  background-color: ${({ theme }) => theme.color.white};
`;

const DayNameArr = ["월", "화", "수", "목", "금", "토", "일"];

const DatePickerBody: React.FC<DatePickerBodyProps> = ({
  isOpen,
  toggleFunc,
  selectedDate,
  setFunc,
  disabledDate,
  disabledType,
}) => {
  const [curDate, setCurDate] = useState(dayjs().set("date", 1));
  const currentMonthFirstDay = curDate.get("day");
  const prevMonthStart = curDate.subtract(
    currentMonthFirstDay > 0 ? currentMonthFirstDay - 1 : 6,
    "day"
  );

  return (
    <DatePickerBodyWrapper isOpen={isOpen}>
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
                  onClick={setFunc}
                  key={targetDate.valueOf()}
                  selectedDate={selectedDate}
                  targetDate={targetDate}
                  curDate={curDate}
                  disabledDate={disabledDate}
                  disabledType={disabledType}
                />
              );
            })}
        </DateArea>
      </CalendarWrapper>
    </DatePickerBodyWrapper>
  );
};

const OneDate = ({
  onClick,
  targetDate,
  selectedDate,
  curDate,
  disabledDate,
  disabledType,
}: {
  onClick: Function;
  selectedDate: Dayjs;
  curDate: Dayjs;
  targetDate: Dayjs;
  disabledDate: Dayjs;
  disabledType: any;
}) => {
  const isSelected = selectedDate.isSame(targetDate, "date");
  const isDisable = checkDisabled(targetDate, disabledDate, disabledType);
  const cssString = checkDateType(curDate, targetDate, isDisable, isSelected);

  return (
    <OneDateWrapper
      onClick={() => isDisable || onClick(targetDate)}
      className={cx(cssString)}
    >
      <OneDateTextWrapper>
        <MyText myFont="medium-18">{targetDate.get("date")}</MyText>
      </OneDateTextWrapper>
    </OneDateWrapper>
  );
};

const checkDisabled = (
  targetDate: Dayjs,
  disabledDate: Dayjs,
  disabledType: "before" | "after"
) => {
  switch (disabledType) {
    case "before":
      if (Math.abs(disabledDate.diff(targetDate, "hour")) < 24) {
        return disabledDate.get("date") >= targetDate.get("date");
      }
      return disabledDate >= targetDate;
    case "after":
      if (Math.abs(disabledDate.diff(targetDate, "hour")) < 24) {
        return disabledDate.get("date") <= targetDate.get("date");
      }
      return disabledDate <= targetDate;
    default:
      throw new Error(`disabledType : ${disabledType} is not defined!!`);
  }
};

const checkDateType: (
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

const OneDateWrapper = styled.div`
  height: 32px;
  width: 32px;
  text-align: center;
  border-radius: 50%;
`;

const OneDateTextWrapper = styled.div`
  margin-bottom: 3px;
  margin-top: 1px;
  width: 100%;
`;

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
