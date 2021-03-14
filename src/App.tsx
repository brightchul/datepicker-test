import styled from "@emotion/styled";
import React from "react";
import { MyText } from "./component/myText";

const Test1 = styled.div`
  border: 1px solid black;
  background-color: #eee;
`;

const Test2 = styled.div`
  background-color: ${({ theme }) => theme.color["black-12"]};
`;

function App() {
  return (
    <div className="App">
      <Test1>
        <MyText myFont="bold-32" myColor="dodger-blue-008">
          ㅌㅔ스트1
        </MyText>
      </Test1>
      <Test2>테스트2</Test2>
    </div>
  );
}

export default App;
