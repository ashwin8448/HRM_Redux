import colors from "../../colors";
import { fontSizes, fontWeights } from "../../fontStyles";

export const smallerTextStyles = `
  margin: 0;
  font-weight: ${fontWeights["--font-normal"]};
  font-size: ${fontSizes["--font-size-sm"]};
  line-height: 1.5;
  color: ${colors.SECONDARY_COLOR};
`;

export const smallTextStyles = `
  margin: 0;
  font-size: ${fontSizes["--font-size-s"]};
  font-weight: ${fontWeights["--font-normal"]};
  color: ${colors.SECONDARY_COLOR};
  line-height: 1.5;
`;

export const mediumTextStyles = `
  margin: 0;
  font-size: ${fontSizes["--font-size-md"]};
  font-weight: ${fontWeights["--font-bold"]};
  color: ${colors.SECONDARY_COLOR};
  margin-bottom: 15px;
`;

export const largeTextStyles = `    
  margin: 0;
  font-weight: ${fontWeights["--font-bold"]};
  font-size: ${fontSizes["--font-size-lg"]};
  line-height: 1.5;
  color: ${colors.SECONDARY_COLOR};
`;

export const extraLargeTextStyles = `
  margin:0;
  font-size: ${fontSizes["--font-size-x-lg"]};
  font-weight: ${fontWeights["--font-bold"]};
  line-height: 1.5;
  color: ${colors.SECONDARY_COLOR};
`;

export const h1TextStyles = `
  margin:0;
  font-size: ${fontSizes["--font-size-h1"]};
  font-weight: ${fontWeights["--font-bold"]};
  line-height: 1.5;
  color: ${colors.SECONDARY_COLOR};
`;
