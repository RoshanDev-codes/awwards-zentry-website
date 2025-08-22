import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";
import gsap from "gsap";

const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { y: currentScroll } = useWindowScroll();

  useEffect(() => {
    if (currentScroll === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScroll > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScroll < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }
    setLastScrollY(currentScroll);
  }, [currentScroll, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  });

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);

  return (
    <div
      ref={navContainerRef}
      className="fixed z-50 inset-x-0 sm:inset-x-6 h-16 top-4 border-none transition-all duration-500"
    >
      <header className="absolute top-1/2 -translate-y-1/2 w-full">
        <nav className="flex justify-between items-center p-5">
          <div className="flex items-center gap-7">
            <img src="img/logo.png" alt="logo" className="w-10" />

            <Button
              id="products-button"
              title="Products"
              rightIcon={<TiLocationArrow className="scale-125 mb-[2px]" />}
            />
          </div>

          <div className="flex items-center">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn tracking-wider"
                >
                  {item}
                </a>
              ))}
            </div>

            <button
              onClick={toggleAudioIndicator}
              className="ml-10 flex items-center space-x-0.5 scale-[2] md:mr-5"
            >
              <audio
                ref={audioElementRef}
                src="audio/loop.mp3"
                loop
                className="hidden"
              />

              {[1, 2, 3, 4].map((bar, index) => (
                <div
                  key={index}
                  className={`indicator-line ${
                    isIndicatorActive ? "active" : null
                  }`}
                  style={{ animationDelay: `${bar * 0.1}s` }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
