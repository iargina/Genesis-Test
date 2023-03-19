import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import css from './Lesson.module.css';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

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
    return (
      <Accordion allowZeroExpanded>
        <AccordionItem>
          <li key={lesson.id}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <h3 className={css.titleLesson}>
                  <b>Lesson {lesson.order}: </b> {lesson.title}
                </h3>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <p className={css.textLesson}>
                We are very sorry, but the link to the lesson was lost somewhere
                ... We are already correcting this error, but for now, look at
                another lesson
              </p>
            </AccordionItemPanel>
          </li>
        </AccordionItem>
      </Accordion>
    );
  }

  if (lesson.status === 'locked') {
    return (
      <Accordion allowZeroExpanded>
        <AccordionItem>
          <li className="lesson_button">
            <AccordionItemHeading>
              <AccordionItemButton>
                <h3 className={css.titleLesson}>
                  <b>Lesson {lesson.order}: </b> {lesson.title}
                </h3>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <p className={css.textLesson}>Lesson is Locked</p>
            </AccordionItemPanel>
          </li>
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <Accordion allowZeroExpanded>
      <AccordionItem>
        <li key={lesson.id}>
          <AccordionItemHeading>
            <AccordionItemButton>
              <h3 className={css.titleLesson}>
                <b>Lesson {lesson.order}: </b> {lesson.title}
              </h3>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <div className={css.lessonWrap}>
              <ReactPlayer
                id={lesson.id}
                url={lesson.link}
                width="100%"
                height="auto"
                controls={true}
                pip={true}
                onProgress={progress => {
                  setPlayed(progress.playedSeconds);
                }}
                stopOnUnmount={false}
                config={{
                  file: {
                    attributes: {
                      poster:
                        lesson.previewImageLink +
                        '/lesson-' +
                        lesson.order +
                        '.webp',
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
          </AccordionItemPanel>
        </li>
      </AccordionItem>
    </Accordion>
  );
};

export default Lesson;
