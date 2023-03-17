import { Routes, Route, NavLink } from 'react-router-dom';
import { Courses } from '../pages/Courses/Courses';
import { CoursesDetails } from '../pages/CoursesDetails/CoursesDetails';
import css from './App.module.css';

export const App = () => {
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <h1 className={css.title}>
          Courses<span className={css.text}>App</span>
        </h1>
        <nav className={css.nav}>
          <NavLink className={css.link} to="/">
            Courses
          </NavLink>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/:courseId" element={<CoursesDetails />}></Route>
        <Route path="*" element={<Courses />} />
      </Routes>
    </div>
  );
};
