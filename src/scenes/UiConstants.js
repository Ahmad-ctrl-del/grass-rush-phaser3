export const FONT_FAMILY = "Arial Black, Arial";

export const FONT_SIZE = {
  mainTitle: "44px",
  sceneHeading: "34px",
  hud: "26px",
  normalLabel: "18px",
  normalValue: "20px",
  small: "16px",
};

export const COLORS = {
  textOnLight: "#2b1810",
  textOnDark: "#f1eaea",
  outline: "#000000",
  success: "#b9f571",
  failure: "#faadad",
};

export const ICON_DISPLAY_SIZE = 55;

export const TEXT_STYLE = {
  hud: {
    fontSize: FONT_SIZE.hud,
    fontFamily: FONT_FAMILY,
    color: COLORS.textOnDark,
    stroke: COLORS.outline,
    strokeThickness: 6,
  },
  labelOnLight: {
    fontSize: FONT_SIZE.normalLabel,
    fontFamily: FONT_FAMILY,
    color: COLORS.textOnLight,
  },
  valueOnLight: {
    fontSize: FONT_SIZE.normalValue,
    fontFamily: FONT_FAMILY,
    color: COLORS.textOnLight,
  },
  labelOnDark: {
    fontSize: FONT_SIZE.normalLabel,
    fontFamily: FONT_FAMILY,
    color: COLORS.textOnDark,
  },
  valueOnDark: {
    fontSize: FONT_SIZE.normalValue,
    fontFamily: FONT_FAMILY,
    color: COLORS.textOnDark,
  },
};
