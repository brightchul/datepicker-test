import "@emotion/react";
import { Theme } from "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    color: MyColor;
    font: MyFont;
  }
}

interface FontProps {
  fontFamily: string;
  fontStyle?: string;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
}

interface MyFont {
  "bold-32": FontProps;
  "medium-14": FontProps;
  "medium-16": FontProps;
  "regular-16": FontProps;
  "medium-18": FontProps;
}

interface MyColor {
  white: string;
  "white-smoke": string;
  silver: string;
  "silver-light": string;
  black: string;
  "black-12": string;
  "black-16": string;
  "gray-20": string;
  "brownish-grey": string;
  "dodger-blue": string;
  "dodger-blue-008": string;
  "dodger-blue-darker": string;
  "eggplant-80": string;
}

const theme: Theme = {
  color: {
    white: "#ffffff",
    "white-smoke": "#efefef",

    silver: "#dadbdf",
    "silver-light": "#f9f9f9",

    black: "#000000",
    "black-12": "rgba(0,0,0,0.12)",
    "black-16": "rgba(0,0,0,0.16)",

    "gray-20": "#333333",
    "brownish-grey": "#666666",

    "dodger-blue": "#4c80f1",
    "dodger-blue-008": "rgba(76, 128, 241, 0.08)",
    "dodger-blue-darker": "#4371d4",

    "eggplant-80": "rgba(4, 4, 15, 0.8)",
  },

  font: {
    "bold-32": {
      fontFamily: "NotoSansCJKkr-Bold",
      fontSize: "32px",
      lineHeight: "44px",
      letterSpacing: "0",
    },
    "medium-14": {
      fontFamily: "NotoSansCJKkr-Medium",
      fontSize: "14px",
      lineHeight: "18px",
      letterSpacing: "0.9",
    },
    "medium-16": {
      fontFamily: "NotoSansCJKkr-Medium",
      fontSize: "16px",
      lineHeight: "36px",
      letterSpacing: "0.9",
    },
    "regular-16": {
      fontFamily: "NotoSansCJKkr-Regular",
      fontSize: "16px",
      lineHeight: "36px",
      letterSpacing: "0",
    },
    "medium-18": {
      fontFamily: "NotoSansCJKkr-Medium",
      fontSize: "18px",
      lineHeight: "28px",
      letterSpacing: "0",
    },
  },
};

export type { MyColor, MyFont };
export { theme };
export default theme;
