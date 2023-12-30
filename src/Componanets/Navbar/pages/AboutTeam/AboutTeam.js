import React from "react";
import "./AboutTeam.css";
import AboutTeamarray from "./AboutTeamarray";

const AboutTeam = () => {
  return (
    <section>
      <div className="container">
        <h3 className="py-4">Meet the team who dares to create differently.</h3>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
          {AboutTeamarray.map((item, index) => (
            <div className="col mb-4" key={index}>
              <div className="card">
                <img
                  src={item.image}
                  className="card-img-top"
                  alt="/"
                  height={250}
                  width={300}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {item.position}
                  </h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
