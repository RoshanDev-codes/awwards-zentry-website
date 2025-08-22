import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about">
      <div className="relative mt-36 mb-8 flex flex-col items-center gap-6">
        <h1 className="text-[4rem] max-sm:text-[1.6rem] uppercase font-general">
          Welcome to Zentry
        </h1>

        <p className="font-zentry leading-[1] font-feature-settings:'ss01' lg:text-[5rem] max-lg:text-[4rem] max-sm:text-[3rem] px-[2rem] text-center ">
          Discover the Largest Shared Adventure
        </p>

        <div className="about-subtext">
          <p>The Game of Games begins—your life, now an epic MMORPG</p>
          <p>
            Zentry unites every player from countless games and platforms, both
            digital and physical, into a unified Play Economy
          </p>
        </div>
      </div>

      <div id="clip" className="h-dvh w-screen">
        <div className="mask-clip-path h-[60vh] w-96 md:w-[30vw] absolute left-1/2 -translate-x-1/2 rounded-3xl overflow-hidden z-20">
          <img
            src="img/about.webp"
            alt="about image"
            className="absolute top-0 left-0 size-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
