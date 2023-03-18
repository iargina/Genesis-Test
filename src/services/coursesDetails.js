import axios from 'axios';
import { Notify } from 'notiflix';
import { getToken } from './coursesApi';

axios.defaults.baseURL = 'https://api.wisey.app/api/v1';

export const gettingCourseDetails = async courseId => {
  try {
    await getToken();
    const response = await axios.get(`/core/preview-courses/${courseId}`);
    const { title, tags, description, previewImageLink, rating, lessons } =
      response.data;
    return { title, tags, description, previewImageLink, rating, lessons };
  } catch (error) {
    Notify.failure(error.message);
  }
};
