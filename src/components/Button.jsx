import React from "react";

const Button = ({ id, title, leftIcon, rightIcon, containerClass }) => {
  return (
    <button
      id={id}
      className={`relative z-10 w-fit bg-violet-50 flex justify-center items-center gap-2 px-7 py-3 rounded-full text-black ${containerClass} `}
    >
      {leftIcon}
      <span className="relative uppercase font-general tracking-wider text-sm">
        <div>{title}</div>
      </span>
      {rightIcon}
    </button>
  );
};

export default Button;
