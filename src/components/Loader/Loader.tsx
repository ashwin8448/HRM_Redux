import LoaderWrapper from "./loader.ts";

function Loader({ className }: { className?: string }) {
  return <LoaderWrapper className={`common-flex ${className}`} />;
}

export default Loader;
