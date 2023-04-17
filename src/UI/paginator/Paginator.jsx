import React from "react";
import { useState } from "react";
import s from "./Paginator.module.scss";

const Paginator = ({
  pagesCount,
  pages,
  currentPage,
  onPageChanged,
  portionSize = 10,
}) => {
  const portionCount = Math.ceil(pagesCount / portionSize);
  const [portionNumber, setPortionNumber] = useState(1);
  const leftPortionNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionNumber = portionNumber * portionSize;

  return (
    <div className={s.paginator}>
      {portionNumber > 1 && (
        <button
          className={s.btn}
          onClick={() => setPortionNumber(portionNumber - 1)}
        >
          PREV
        </button>
      )}
      {pages
        .filter((p) => p >= leftPortionNumber && p <= rightPortionNumber)
        .map((p) => {
          return (
            <div
              className={currentPage === p ? s.selectedPage : s.pageNumber}
              key={p}
              onClick={(e) => {
                onPageChanged(p);
              }}
            >
              {p}
            </div>
          );
        })}
      {portionCount > portionSize && (
        <button
          className={s.btn}
          onClick={() => setPortionNumber(portionNumber + 1)}
        >
          NEXT
        </button>
      )}
    </div>
  );
};

export default Paginator;
