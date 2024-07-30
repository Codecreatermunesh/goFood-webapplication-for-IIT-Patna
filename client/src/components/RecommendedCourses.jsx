import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  margin-top: 20px;
  width: 50%;
`;

const Title = styled.h2`
  font-weight: 600;
  margin-bottom: 20px;
`;

const CourseList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const CourseCard = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const CourseTitle = styled.h3`
  margin-bottom: 10px;
`;

const CourseDescription = styled.p`
  margin-bottom: 10px;
`;

const CourseImage = styled.img`
  width: 80%;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const CategoryText = styled.p`
  margin-bottom: 10px;
`;

const CourseLink = styled.a`
  display: block;
  margin-top: 10px;
  color: blue;
  text-decoration: underline;
`;

const RecommendedCourses = ({ category }) => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("https://gofood-hp8t.onrender.com/api/courses");
        setCourses(res.data); // Set courses from the server response
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, []); // Empty dependency array to fetch courses only once on component mount

  useEffect(() => {
    if (category) {
      const filtered = courses.filter((course) => course.category === category);
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses(courses); // If no category selected, show all courses
    }
  }, [category, courses]);

  return (
    <Container>
      <Title>Recommended Foods</Title>
      {filteredCourses.length === 0 ? (
        <p>No foods found for the selected category.</p>
      ) : (
        <CourseList>
          {filteredCourses.map((course) => (
            <CourseCard key={course.id}>
              <CourseTitle>{course.title}</CourseTitle>
              <CourseDescription>{course.description}</CourseDescription>
              <CourseImage src={course.image} alt={course.title} />
              <CategoryText>
                <strong>Category:</strong> {course.category}
              </CategoryText>
              <CourseLink
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Go to Course
              </CourseLink>
            </CourseCard>
          ))}
        </CourseList>
      )}
    </Container>
  );
};

export default RecommendedCourses;
