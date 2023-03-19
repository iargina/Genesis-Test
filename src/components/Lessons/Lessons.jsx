import Lesson from 'components/Lesson/Lesson';
import css from './Lessons.module.css';

export const Lessons = ({ lessons }) => {
  if (!lessons) {
    return <p>There no lessons here yet</p>;
  }

  return (
    <ul className={css.list}>
      {lessons
        .sort((a, b) => (a.order > b.order ? 1 : -1))
        .map(lesson => {
          return <Lesson lesson={lesson} key={lesson.id} />;
        })}
    </ul>
  );
};
