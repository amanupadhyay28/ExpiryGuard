import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // ShadCN Button component
import { cn } from "@/lib/utils"; // ShadCN utility for conditional classes

const Carousel = ({ cards, autoplayInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 2);
    }
  };

  const nextSlide = () => {
    if (currentIndex < cards.length - 2) {
      setCurrentIndex((prevIndex) => prevIndex + 2);
    }
  };

  // Autoplay functionality
  useEffect(() => {
    const autoplay = setInterval(() => {
      if (currentIndex < cards.length - 2) {
        nextSlide();
      } else {
        setCurrentIndex(0); // Reset to start when reaching the end
      }
    }, autoplayInterval);

    return () => clearInterval(autoplay); // Cleanup on unmount
  }, [currentIndex, autoplayInterval]);

  return (
    <div className="relative w-[80%] mx-auto">
      {/* Cards Wrapper */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentIndex * 50}%)`,
          }}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="w-1/2 flex-shrink-0 flex justify-center px-4"
            >
              {/* Single Card */}
              <div className="w-full h-64 p-6 bg-orange-600 rounded-lg shadow-md text-center">
                <div className="text-orange-600 text-4xl mb-4">{card.icon}</div>
                <h3 className="text-3xl font-extrabold mb-2 text-white">
                  {card.title}
                </h3>
                <p className="text-white text-xl mt-4 text-center">
                  {card.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        className={cn(
          "absolute top-1/2 left-4 -translate-y-1/2 text-orange-600 bg-white  p-2",
          currentIndex === 0 && "opacity-50 cursor-not-allowed"
        )}
        onClick={prevSlide}
        disabled={currentIndex === 0}
      >
        ❮
      </Button>
      <Button
        variant="ghost"
        className={cn(
          "absolute top-1/2 right-4 -translate-y-1/2 text-orange-600 bg-white  p-3",
          currentIndex >= cards.length - 2 && "opacity-50 cursor-not-allowed"
        )}
        onClick={nextSlide}
        disabled={currentIndex >= cards.length - 2}
      >
        ❯
      </Button>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array(Math.ceil(cards.length / 2))
          .fill(null)
          .map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * 2)}
              className={cn(
                "h-2 w-2 rounded-full",
                currentIndex === index * 2
                  ? "bg-orange-600"
                  : "bg-gray-400 hover:bg-gray-500"
              )}
            />
          ))}
      </div>
    </div>
  );
};

export default Carousel;
