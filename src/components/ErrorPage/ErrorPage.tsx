import ErrorPageWrapper from "./errorPage.js";
import Button from "../Button/Button.tsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  H1Styles,
  ParagraphStyles,
  TitleStyle,
} from "../../core/constants/components/text/textStyledComponents.ts";
import { Helmet } from "react-helmet";

function ErrorPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const statusCode: string | null = searchParams.get("statusCode");

  let errorMessage;
  switch (statusCode) {
    case "400":
      errorMessage = "Bad Request: The server did not understand the request.";
      break;
    case "401":
      errorMessage =
        "Unauthorized: Authentication is required and has failed or not been provided.";
      break;
    case "403":
      errorMessage =
        "Forbidden: You do not have permission to view this resource.";
      break;
    case "404":
      errorMessage =
        "Not Found: The requested resource could not be found on the server.";
      break;
    case "500":
      errorMessage =
        "Internal Server Error: Something went wrong on the server.";
      break;
    default:
      errorMessage = "An error occurred.";
  }

  return (
    <>
      <Helmet>
        <title>Error</title>
        <meta
          name="description"
          content="Oops! An error occured."
        />
      </Helmet>
      <ErrorPageWrapper className="global-width global-padding">
        <H1Styles className="error-title">
          {statusCode ? statusCode : 404}
        </H1Styles>
        <TitleStyle className="error-subtitle">
          {statusCode ? errorMessage : "Sorry. we couldn't find this page"}
        </TitleStyle>
        {!statusCode && (
          <>
            <ParagraphStyles>
              But dont worry, you can find plenty of other things on our
              homepage
            </ParagraphStyles>
            <Button
              icon="home"
              className="very-important-btn"
              onClick={() => navigate("/")}
            >
              Back to homepage
            </Button>
          </>
        )}
      </ErrorPageWrapper>
    </>
  );
}
export default ErrorPage;
