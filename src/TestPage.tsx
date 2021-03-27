import styled from "@emotion/styled";
import React, { useState } from "react";
import { DatePickerContainer } from "./container";

const TestPage: React.FC = () => {
  const [isShow, setIsShow] = useState(false);
  return (
    <div>
      <ButtonWrapper>
        <button onClick={() => setIsShow(!isShow)}>날짜 선택</button>
      </ButtonWrapper>
      {isShow && <DatePickerContainer />}
    </div>
  );
};

const ButtonWrapper = styled.div``;

export { TestPage };
export default TestPage;
