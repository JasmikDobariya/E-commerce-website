import React from "react";
import "./Blog.css";

const Blog = () => {
  const blogs = [
    {
      img: "https://yandex-images.clstorage.net/XJh50n182/3b09214XA2E/Rpmw-gzWwtGDHkM430LWEF-SrVaepxjFYc7DHh_xcPRDzoEAer6wl5KNBlwSvekDPRGlQPcvWSEDOhK46hoZwVJKo-jd0VfEEljWOt-DlpcIwmkRiCYPg_FZ1U-ccrM1wQDPSPKja4gehluCGbr9QSkFN8bjuRtujX9MeyWNxg3HX7k1y8lH1E-GR72ZiBUdwdJukcPkRkNlVV7JwLBk5NkFCUS26m9KmUZQzV-3t4rgwfER6DsVJUNmxzqgjwFMzNTyvInJyxRPiAY-1gCeE8nTb5JOIUeNJRSfB4T4qK3cxgoDOqZnz5ZPkQuQsryE7A863KFxWuJO7M0w703ISgLWczSECIVVh0BGO5YClhIHVSZRD6DNhCobn8gEMu8q04vGhHHmJw6TjF4EEr2-wKGJdd3vd5XhiuTCdK4NBosPkjN4AQPLVM8JTDOZCR8VhNqm00BshQkiUFODyTRt79eCjgV3oyFOm81WA5r2N0LtSP3RLruT4M5rA7yizodIhhIxfgsNBJ4DDUg4EEJVHAga4lkE58-MKtDWxQC4JuNUxY3GuKouA5ZOWwFSt3yGroU7nm171WwAJMdzoQeERQSf_TTCA81dBoVGfphDmxOOWiXbAy4PRibQ3EqKMuktV8XKQHIn7gBehlIJk_a2AyzHM1Mq9hvjB68GPucGQUTDnbx1BMnMU8ZBAHrUgh3YxdOnlgsnDIphVFzPD3yvqJhKwQ03Z2BDk09ZwdY0NcNoyfleafMcJwEjjfqggo_FShb9MIoDCd0KyAD-mshVnE5V6d9MJsyD5l_aSYozJCedDojB9yfsy5eAUAHfNvSHaw5yFePwGWtGJIX7LkcHz8idu7qIhk0WhguPvRrLmxpO2q7RzSjNR-aYUEqMMOmn3UfKTjvqYk-TwVaG1721i2iN913gM1KjzqxEPCeBwMpL1nz9y0zFmcNBTzheSpcezxBoEYduTMwkXV9PTk",
      date: "March 12, 2020",
      title: "What is Shabby Chic?",
      dis: "Read More",
    },
    {
      img: "https://avatars.mds.yandex.net/i?id=9ca49fa6c5c130ade754e39f9b72cc160b01d523-5101230-images-thumbs&n=13",
      date: "March 12, 2020",
      title: "Best Examples of Maximalism",
      dis: "Read More",
    },
    {
      img: "https://www.mediajel.com/wp-content/uploads/2020/09/dispensary-blog-post-ideas_ftpng.png",
      date: "March 12, 2020",
      title: "What is Lorem Ipsum?",
      dis: "Read More",
    },
  ];

  
  return (
    <section>
      <div className="container">
        <div className="d-grid justify-content-center align-items-center">
          <span className="text-center">
            <h1 className="titel">From Our Blogs</h1>
            <p className="text-muted pb-4">
              Design your home interior story! Here are the latest trends, tips,
              and design tricks to help you out.
            </p>
          </span>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
          {blogs.map((blog, index) => {
            return (
              <div className="col" key={index}>
                <div className="card h-100 text-center">
                  <img
                    src={blog.img}
                    className="card-img-top"
                    alt="/"
                    height={250}
                  />
                  <div className="card-body">
                    <h6 className="card-title">{blog.date}</h6>
                    <h5 className="card-title">{blog.title}</h5>
                    <a href="/">
                      <h6 className="card-text">{blog.dis}</h6>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center pt-5 mb-5">
          <button className=" btn"> view more </button>
        </div>
      </div>
      
    </section>
  );
};

export default Blog;
