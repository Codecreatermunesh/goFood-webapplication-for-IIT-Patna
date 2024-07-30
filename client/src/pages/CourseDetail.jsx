import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CourseDetail() {
  const { id } = useParams(); // Extracts the id parameter from the URL
  const [course, setCourse] = useState(null); // State to hold the course details

  useEffect(() => {
    // Function to fetch course details from the API
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/courses/find/${id}`);
        setCourse(res.data); // Set course data to state
      } catch (err) {
        console.error('Error fetching the course details:', err);
      }
    };
    fetchCourse();
  }, [id]); // Trigger the fetch whenever the id changes

  if (!course) return <div>Loading...</div>; // Display loading message until course data is fetched

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
      <img src={course.image} alt={course.title} className="w-64 h-64 object-cover mb-4" />
      
      <p className="mb-4">{course.category}</p>
      <div className="video-wrapper">
        <iframe
          title="Course Video"
          width="50%"
          height="300"
          src={course.url}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default CourseDetail;
