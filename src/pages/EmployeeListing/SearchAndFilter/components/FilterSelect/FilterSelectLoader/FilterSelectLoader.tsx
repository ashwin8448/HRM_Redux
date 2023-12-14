import {
  FilterSelectLoaderWrapper,
  LoadingText
} from "./filterSelectLoader.ts";
import Loader from "../../../../../../components/Loader/Loader.tsx";

function FilterSelectLoader() {
  return (
    <FilterSelectLoaderWrapper className={`common-flex `}>
      <Loader />
      <LoadingText>Loading</LoadingText>
    </FilterSelectLoaderWrapper>
  );
}

export default FilterSelectLoader;
