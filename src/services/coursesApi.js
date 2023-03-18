import axios from 'axios';
import { Notify } from 'notiflix';

axios.defaults.baseURL = 'https://api.wisey.app/api/v1';

export const setToken = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const getToken = async () => {
  try {
    const response = await axios.get('/auth/anonymous?platform=subscriptions');
    setToken(response.data.token);
  } catch (error) {
    Notify.failure(error.message);
  }
};

export const gettingCourses = async () => {
  try {
    await getToken();
    const courses = await axios.get('/core/preview-courses');
    const coursesToShow = courses.data.courses;
    const coursesArr = coursesToShow.map(
      ({
        id,
        tags,
        title,
        description,
        previewImageLink,
        rating,
        lessonsCount,
        meta: { skills },
      }) => ({
        id,
        title,
        tags,
        description,
        previewImageLink,
        rating,
        lessonsCount,
        skills,
      })
    );

    return coursesArr;
  } catch (error) {
    Notify.failure(error.message);
  }
};
