import React, { useState, useEffect } from "react";
import "./Test2.module.scss";

const images = [
  "https://picsum.photos/600/400?random=1",
  "https://picsum.photos/600/400?random=2",
  "https://picsum.photos/600/400?random=3",
  "https://picsum.photos/600/400?random=4",
  "https://picsum.photos/600/400?random=5",
];

const Test2 = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const length = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(currentImage === length - 1 ? 0 : currentImage + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentImage, length]);

  return (
    <div className="slider">
      <div className="slider-wrapper">
        {images.map((image, index) => (
          <div
            key={index}
            className={index === currentImage ? "slide active" : "slide"}
          >
            <img src={image} alt={`Slide ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Test2;
