import { cx } from "@emotion/css";
import styled from "@emotion/styled";
import { Dayjs } from "dayjs";
import { MyText } from "../myText";
import { useOneDate } from "./customHook";

export const OneDate = ({
  targetDate,
  curDate,
  disabledType,
}: {
  curDate: Dayjs;
  targetDate: Dayjs;
  disabledType: "startDate" | "endDate";
}) => {
  const [onClickFunc, dateStyle] = useOneDate(
    disabledType,
    targetDate,
    curDate
  );

  return (
    <OneDateWrapper onClick={onClickFunc} className={cx(dateStyle)}>
      <OneDateTextWrapper>
        <MyText myFont="medium-18">{targetDate.get("date")}</MyText>
      </OneDateTextWrapper>
    </OneDateWrapper>
  );
};

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
