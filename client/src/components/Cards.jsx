import React from 'react';
import { Link } from 'react-router-dom';

function Cards({ item }) {
  return (
    <div className="mt-4 my-3 p-3">
      <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200">
        <figure><img src={item.image} alt={item.title} /></figure>
        <div className="card-body">
          <h2 className="card-title">
            {item.name}
            <div className="badge badge-secondary bg-blue-400">{item.category}</div>
          </h2>
          <p>{item.title}</p>
          <p>{item.desc}</p>
          <div className="card-actions justify-between">
            <div className="badge badge-outline">${item.price}</div>
            <Link to={`/course/${item._id}`} className="btn mt-2 btn-primary">
              View Course
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
