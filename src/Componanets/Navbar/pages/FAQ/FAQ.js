import React, { useState } from "react";
import "./FAQ.css"; // Import your CSS file with styles

const FAQ = () => {
  const faqtitel = [
    {
      titel: [
        "COMPANY POLICIES",
        "PAYMENT OPTIONS",
        "TERMS & CONDITIONS",
        "Positioning",
        "Efficient",
        "Conditions",
        "Mind Procedure",
        "Delivery JobS",
        "Marketplace",
      ],
      about: [
        "You Can Learn About Company Policies Guide, Some Rules, and Useful Info",
        "You Can Learn About Company Policies Guide, Some Rules, and Useful Info",
        "You Can Learn About Company Policies Guide, Some Rules, and Useful Info",
        "You Can Learn About Company Policies Guide, Some Rules, and Useful Info",
        "You Can Learn About Company Policies Guide, Some Rules, and Useful Info",
        "You Can Learn About Company Policies Guide, Some Rules, and Useful Info",
        "You Can Learn About Company Policies Guide, Some Rules, and Useful Info",
        "You Can Learn About Company Policies Guide, Some Rules, and Useful Info",
        "You Can Learn About Company Policies Guide, Some Rules, and Useful Info",
      ],
      dis: [
        "Company policies guide is useful information for clients. You can learn about company rules regarding payment methods, shipping, support, etc. If you have questions you can always study this guide to find necessary answers for you, or use a contact form.",
        "Company policies guide is useful information for clients. You can learn about company rules regarding payment methods, shipping, support, etc. If you have questions you can always study this guide to find necessary answers for you, or use a contact form.",
        "Company policies guide is useful information for clients. You can learn about company rules regarding payment methods, shipping, support, etc. If you have questions you can always study this guide to find necessary answers for you, or use a contact form.",
        "Company policies guide is useful information for clients. You can learn about company rules regarding payment methods, shipping, support, etc. If you have questions you can always study this guide to find necessary answers for you, or use a contact form.",
        "Company policies guide is useful information for clients. You can learn about company rules regarding payment methods, shipping, support, etc. If you have questions you can always study this guide to find necessary answers for you, or use a contact form.",
        "Company policies guide is useful information for clients. You can learn about company rules regarding payment methods, shipping, support, etc. If you have questions you can always study this guide to find necessary answers for you, or use a contact form.",
        "Company policies guide is useful information for clients. You can learn about company rules regarding payment methods, shipping, support, etc. If you have questions you can always study this guide to find necessary answers for you, or use a contact form.",
        "Company policies guide is useful information for clients. You can learn about company rules regarding payment methods, shipping, support, etc. If you have questions you can always study this guide to find necessary answers for you, or use a contact form.",
        "Company policies guide is useful information for clients. You can learn about company rules regarding payment methods, shipping, support, etc. If you have questions you can always study this guide to find necessary answers for you, or use a contact form.",
      ],
    },
  ];

  const [activeTitle, setActiveTitle] = useState(null);

  const handleClickTitle = (index) => {
    setActiveTitle(index);
    scrollToDetail(index);
  };

  const scrollToDetail = (index) => {
    const detailElement = document.getElementById(`faqDetail${index}`);
    if (detailElement) {
      detailElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section>
      <div className="container py-5">
        <div className="row ">
          <div className="col-3">
            <h2>FAQ</h2>
            <p className="pb-5">
              Successful brands get into the mind slowly. A blurb in a magazine.
              A mention in a newspaper. A comment from a friend. A display in a
              retail
            </p>
            <ul className="title-list">
              {faqtitel[0].titel.map((title, index) => (
                <li key={index} className="title-list-item">
                  <h4
                    onClick={() => handleClickTitle(index)}
                    className={activeTitle === index ? "active" : ""}
                  >
                    {title}
                  </h4>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-9">
            {faqtitel[0].titel.map((title, index) => (
              <div
                key={index}
                className={`detail-section ${activeTitle === index ? "active" : ""}`}
                id={`faqDetail${index}`}
              >
                <h4>{title}</h4>
                <h6>{faqtitel[0].about[index]}</h6>
                <p>{faqtitel[0].dis[index]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
