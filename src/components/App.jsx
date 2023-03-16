import { Routes, Route, NavLink } from 'react-router-dom';
import { Courses } from '../pages/Courses/Courses';
import { CoursesDetails } from '../pages/CoursesDetails/CoursesDetails';
import css from './App.module.css';

export const App = () => {
  return (
    <div className={css.container}>
      <nav className={css.nav}>
        <NavLink className={css.link} to="/">
          Courses
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/:courseId" element={<CoursesDetails />}></Route>
        <Route path="*" element={<Courses />} />
      </Routes>
    </div>
  );
};
