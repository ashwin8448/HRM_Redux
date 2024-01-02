import { SpanStyles } from "../../core/constants/components/text/textStyledComponents.ts";
import InputErrorWrapper from "./inputError.ts";

function InputError({ error }: { error: string | undefined }) {
  return (
    <InputErrorWrapper className="input-error">
      <span className="material-symbols-outlined">warning</span>
      <SpanStyles className="error-text">{error}</SpanStyles>
      {/* input error  message */}
    </InputErrorWrapper>
  );
}
export default InputError;
