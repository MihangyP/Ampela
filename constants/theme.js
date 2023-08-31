const COLORS = {
  primary: "#333333",
  
  neutral400: "#808080",
  neutral300: "#C4C4C4",
  neutral250: "#EEDCAE",
  neutral200: "#FEDADA",
  neutral100: "#FFFFFF",
  
  accent800: "#FE8729", 
  accent600: "#E2445C",
  accent500: "#FF7575",
  accent400: "#FFADAD",
};

const FONT = {
  medium: "Medium",
  semiBold: "SBold",
  bold: "Bold",
};

const SIZES = {
  xSmall: 10,
  small: 13,
  medium: 15,
  large: 20,
  xLarge: 24,
  xxLarge: 34,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, FONT, SIZES, SHADOWS };
