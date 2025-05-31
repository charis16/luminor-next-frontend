import * as React from "react";

import { IconSvgProps } from "@/types";

export const Logo: React.FC<IconSvgProps> = ({
  size = 36,
  width,
  height,
  ...props
}) => (
  <svg
    fill="none"
    height={size || height}
    viewBox="0 0 32 32"
    width={size || width}
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const InstagramIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      className="text-white"
      fill="none"
      height={size || height}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width={width || size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect height="20" rx="5" ry="5" width="20" x="2" y="2" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
};
export const TikTokIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      fill="#fff"
      height={size || height}
      viewBox="0 0 24 24"
      width={width || size}
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
    </svg>
  );
};

export const YoutubeIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      fill="#fff"
      height={size || height}
      viewBox="0 0 24 24"
      width={width || size}
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M19.615 3.184A3.001 3.001 0 0 0 17.643 2H6.357a3.001 3.001 0 0 0-1.972 1.184C3.5 4.228 3 6.007 3 8v8c0 1.993.5 3.772 1.385 4.816A3.001 3.001 0 0 0 6.357 22h11.286a3.001 3.001 0 0 0 1.972-1.184C20.5 19.772 21 17.993 21 16V8c0-1.993-.5-3.772-1.385-4.816zM10 15.5v-7l6 3.5-6 3.5z" />
    </svg>
  );
};

export const WhatsappIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      version="1.1"
      viewBox="0 0 256 256"
      width={width || size}
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <g
        style={{
          stroke: "none",
          strokeWidth: 0,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          strokeMiterlimit: 10,
          fill: "none",
          fillRule: "nonzero",
          opacity: 1,
        }}
        transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
      >
        <circle
          cx="45"
          cy="45"
          r="45"
          style={{
            stroke: "none",
            strokeWidth: 1,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            strokeMiterlimit: 10,
            fillRule: "nonzero",
            opacity: 1,
          }}
          transform="  matrix(1 0 0 1 0 0) "
        />
        <path
          d="M 16.138 44.738 c -0.002 5.106 1.332 10.091 3.869 14.485 l -4.112 15.013 l 15.365 -4.029 c 4.233 2.309 8.999 3.525 13.85 3.527 h 0.012 c 15.973 0 28.976 -12.999 28.983 -28.974 c 0.003 -7.742 -3.01 -15.022 -8.481 -20.498 c -5.472 -5.476 -12.749 -8.494 -20.502 -8.497 C 29.146 15.765 16.145 28.762 16.138 44.738 M 25.288 58.466 l -0.574 -0.911 c -2.412 -3.834 -3.685 -8.266 -3.683 -12.816 c 0.005 -13.278 10.811 -24.081 24.099 -24.081 c 6.435 0.003 12.482 2.511 17.031 7.062 c 4.548 4.552 7.051 10.603 7.05 17.037 C 69.205 58.036 58.399 68.84 45.121 68.84 h -0.009 c -4.323 -0.003 -8.563 -1.163 -12.261 -3.357 l -0.88 -0.522 l -9.118 2.391 L 25.288 58.466 z M 45.122 73.734 L 45.122 73.734 L 45.122 73.734 C 45.122 73.734 45.121 73.734 45.122 73.734"
          strokeLinecap="round"
          style={{
            stroke: "none",
            strokeWidth: 1,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            strokeMiterlimit: 10,
            fill: "rgb(255,255,255)",
            fillRule: "nonzero",
            opacity: 1,
          }}
          transform=" matrix(1 0 0 1 0 0) "
        />
        <path
          d="M 37.878 32.624 c -0.543 -1.206 -1.113 -1.23 -1.63 -1.251 c -0.422 -0.018 -0.905 -0.017 -1.388 -0.017 c -0.483 0 -1.268 0.181 -1.931 0.906 c -0.664 0.725 -2.535 2.477 -2.535 6.039 c 0 3.563 2.595 7.006 2.957 7.49 c 0.362 0.483 5.01 8.028 12.37 10.931 c 6.118 2.412 7.362 1.933 8.69 1.812 c 1.328 -0.121 4.285 -1.751 4.888 -3.442 c 0.604 -1.691 0.604 -3.14 0.423 -3.443 c -0.181 -0.302 -0.664 -0.483 -1.388 -0.845 c -0.724 -0.362 -4.285 -2.114 -4.948 -2.356 c -0.664 -0.241 -1.147 -0.362 -1.63 0.363 c -0.483 0.724 -1.87 2.355 -2.292 2.838 c -0.422 0.484 -0.845 0.544 -1.569 0.182 c -0.724 -0.363 -3.057 -1.127 -5.824 -3.594 c -2.153 -1.92 -3.606 -4.29 -4.029 -5.015 c -0.422 -0.724 -0.045 -1.116 0.318 -1.477 c 0.325 -0.324 0.724 -0.846 1.087 -1.268 c 0.361 -0.423 0.482 -0.725 0.723 -1.208 c 0.242 -0.483 0.121 -0.906 -0.06 -1.269 C 39.929 37.637 38.522 34.056 37.878 32.624"
          strokeLinecap="round"
          style={{
            stroke: "none",
            strokeWidth: 1,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            strokeMiterlimit: 10,
            fill: "rgb(255,255,255)",
            fillRule: "nonzero",
            opacity: 1,
          }}
          transform=" matrix(1 0 0 1 0 0) "
        />
      </g>
    </svg>
  );
};
