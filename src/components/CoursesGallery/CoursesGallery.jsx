import css from './CoursesGallery.module.css';
import { Link, useLocation } from 'react-router-dom';
const posterPath = '/cover.webp';

export const CoursesGallery = ({ coursesArr }) => {
  const location = useLocation();

  return coursesArr.map(course => (
    <li key={course.id} className={css.item}>
      <Link to={course.id} className={css.link} state={{ from: location }}>
        <img src={course.previewImageLink + posterPath} alt="" />
      </Link>
      <h3 className={css.text}>{course.title}</h3>
      <p className={css.text}> Rating: {course.rating}</p>
    </li>
  ));
};
