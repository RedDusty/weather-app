import React from 'react';

const Loading: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="200px"
      height="200px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
			style={{margin: 'auto', background: 'transparent', display: 'block'}}
    >
      <circle
        cx="50"
        cy="50"
        r="0"
        fill="none"
        stroke="#ffffff"
        strokeWidth="3"
      >
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="1s"
          values="0;40"
          keyTimes="0;1"
          keySplines="0 0.2 0.8 1"
          calcMode="spline"
          begin="0s"
        ></animate>
        <animate
          attributeName="opacity"
          repeatCount="indefinite"
          dur="1s"
          values="1;0"
          keyTimes="0;1"
          keySplines="0.2 0 0.8 1"
          calcMode="spline"
          begin="0s"
        ></animate>
      </circle>
      <circle
        cx="50"
        cy="50"
        r="0"
        fill="none"
        stroke="#000000"
        strokeWidth="3"
      >
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="1s"
          values="0;40"
          keyTimes="0;1"
          keySplines="0 0.2 0.8 1"
          calcMode="spline"
          begin="-0.5s"
        ></animate>
        <animate
          attributeName="opacity"
          repeatCount="indefinite"
          dur="1s"
          values="1;0"
          keyTimes="0;1"
          keySplines="0.2 0 0.8 1"
          calcMode="spline"
          begin="-0.5s"
        ></animate>
      </circle>
    </svg>
  );
};
export default Loading;
