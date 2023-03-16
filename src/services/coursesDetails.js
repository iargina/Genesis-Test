import axios from 'axios';
const baseURL = 'https://http://api.wisey.app/api/v1';

export const gettingCourseDetails = async courseId => {
  const courseSearch = axios.create({
    baseURL: baseURL,
  });

  const response = await courseSearch(`/${courseId}`);
  const { title, tags, description, previewImageLink, rating, lessons } =
    response.data;
  return {
    title,
    tags,
    description,
    previewImageLink,
    rating,
    lessons,
  };
};
