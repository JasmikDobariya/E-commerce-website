import React from "react";
import "./AboutUs.css"; // Import your CSS file for styling

const AboutUs = () => {
  const aboutus = [
    {
      title: "TECHNOLOGY",
      dis: "Sustainable Furniture Rocks This World! Check Out New Minimalistic Wooden Collection",
      about:
        "At [Your Company Name], we believe that sustainable furniture is not just a choice; it's a way of life. Our new, minimalistic wooden collection is designed to make a positive impact on both your living space and the planet. We understand the growing demand for eco-friendly materials and have made a dedicated effort to create an astonishing look for our latest collection of sustainable furniture. We're committed to blending technology with craftsmanship to bring you a range that rocks the world.",
    },
    {
      title: "INTERIOR",
      dis: "Primary Palette Can Allow You To Be Bold! Give Your Interior Artistic Edge",
      about:
        "At [Your Company Name], we invite you to be bold with your interior choices. Our primary palette approach allows you to infuse an artistic edge into your living spaces. By combining two primary colors with a trendy muted palette, you can transform neutral spaces with wooden furniture into vibrant, standout environments. We provide the tools and inspiration to help you break free from ordinary palettes and elevate your interior design.",
    },
    {
      title: "DESIGN",
      dis: "Check Out The Latest Design Trends! Minimalism, Stripes, and Sculptural Furniture",
      about:
        "[Your Company Name] is your gateway to the world of design innovation. Whether you're a fan of minimalism, stripes, or sculptural furniture, we've got you covered. Our latest collection incorporates everyone's favorite patterns, mixing stripes and checks with the season's freshest colors. From bedroom decor to living room accents, we help you infuse a sense of style with classic cushions and a delicate color scheme or a burst of colorful decoration. Join us in exploring the forefront of design trends.",
    },
  ];

  return (
    <div className="container">
      <div className="py-4 text-center">
        <h2>About Us</h2>
      </div>
      <div className="about-container">
        <div className="about-text">
          {aboutus.map((item, index) => (
            <div className="about-item" key={index}>
              <h3 className="pb-4  about_head">{item.title}</h3>
              <h4 className="pb-3 m-0">{item.dis}</h4>
              <p className="pb-3 m-0">{item.about}</p>
            </div>
          ))}
        </div>
        <div className="about-images">
          <img
            src="https://www.myreaderbooks.com/wp-content/uploads/2022/12/furniture-Lakemba-.jpg"
            alt="Image 1"
            height={450}
            width={600}
          />
          <img
            src="https://www.ardellsmoving.com/wp-content/uploads/2017/06/iStock-514455761-2.jpg"
            alt="Image 2"
            height={450}
            width={600}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
