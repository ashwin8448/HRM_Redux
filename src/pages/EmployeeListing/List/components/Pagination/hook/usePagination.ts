import { useMemo } from "react";
import {
  thresholdPageSize,
  DOTS,
  paginationItemsCount,
} from "../../../../../../core/config/constants";

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

function usePagination({
  totalPageCount,
  currentPage,
}: {
  totalPageCount: number;
  currentPage: number;
}) {
  const paginationRange = useMemo(() => {
    /*
          If the number of pages is less than the page numbers we want to show in our
          paginationComponent, we return the range [1..totalPageCount]
        */
    if (thresholdPageSize >= totalPageCount) {
      return range(1, totalPageCount);
      // the dots will appear only if the totalPageCount > 6
    }

    const leftSiblingIndex = Math.max(currentPage - 1, 1);
    const rightSiblingIndex = Math.min(currentPage + 1, totalPageCount);

    /*
          We do not want to show dots if there is only one position left 
          after/before the left/right page count as that would lead to a change if our Pagination
          component size which we do not want

          Following code will render only when page numbers > 6
        */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    // Show dots to the right side. More pages on right.
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftRange = range(1, paginationItemsCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    // Show dots to the left side. More pages on left.
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightRange = range(
        totalPageCount - paginationItemsCount + 1,
        totalPageCount
      );

      return [firstPageIndex, DOTS, ...rightRange];
    }

    // Show dots to the left and right side. Almost large number of pages on left and right side.
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);

      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalPageCount, currentPage]);

  return paginationRange;
}

export default usePagination;
