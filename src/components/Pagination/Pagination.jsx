import { useState, useEffect } from 'react';
import css from './Pagination.module.css';

export function Pagination({ currentPage, totalPages, onPageChange }) {
  const [pageButtons, setPageButtons] = useState([]);

  useEffect(() => {
    function generatePageButtons() {
      const buttons = [];

      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={i === currentPage ? css.activePage : css.page}
          >
            {i}
          </button>
        );
      }

      setPageButtons(buttons);
    }

    generatePageButtons();
  }, [currentPage, totalPages, onPageChange]);

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={css.page}
      >
        Previous
      </button>
      {pageButtons}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={css.page}
      >
        Next
      </button>
    </div>
  );
}
