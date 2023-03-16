import { gettingCourses } from 'services/coursesApi';
import { useState, useEffect } from 'react';
import css from './Courses.module.css';
import { CoursesGallery } from 'components/CoursesGallery/CoursesGallery';

export const Courses = () => {
  const [coursesLibrary, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    gettingCourses()
      .then(result => {
        setCourses([...result]);
        return;
      })
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={css.container}>
      <ul className={css.list}>
        <CoursesGallery coursesArr={coursesLibrary} />
        {error && <p>{error}</p>}
        {loading && <h4> Loading</h4>}
      </ul>
    </div>
  );
};
