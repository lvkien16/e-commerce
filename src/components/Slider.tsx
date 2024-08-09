"use client";

import { useState } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

const SliderPage = () => {
  const [current, setCurrent] = useState(0);
  const slides = [
    "https://i.pinimg.com/originals/51/82/ac/5182ac536727d576c78a9320ac62de30.jpg",
    "https://wallpapercave.com/wp/wp3386769.jpg",
    "https://wallpaperaccess.com/full/809523.jpg",
    "https://getwallpapers.com/wallpaper/full/5/c/0/606489.jpg",
  ];

  const previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  const nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  return (
    <div className="overflow-hidden relative">
      <div
        className={`flex transition ease-out duration-40`}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((slide) => {
          return <img src={slide} className="w-full" />;
        })}
      </div>

      <div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-10 text-3xl">
        <button onClick={previousSlide}>
          <BsFillArrowLeftCircleFill />
        </button>
        <button onClick={nextSlide}>
          <BsFillArrowRightCircleFill />
        </button>
      </div>

      <div className="absolute bottom-0 py-4 text-center w-full">
        <button>Link</button>
        <div className="flex justify-center gap-3 w-full">
          {slides.map((slide, index) => {
            return (
              <>
                <div
                  onClick={() => {
                    setCurrent(index);
                  }}
                  key={"circle" + index}
                  className={`rounded-full w-5 h-5 cursor-pointer  ${
                    index == current ? "bg-white" : "bg-gray-500"
                  }`}
                ></div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SliderPage;
