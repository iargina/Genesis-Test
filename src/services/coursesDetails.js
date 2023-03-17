import axios from 'axios';
const baseURL = 'https://api.wisey.app/api/v1/core/preview-courses/';

export const gettingCourseDetails = async courseId => {
  const courseSearch = axios.create({
    baseURL: baseURL,
    headers: {
      'Authorization ':
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzZTI0MjE0Ny1jZTMzLTQzYTQtOWE3NS0wZGMxYjI1OTk1YTMiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2Nzg5OTkxNjYsImV4cCI6MTY3OTg5OTE2Nn0.P4AKbNthYlIjxZXSLigtuPU1ytHbDQER-1xSa_vo-1c',
    },
  });

  const response = await courseSearch(`/${courseId}`);
  const { title, tags, description, previewImageLink, rating, lessons } =
    response.data;
  return { title, tags, description, previewImageLink, rating, lessons };
};
