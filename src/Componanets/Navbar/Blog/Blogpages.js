import React from "react";

const Blogpages = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Top Fashion Trends of the",
      content:
        "While everyone prefers a classic and timeless design, it is also fun to purchase a piece of trend furniture to refresh the space. Whether you want a side table new sofa or are simply intrigued by trend furniture, here are some of the top 2023 furniture trends that are forecast",
      date: "2023-01-15",
      imageUrl:
        "https://cs1.livemaster.ru/storage/78/eb/d8ae4b65726887eec283152977v8--kartiny-i-panno-panno-drevo-zhizni-so-stabilizirovannym-mhom-.jpg", // Replace with your image URL
    },
    {
      id: 2,
      title: "The Latest Home Decor Ideas",
      content:
        "Besides loving the Nester because she’s the Nester, I love that she is a fellow renter who loves where she is. She has created a beautiful home and she craves simplicity which I adore. Her solution for a renter’s kitchen backsplash is brilliant…and yes, it includes hot glue. 🙂",
      date: "2023-02-20",
      imageUrl:
        "https://s3-media1.fl.yelpcdn.com/bphoto/3tbFtF-v1TVUPTdPCExaYg/o.jpg",
    },
    {
      id: 3,
      title: "Modular Bed vs Normal Bed",
      content: "When you  buy modular bed online  or other traditional beds, you have one aim- to get a peaceful night's slumber. The choice of bed plays a significant role in converging comfort and style. Let's look at the  modular bed Vs normal bed  differences and why  modular beds  stand out in this blog.",
      date: "2023-02-20",
      imageUrl:
        "https://www.perimtec.com/wp-content/uploads/2021/01/deck-stain-featured.jpg",
    },
  ];

  return (
    <section className="blog-container container py-3">
      <h2 className="blog-heading text-center pb-4">Latest Blog Posts</h2>
      <div className="row">
        {blogPosts.map((post) => (
          <div key={post.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card">
              <img
                width={500}
                height={400}
                src={post.imageUrl}
                alt={post.title}
                className="card-img-top"
              />
              <div className="card-body">
                <h3 className="card-title py-2">{post.title}</h3>
                <p className="card-date mb-2">Published on {post.date}</p>
                <p className="card-text py-3">{post.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blogpages;
