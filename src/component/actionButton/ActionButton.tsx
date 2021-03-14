import styled from "@emotion/styled";
import { MyColor } from "../../asset/style";

interface ActionButtonProps {
  backgroundColor?: keyof MyColor;
}

const ActionButton = styled.button<ActionButtonProps>`
  padding: 4px 16px;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.color.silver};
  background-color: ${({ backgroundColor = "white", theme }) =>
    theme.color[backgroundColor]};

  :focus {
    outline: none;
  }
`;

export { ActionButton };
export default ActionButton;
