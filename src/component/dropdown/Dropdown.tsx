import styled from "@emotion/styled";
import React, { useState } from "react";
import { MyText } from "../myText";
import DropdownList from "./DropdownList";

interface DropdownProps {
  width?: string;
  data: any[];
}

const Dropdown: React.FC<DropdownProps> = ({ width, data }) => {
  const [selectedValue, setSelectedValue] = useState(data[0]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownWrapper width={width}>
      <DropdownHeaderWrapper onClick={() => setIsOpen(!isOpen)}>
        <MyText myFont="regular-16" myColor="black">
          {selectedValue}
        </MyText>
        <img src="/svg/ic-arrow-drop-down.svg" alt="dropdown-icon" />
      </DropdownHeaderWrapper>
      <DropdownList
        isOpen={isOpen}
        data={data}
        toggleFunc={() => setIsOpen(!isOpen)}
        stateFunc={setSelectedValue}
      />
    </DropdownWrapper>
  );
};

const DropdownHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.color.silver};
  padding: 0px 16px;
  border-radius: 8px;
`;

const DropdownWrapper = styled.div<{ width?: string }>`
  width: ${({ width }) => width || "100%"};
  user-select: none;
`;

export { Dropdown };
export default Dropdown;
