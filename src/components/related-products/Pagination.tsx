import React, { useEffect, useState } from "react";
import arrowRight from "../../svg-icons/arrow-right-small.svg";
import arrowLeft from "../../svg-icons/arrow-left-small.svg";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [lastClickedPage, setLastClickedPage] = useState(currentPage);

  useEffect(() => {
    setLastClickedPage(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page !== lastClickedPage) {
      onPageChange(page);
      setLastClickedPage(page);
    } else {
      const nextPage = currentPage < totalPages ? currentPage + 1 : currentPage;
      onPageChange(nextPage);
      setLastClickedPage(nextPage);
    }
  };

  const displayPages = () => {
    const pagesToShow = 3;
    const pages = [];

    if (totalPages <= pagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <span
            key={i}
            className={currentPage === i ? "active" : ""}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </span>
        );
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <span
            key={i}
            className={currentPage === i ? "active" : ""}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </span>
        );
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push(<span key="ellipsis-end">...</span>);
        }
        pages.push(<span key={totalPages}>{totalPages}</span>);
      }
    }

    return pages;
  };

  return (
    <div className="pagination">
      <div className="pagination-wrapper">
        {currentPage > 1 && (
          <span
            onClick={() => handlePageChange(currentPage - 1)}
            className="span-left"
          >
            <img src={arrowLeft} alt="arrow-left" />
          </span>
        )}

        {displayPages()}

        {currentPage < totalPages && (
          <span
            onClick={() => handlePageChange(currentPage + 1)}
            className="span-right"
          >
            <img src={arrowRight} alt="arrow-right" />
          </span>
        )}
      </div>
    </div>
  );
};

export default Pagination;
