import { Component, ErrorInfo } from "react";
import {
  IErrorBoundaryProps,
  IErrorState,
} from "../../core/interfaces/interface";
import {  H2Styles } from "../../core/constants/components/text/textStyledComponents";

class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: { message: "" } };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error: ", error, errorInfo);
    this.setState({ hasError: true, error: { message: error.message } });
  }

  render() {
    if (this.state.hasError) {
      return (
        <H2Styles>Something went wrong.{this.state.error.message}</H2Styles>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
