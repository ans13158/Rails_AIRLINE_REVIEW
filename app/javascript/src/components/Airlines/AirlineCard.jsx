import React from 'react';
import { Link } from "react-router-dom";

const AirlineCard = ({ airline }) => {
    const { id, name, image_url, review_count, avg_review, slug } = airline;
  return (
      <>
          <div className="card">
              <div className="card-header">
                  <div className="card-title">
                      <h4>
                          {airline.name}
                      </h4>
                  </div>
              </div>
              <div className="card-body">
                  <div className="card-logo">
                      <img src={image_url} alt={name} width="50"  />
                  </div>
                  <div className="airline-name-review-score">
                      <strong>
                          {airline.name}
                      </strong>
                      <p>
                          Review: <strong> {airline.avg_review} / {airline.review_count} </strong>
                      </p>
                  </div>
                  <Link to={`/${slug}`}>
                      View Details
                  </Link>
              </div>
          </div>
      </>
  );
};

export default AirlineCard;
