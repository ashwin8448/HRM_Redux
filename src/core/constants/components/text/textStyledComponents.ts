import styled from "styled-components";
import * as textStyles from "./textStyles.ts";

export const LabelStyles = styled.label`
  ${textStyles.smallerTextStyles}
`;

export const ParagraphStyles = styled.p`
  ${textStyles.smallTextStyles}
`;

export const TableDataStyles = styled.td`
  ${textStyles.smallTextStyles}
`;

export const SpanStyles = styled.span`
  ${textStyles.smallTextStyles}
`;

export const H3Styles = styled.h3`
  ${textStyles.mediumTextStyles}
`;

export const H2Styles = styled.h2`
  ${textStyles.largeTextStyles}
`;

export const TitleStyle = styled.h2`
  ${textStyles.extraLargeTextStyles}

  @media (max-width: 768px) {
    ${textStyles.largeTextStyles}
  }
`;

export const H1Styles = styled.h1`
  ${textStyles.h1TextStyles}
`;
