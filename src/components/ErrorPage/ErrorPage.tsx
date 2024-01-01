import ErrorPageWrapper from "./errorPage.js";
import StyledLink from "../StyledLink.js";
import Button from "../Button/Button.tsx";
import { useSearchParams } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

function ErrorPage() {

    const matches = useMediaQuery("(min-width: 768px)");

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
        <ErrorPageWrapper className="global-width global-padding">
            <p className="error-title">{statusCode ? statusCode : 404}</p>
            <p className={matches ? `error-subtitle page-title` : `error-subtitle page-title-mobile`}>
                {statusCode ? errorMessage : "Sorry. we couldn't find this page"}
            </p>
            {!statusCode && (
                <>
                    <p className="error-subtitle">
                        But dont worry, you can find plenty of other things on our homepage
                    </p>
                    <StyledLink to="/">
                        <Button icon="home" className="back-to-home-btn">
                            Back to homepage
                        </Button>
                    </StyledLink>
                </>
            )}
        </ErrorPageWrapper>
    );
}
export default ErrorPage;