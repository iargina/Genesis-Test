import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gettingCourseDetails } from 'services/coursesDetails';
import css from './CoursesDetails.module.css';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Suspense } from 'react';

export const CoursesDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    gettingCourseDetails(courseId).then(setCourse);
  }, [courseId]);

  const posterPath = '/cover.webp';
  const location = useLocation();
  const navigation = useNavigate();
  const backLink = location.state?.from ?? '/';

  const onBackClick = () => {
    navigation(backLink);
  };
  if (!course) return null;

  const { title, tags, description, previewImageLink, rating, lessons } =
    course;

  return (
    course && (
      <div className={css.courseDetail}>
        <button type="button" className={css.button} onClick={onBackClick}>
          Go back
        </button>
        <div className={css.courseWrap}>
          <img
            src={previewImageLink + posterPath}
            alt={title + ' poster'}
            className={css.courseImg}
          />
          <div className={css.courseInfo}>
            <h3 className={css.title}>{title}</h3>
            <p className={css.text}>
              <b>Tagline: </b>"{tags}"
            </p>
            <p className={css.text}>
              <b>Rating: </b>
              {rating}
            </p>
            <p className={css.text}>
              <b>Description: </b>
              {description}
            </p>
            {lessons.map(lesson => {
              return <video src={lesson.link}></video>;
            })}
          </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
    )
  );
};
