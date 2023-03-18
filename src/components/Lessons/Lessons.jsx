import Lesson from 'components/Lesson/Lesson';

export const Lessons = ({ lessons }) => {
  if (!lessons) {
    return <p>There no lessons here yet</p>;
  }

  return (
    <ul>
      {lessons
        .sort((a, b) => (a.order > b.order ? 1 : -1))
        .map(lesson => {
          return <Lesson lesson={lesson} key={lesson.id} />;
        })}
    </ul>
  );
};
