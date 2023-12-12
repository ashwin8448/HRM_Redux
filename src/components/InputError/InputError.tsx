import InputErrorWrapper from "./inputError.ts";

function InputError({ error }: { error: string | undefined }) {
    return (
        <InputErrorWrapper className="input-error">
            <span className="material-symbols-outlined">warning</span>
            <span className="error-text">{error}</span>
            {/* input error  message */}
        </InputErrorWrapper>
    );
}
export default InputError;
