import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cards from './Cards';

function Offer() {
  const [list, setList] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await axios.get("https://gofood-hp8t.onrender.com/api/courses");
        setList(res.data); // Set courses from the server response
        setFilteredCourses(res.data); // Initially display all courses
      } catch (err) {
        console.error('Error fetching the courses:', err);
      }
    };
    getCourses();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredCourses(list);
    } else {
      const filtered = list.filter((course) => course.category === category);
      setFilteredCourses(filtered);
    }
  };

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl">
            We're delighted to have you{" "}
            <span className="text-blue-500">Here! :)</span>
          </h1>
          <p className="mt-12">
            At this time not available any offer opps! :)sorry
          </p>
          <div className="mt-6 flex justify-center items-center">
            <button
              className={`mr-2 px-4 py-2 rounded-md ${
                selectedCategory === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => handleCategoryChange('all')}
            >
              All Offer
            </button>
            <button
              className={`mr-2 px-4 py-2 rounded-md ${
                selectedCategory === 'category1' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => handleCategoryChange('category1')}
            >
              Resent Offer
            </button>
            <button
              className={`mr-2 px-4 py-2 rounded-md ${
                selectedCategory === 'category2' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => handleCategoryChange('category2')}
            >
              Past offer
            </button>
            {/* <button
              className={`px-4 py-2 rounded-md ${
                selectedCategory === 'category3' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => handleCategoryChange('category3')}
            >
              Home 
            </button> */}
          </div>
          <Link to="/">
            <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 duration-300">
              Back
            </button>
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
          {filteredCourses.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Offer;
