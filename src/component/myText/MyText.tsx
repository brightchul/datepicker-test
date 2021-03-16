import styled from "@emotion/styled";
import { MyColor, MyFont } from "../../asset/style";

interface MyTextProps {
  myColor?: keyof MyColor;
  myFont: keyof MyFont;
}

const MyText = styled.div<MyTextProps>`
  color: ${({ theme, myColor }) =>
    myColor ? theme.color[myColor] : "inherit"};
  font-family: ${({ theme, myFont }) => theme.font[myFont].fontFamily};
  font-size: ${({ theme, myFont }) => theme.font[myFont].fontSize};
  line-height: ${({ theme, myFont }) => theme.font[myFont].lineHeight};
  letter-spacing: ${({ theme, myFont }) => theme.font[myFont].letterSpacing};
  display: inline-block;
`;

export { MyText };
export default MyText;
