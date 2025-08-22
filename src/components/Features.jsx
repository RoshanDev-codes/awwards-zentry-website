import React, { useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

const BentoTilt = ({ className, children }) => {
  const [transformStyle, setTransformStyle] = useState("");

  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const { top, left, width, height } =
      cardRef.current.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.95,0.95,0.95)`;

    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      style={{ transform: transformStyle }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </div>
  );
};

const BentoCard = ({ src, title, description }) => {
  return (
    <div id="vault" className="relative size-full">
      <video
        src={src}
        loop
        autoPlay
        muted
        className="absolute top-0 left-0 size-full object-cover object-center"
      />

      <div
        id="prologue"
        className="relative z-10 p-4 text-blue-75 flex flex-col justify-between"
      >
        <h1 className="text-4xl md:text-6xl uppercase tracking-wide font-zentry [font-feature-settings:'ss01'] ">
          {title}
        </h1>
        {description && <p className="max-w-64 mt-3">{description}</p>}
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <div id="nexus" className="bg-black pb-52">
      <div className="container mx-auto px-3 sm:px-10">
        <div className="px-3 py-32">
          <p className="text-lg font-circular-web text-blue-75">
            Into the Metagame Layer
          </p>
          <p className="text-lg font-circular-web text-blue-75 opacity-50 max-w-md mt-2">
            Immerse yourself in a rich and ever-expanding universe where a
            vibrant array of products converge into an interconnected overlay
            experience on your world.
          </p>
        </div>

        <BentoTilt className="border-hsla transition-transform duration-300 ease-out h-[60vh] max-sm:h-[40vh] mb-8 w-full rounded-md overflow-hidden">
          <BentoCard
            src="videos/feature-1.mp4"
            title={<>radiant</>}
            description="A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure."
          />
        </BentoTilt>

        <div className="border-hsla h-[135vh] w-full grid grid-cols-2 grid-rows-3 gap-7">
          <BentoTilt className="bento-tilt_1 md:col-span-1 row-span-1 md:row-span-2">
            <BentoCard
              src="videos/feature-2.mp4"
              title={<>zigma</>}
              description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 md:col-span-1 row-span-1 ms-32 md:ms-0">
            <BentoCard
              src="videos/feature-3.mp4"
              title={<>azul</>}
              description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
            />
          </BentoTilt>

          <BentoTilt
            id="nexus"
            className="bento-tilt_1 md:col-span-1 row-span-1 me-16 md:me-0"
          >
            <BentoCard
              src="videos/feature-4.mp4"
              title={<>nexus</>}
              description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_2 size-full bg-violet-300">
            <div className="flex p-4 flex-col justify-between size-full">
              <h2 className="md:text-6xl text-3xl max-w-64 font-zentry [font-feature-settings:'ss01'] ">
                More Coming Soon.
              </h2>
              <TiLocationArrow className="self-end scale-[5] m-4" />
            </div>
          </BentoTilt>

          <BentoTilt className="bento-tilt_2 size-full">
            <video
              src="videos/feature-5.mp4"
              loop
              muted
              autoPlay
              className="absolute size-full top-0 left-0 object-cover object-center"
            />
          </BentoTilt>
        </div>
      </div>
    </div>
  );
};

export default Features;
