import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import { MyText, Dropdown, DatePicker, ActionButton } from "../component";

const DatePickerContainer: React.FC = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [backgroundHeight, setBackgroundHeight] = useState<number>(0);

  useEffect(() => {
    if (backgroundRef && backgroundRef.current) {
      setBackgroundHeight(backgroundRef.current.offsetHeight);
    }
  }, [backgroundRef]);

  return (
    <BackgroundWrapper ref={backgroundRef}>
      <SelectTimeAreaWrapper>
        <SelectTimeAreaTitle>
          <MyText myFont="bold-32" myColor="gray-20">
            응시 기간 설정
          </MyText>
        </SelectTimeAreaTitle>
        <SelectTimeAreaContent>
          <StartTimeWrapper>
            <StartTimeTitle>
              <MyText myFont="medium-14">응시 시작일</MyText>
            </StartTimeTitle>
            <StartTimeSelectArea>
              <DatePicker
                width="236px"
                disabledType={"endDate"}
                backgroundHeight={backgroundHeight}
              />
              <Dropdown
                width="152px"
                data={Array(24)
                  .fill(0)
                  .map(
                    (_, idx) =>
                      `${idx < 12 ? "오전" : "오후"} ${
                        idx % 12 === 0 ? 12 : idx % 12
                      }시`
                  )}
              />
              <Dropdown
                width="152px"
                data={["0분", "10분", "20분", "30분", "40분", "50분"]}
              />
            </StartTimeSelectArea>
          </StartTimeWrapper>
          <Divider />

          <StartTimeWrapper>
            <StartTimeTitle>
              <MyText myFont="medium-14">응시 마감일</MyText>
            </StartTimeTitle>
            <StartTimeSelectArea>
              <DatePicker
                width="236px"
                disabledType={"startDate"}
                backgroundHeight={backgroundHeight}
              />
              <Dropdown
                width="152px"
                data={Array(24)
                  .fill(0)
                  .map(
                    (_, idx) =>
                      `${idx < 12 ? "오전" : "오후"} ${
                        idx % 12 === 0 ? 12 : idx % 12
                      }시`
                  )}
              />
              <Dropdown
                width="152px"
                data={["0분", "10분", "20분", "30분", "40분", "50분"]}
              />
            </StartTimeSelectArea>
          </StartTimeWrapper>
        </SelectTimeAreaContent>
        <ButtonAreaWrapper>
          <ButtonArea>
            <ActionButton>
              <MyText myFont="medium-16">취소</MyText>
            </ActionButton>
            <ActionButton backgroundColor="dodger-blue">
              <MyText myFont="medium-16" myColor="white">
                완료
              </MyText>
            </ActionButton>
          </ButtonArea>
        </ButtonAreaWrapper>
      </SelectTimeAreaWrapper>
    </BackgroundWrapper>
  );
};

const ButtonArea = styled.div`
  display: inline-flex;
  column-gap: 16px;
`;

const ButtonAreaWrapper = styled.div`
  text-align: right;
  margin-top: 56px;
  width: 100%;
`;

const Divider = styled.hr`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.color.silver};
`;

const SelectTimeAreaContent = styled.div`
  margin-top: 56px;
  display: grid;
  row-gap: 32px;
`;

const StartTimeTitle = styled.div``;
const StartTimeWrapper = styled.div`
  display: grid;
  row-gap: 8px;
`;

const StartTimeSelectArea = styled.div`
  display: flex;
  column-gap: 16px;
`;

const SelectTimeAreaTitle = styled.div`
  width: 100%;
`;

const BackgroundWrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color["eggplant-80"]};
`;

const SelectTimeAreaWrapper = styled.div`
  width: 824px;
  height: 485px;
  padding: 40px 84px;
  margin: 0 auto;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color["white"]};
`;

export { DatePickerContainer };
export default DatePickerContainer;
