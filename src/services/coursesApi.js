import axios from 'axios';

const coursesApi = axios.create({
  baseURL: 'https://api.wisey.app/api/v1/core/preview-courses',
  headers: {
    'Authorization ':
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzZTI0MjE0Ny1jZTMzLTQzYTQtOWE3NS0wZGMxYjI1OTk1YTMiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2Nzg5OTkxNjYsImV4cCI6MTY3OTg5OTE2Nn0.P4AKbNthYlIjxZXSLigtuPU1ytHbDQER-1xSa_vo-1c',
  },
});

export const gettingCourses = async () => {
  const courses = await coursesApi.get();
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
};
