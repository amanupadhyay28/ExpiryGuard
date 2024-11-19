import React from "react";
import Slider from "react-slick";

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      role: "Retailer",
      text: "Using this dashboard, I reduced my inventory waste by 40%. The redistribution feature is a game-changer!",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Jane Smith",
      role: "Supplier",
      text: "This platform helped me fulfill retailer demands faster and cut down on return costs.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Alice Johnson",
      role: "Retailer",
      text: "An easy-to-use tool with great visibility over stock levels. It's a must-have for any retailer!",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Michael Brown",
      role: "Supplier",
      text: "The redistribution feature has saved us money by reducing product returns. Highly recommend!",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Sophia Lee",
      role: "Retailer",
      text: "A great solution for managing inventory and reducing waste. The supplier connections are fantastic!",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "David Clark",
      role: "Supplier",
      text: "This platform has helped optimize my supply chain and strengthen relationships with retailers.",
      image: "https://via.placeholder.com/150",
    },
  ];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          spaceBetween: 20,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          spaceBetween: 20,
          slidesToShow: 2,
        },
        
      },
      {
        breakpoint: 768,
        settings: {
          spaceBetween: 20,
          slidesToShow: 2,
        },
        
      },
    ],
  };

  return (
    <section className="py-16 bg-orange-100">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-orange-700 mb-8">
          What Our Customers Say
        </h2>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 mx-auto rounded-full border-4 border-orange-500"
              />
              <h3 className="mt-4 text-lg font-semibold text-gray-800">
                {testimonial.name}
              </h3>
              <p className="text-sm text-gray-600 italic">{testimonial.role}</p>
              <p className="mt-4 text-gray-700">{testimonial.text}</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
