import React from "react";

export function MainLogo() {
  return (
    <svg
      width="36"
      height="32"
      viewBox="0 0 36 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="3" cy="29" r="3" fill="black" />
      <circle cx="23" cy="29" r="3" fill="black" />
      <circle cx="13" cy="3" r="3" fill="black" />
      <circle cx="33" cy="3" r="3" fill="black" />
      <line
        x1="3.06665"
        y1="28.641"
        x2="13.0667"
        y2="2.64102"
        stroke="black"
        strokeWidth="2"
      />
      <line
        x1="22.0667"
        y1="30.641"
        x2="32.0667"
        y2="4.64102"
        stroke="black"
        strokeWidth="2"
      />
      <line
        y1="-1"
        x2="27.8568"
        y2="-1"
        transform="matrix(0.358979 0.933346 0.933346 -0.358979 14 3)"
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  );
}
