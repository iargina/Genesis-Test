import { gettingCourses } from 'services/coursesApi';
import { useState, useEffect } from 'react';
import css from './Courses.module.css';
import { CoursesGallery } from 'components/CoursesGallery/CoursesGallery';
import { Pagination } from 'components/Pagination/Pagination';
export const Courses = () => {
  const [coursesLibrary, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [coursesToShow, setCoursesToShow] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    setLoading(true);
    gettingCourses()
      .then(result => {
        setCourses([...result]);
        setTotalPages(Math.ceil(result.length / 10));
        return;
      })
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    setCoursesToShow(coursesLibrary.slice(startIndex, endIndex));
  }, [page, coursesLibrary]);

  function onPageChange(newPage) {
    setPage(newPage);
    const startIndex = (newPage - 1) * 10;
    const endIndex = startIndex + 10;
    setCoursesToShow(coursesLibrary.slice(startIndex, endIndex));
  }

  return (
    <main className={css.main}>
      <div className={css.container}>
        <ul className={css.list}>
          <CoursesGallery coursesArr={coursesToShow} />
          {error && <p>{error}</p>}
          {loading && <h4> Loading</h4>}
        </ul>
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </main>
  );
};
