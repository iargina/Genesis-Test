import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import css from './Lesson.module.css';

const Lesson = ({ lesson }) => {
  const [played, setPlayed] = useState(0);

  useEffect(() => {
    const storedProgress = localStorage.getItem(`progress_${lesson.id}`);
    const initialProgress = storedProgress ? parseFloat(storedProgress) : 0;
    setPlayed(initialProgress);
  }, [lesson.id]);

  useEffect(() => {
    if (played) {
      localStorage.setItem(`progress_${lesson.id}`, played);
    }
  }, [played, lesson.id]);

  const lessontoShow = document.getElementById(`${lesson.id}`);
  if (lessontoShow && played !== 0) {
    if (!lessontoShow.firstChild) {
      return;
    }
    lessontoShow.firstChild.currentTime = played;
  }

  if (!lesson.link) {
    return <p>Something Went Wrong</p>;
  }
  if (lesson.status === 'locked') {
    return (
      <li className="lesson_button">
        <h3 className={css.titleLesson}>
          <b>Lesson {lesson.order}: </b> {lesson.title}
        </h3>
        <p className={css.textLesson}>Lesson is Locked</p>
      </li>
    );
  }

  return (
    <li key={lesson.id}>
      <h3 className={css.titleLesson}>
        <b>Lesson {lesson.order}: </b> {lesson.title}
      </h3>
      <div className={css.lessonWrap}>
        <ReactPlayer
          id={lesson.id}
          url={lesson.link}
          controls={true}
          pip={true}
          onProgress={progress => {
            setPlayed(progress.playedSeconds);
          }}
          config={{
            file: {
              attributes: {
                poster:
                  lesson.previewImageLink + '/lesson-' + lesson.order + '.webp',
              },
            },
          }}
        />
        <div className={css.progressWrap}>
          <p className={css.text}>Your progress</p>
          <progress
            max={lesson.duration}
            value={played}
            className={css.progress}
          />
        </div>
      </div>
    </li>
  );
};

export default React.memo(Lesson);
