import css from './CoursesGallery.module.css';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';

const CoursesGallery = ({ coursesArr }) => {
  const location = useLocation();
  const posterPath = '/cover.webp';

  return coursesArr.map(course => {
    let skillsStr = null;
    if (course.skills) {
      skillsStr = course.skills.join(', ').toLowerCase();
    }
    return (
      <li key={course.id} className={css.item}>
        <Link to={course.id} className={css.link} state={{ from: location }}>
          <img
            src={course.previewImageLink + posterPath}
            alt=""
            className={css.poster}
          />
        </Link>
        <h3 className={css.title}>{course.title}</h3>
        <p className={css.text}>
          <span className={css.span}> Tags: </span>
          {course.tags.join(', ')}
        </p>
        <p className={css.text}>
          <span className={css.span}>Rating: </span>
          {course.rating}
        </p>
        <p className={css.text}>
          <span className={css.span}> Duration:</span> {course.lessonsCount}
        </p>
        {skillsStr && (
          <p className={css.text}>
            <span className={css.span}>Skills:</span> {skillsStr}
          </p>
        )}
        <p className={css.text}>
          <span className={css.span}>About course:</span> {course.description}
        </p>
      </li>
    );
  });
};

export default React.memo(CoursesGallery);
