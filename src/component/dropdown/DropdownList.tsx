import styled from "@emotion/styled";
import React from "react";
import { MyText } from "../myText";

const DropList = styled.div`
  padding: 4px 16px;

  :hover {
    background-color: ${({ theme }) => theme.color["silver-light"]};
  }
`;

interface DropdownListWrapperProps {
  isOpen: boolean;
}

interface DropdownListProps {
  isOpen: boolean;
  stateFunc: React.Dispatch<React.SetStateAction<any>>;
  data: any[];
}

const DropdownListWrapper = styled.div<DropdownListWrapperProps>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  width: inherit;
  margin-top: 8px;
  padding: 8px 0;
  border-radius: 8px;
  overflow-y: scroll;
  max-height: 236px;
  box-shadow: 0 4px 4px 0 ${({ theme }) => theme.color["black-16"]};
  background-color: ${({ theme }) => theme.color.white};
`;

const DropdownList: React.FC<DropdownListProps> = ({
  isOpen,
  stateFunc,
  data,
}) => {
  return (
    <DropdownListWrapper isOpen={isOpen}>
      {data.map((one, idx) => (
        <DropList
          key={`${one}-${idx}`}
          onClick={() => {
            stateFunc(one);
          }}
        >
          <MyText myFont="regular-16">{one}</MyText>
        </DropList>
      ))}
    </DropdownListWrapper>
  );
};

DropdownList.defaultProps = {
  data: [] as any[],
};

export { DropdownList };
export default DropdownList;
