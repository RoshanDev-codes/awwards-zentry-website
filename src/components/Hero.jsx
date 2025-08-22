import { useGSAP } from "@gsap/react";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Button from "./Button";
import { TiLocation, TiLocationArrow } from "react-icons/ti";
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(4);
  const [hasClicked, setHasClicked] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  const nextVideoRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  const handleMiniVideoClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
    setHasClicked(true);
  };

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          scale: 1,
          duration: 1,
          ease: "power1.inOut",
          transformOrigin: "center center",
          width: "100%",
          height: "100%",
          onStart: () => nextVideoRef.current.play(),
        });

        gsap.from("#current-video", {
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
          transformOrigin: "center center",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0 0 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading && (
        <div className="absolute z-[100] size-full flex justify-center items-center bg-blue-75">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}
      <div
        id="video-frame"
        className="relative h-dvh w-screen overflow-hidden z-10 rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path size-64 max-sm:size-48 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-lg cursor-pointer overflow-hidden z-50">
            <div
              onClick={handleMiniVideoClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                src={getVideoSrc((currentIndex % totalVideos) + 1)}
                id="current-video"
                loop
                muted
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>

          <video
            src={getVideoSrc(currentIndex)}
            id="next-video"
            ref={nextVideoRef}
            muted
            loop
            className="size-64 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover object-center invisible z-20"
            onLoadedData={handleVideoLoad}
          />

          <video
            src={getVideoSrc(currentIndex)}
            muted
            loop
            autoPlay
            className="absolute top-0 left-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        <h1 className="absolute z-40 text-5xl sm:text-7xl md:text-9xl lg:text-[12rem] text-blue-75 font-zentry [font-feature-settings:'ss01'] right-5 bottom-5 sm:right-10">
          Gaming
        </h1>

        <div className="absolute z-40 top-0 left-0 size-full">
          <div className="mt-28 px-5 sm:px-10">
            <h1 className="text-5xl sm:text-7xl md:text-9xl lg:text-[12rem] text-blue-100 font-zentry [font-feature-settings:'ss01']">
              Redefine
            </h1>

            <p className="text-blue-100 mb-5 font-robert-regular max-w-64">
              Enter the Metagame Layer <br />
              Unleash the Play Economy
            </p>

            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow className="scale-125" />}
              containerClass="!bg-yellow-300"
            />
          </div>
        </div>
      </div>

      <h1 className="absolute text-5xl sm:text-7xl md:text-9xl lg:text-[12rem] text-black font-zentry [font-feature-settings:'ss01'] right-5 bottom-5 sm:right-10">
        Gaming
      </h1>
    </div>
  );
};

export default Hero;
