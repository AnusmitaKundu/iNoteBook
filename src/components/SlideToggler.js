// import { motion } from "framer-motion";
// import { useState } from "react";
// import { FiMoon, FiSun } from "react-icons/fi";

// const TOGGLE_CLASSES =
//   "text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10";

// const SlideToggler = () => {
//   const [selected, setSelected] = useState("light");
//   return (
//     <div
//       className={`grid h-[200px] place-content-center px-4 transition-colors ${
//         selected === "light" ? "bg-white" : "bg-slate-900"
//       }`}
//     >
//       <SliderToggle selected={selected} setSelected={setSelected} />
//     </div>
//   );
// };

// const SliderToggle = ({ selected, setSelected }) => {
//   return (
//     <div className="relative flex w-fit items-center rounded-full">
//       <button
//         className={`${TOGGLE_CLASSES} ${
//           selected === "light" ? "text-white" : "text-slate-300"
//         }`}
//         onClick={() => {
//           setSelected("light");
//         }}
//       >
//         <FiMoon className="relative z-10 text-lg md:text-sm" />
//         <span className="relative z-10">Light</span>
//       </button>
//       <button
//         className={`${TOGGLE_CLASSES} ${
//           selected === "dark" ? "text-white" : "text-slate-800"
//         }`}
//         onClick={() => {
//           setSelected("dark");
//         }}
//       >
//         <FiSun className="relative z-10 text-lg md:text-sm" />
//         <span className="relative z-10">Dark</span>
//       </button>
//       <div
//         className={`absolute inset-0 z-0 flex ${
//           selected === "dark" ? "justify-end" : "justify-start"
//         }`}
//       >
//         <motion.span
//           layout
//           transition={{ type: "spring", damping: 15, stiffness: 250 }}
//           className="h-full w-1/2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
//         />
//       </div>
//     </div>
//   );
// };

// export default SlideToggler;

import { useAnimate } from "framer-motion";
import React, { useRef } from "react";
import { FiMousePointer } from "react-icons/fi";

export const Example = () => {
  return (
    <MouseImageTrail
      renderImageBuffer={50}
      rotationRange={25}
      images={[
        "/imgs/active/1.jpg",
        "/imgs/active/2.jpg",
        "/imgs/active/3.jpg",
        "/imgs/active/4.jpg",
        "/imgs/active/5.jpg",
        "/imgs/active/6.jpg",
        "/imgs/active/7.jpg",
        "/imgs/active/8.jpg",
        "/imgs/active/9.jpg",
        "/imgs/active/10.jpg",
        "/imgs/active/11.jpg",
        "/imgs/active/12.jpg",
        "/imgs/active/13.jpg",
        "/imgs/active/14.jpg",
        "/imgs/active/15.jpg",
        "/imgs/active/16.jpg",
      ]}
    >
      <section className="grid h-screen w-full place-content-center bg-white">
        <p className="flex items-center gap-2 text-3xl font-bold uppercase text-black">
          <FiMousePointer />
          <span>Hover me</span>
        </p>
      </section>
    </MouseImageTrail>
  );
};

const MouseImageTrail = ({
  children,
  // List of image sources
  images,
  // Will render a new image every X pixels between mouse moves
  renderImageBuffer,
  // images will be rotated at a random number between zero and rotationRange,
  // alternating between a positive and negative rotation
  rotationRange,
}) => {
  const [scope, animate] = useAnimate();

  const lastRenderPosition = useRef({ x: 0, y: 0 });
  const imageRenderCount = useRef(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;

    const distance = calculateDistance(
      clientX,
      clientY,
      lastRenderPosition.current.x,
      lastRenderPosition.current.y
    );

    if (distance >= renderImageBuffer) {
      lastRenderPosition.current.x = clientX;
      lastRenderPosition.current.y = clientY;

      renderNextImage();
    }
  };

  const calculateDistance = (x1, y1, x2, y2) => {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    // Using the Pythagorean theorem to calculate the distance
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    return distance;
  };

  const renderNextImage = () => {
    const imageIndex = imageRenderCount.current % images.length;
    const selector = `[data-mouse-move-index="${imageIndex}"]`;

    const el = document.querySelector(selector);

    el.style.top = `${lastRenderPosition.current.y}px`;
    el.style.left = `${lastRenderPosition.current.x}px`;
    el.style.zIndex = imageRenderCount.current.toString();

    const rotation = Math.random() * rotationRange;

    animate(
      selector,
      {
        opacity: [0, 1],
        transform: [
          `translate(-50%, -25%) scale(0.5) ${
            imageIndex % 2
              ? `rotate(${rotation}deg)`
              : `rotate(-${rotation}deg)`
          }`,
          `translate(-50%, -50%) scale(1) ${
            imageIndex % 2
              ? `rotate(-${rotation}deg)`
              : `rotate(${rotation}deg)`
          }`,
        ],
      },
      { type: "spring", damping: 15, stiffness: 200 }
    );

    animate(
      selector,
      {
        opacity: [1, 0],
      },
      { ease: "linear", duration: 0.5, delay: 5 }
    );

    imageRenderCount.current = imageRenderCount.current + 1;
  };

  return (
    <div
      ref={scope}
      className="relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {children}

      {images.map((img, index) => (
        <img
          className="pointer-events-none absolute left-0 top-0 h-48 w-auto rounded-xl border-2 border-black bg-neutral-900 object-cover opacity-0"
          src={img}
          alt={`Mouse move image ${index}`}
          key={index}
          data-mouse-move-index={index}
        />
      ))}
    </div>
  );
};