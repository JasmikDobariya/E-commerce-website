import React from "react";
import "./AboutTeam.css";
import AboutTeamarray from "./AboutTeamarray";

const AboutTeam = () => {
  console.log(AboutTeamarray);
  return (
    <section>
      <div className="container">
        <h3 className="py-4">Meet the team who dares to create differently.</h3>
        <div className="row">
          <div className="col-12">
            <div className="row">
              {AboutTeamarray.map((item, index) => (
                <div className="col-3" key={index}>
                  <div className="card">
                    <div className="card-body">
                      <img src={item.image} alt="/" height={250} width={300}/>
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
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
