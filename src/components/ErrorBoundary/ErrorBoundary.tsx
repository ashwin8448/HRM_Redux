
import { Component, ErrorInfo } from "react";
import { ErrorBoundaryProps, ErrorState } from "../../core/interfaces/interface";

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: { message: "" } };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error: ", error, errorInfo);
    this.setState({ hasError: true, error: { message: error.message } });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.{this.state.error.message}</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;