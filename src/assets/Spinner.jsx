export const Spinner = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            width="100"
            height="100"
            style={{ shapeRendering: "auto", display: "block", background: "transparent" }}
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <g>
                <circle
                    stroke-linecap="round"
                    fill="none"
                    stroke-dasharray="50.26548245743669 50.26548245743669"
                    stroke="#bebfc3"
                    stroke-width="8"
                    r="32"
                    cy="50"
                    cx="50"
                >
                    <animateTransform
                        values="0 50 50;360 50 50"
                        keyTimes="0;1"
                        repeatCount="indefinite"
                        dur="1.3888888888888888s"
                        type="rotate"
                        attributeName="transform"
                    ></animateTransform>
                </circle>
                <circle
                    stroke-linecap="round"
                    fill="none"
                    stroke-dashoffset="36.12831551628262"
                    stroke-dasharray="36.12831551628262 36.12831551628262"
                    stroke="#f8b26a"
                    stroke-width="8"
                    r="23"
                    cy="50"
                    cx="50"
                >
                    <animateTransform
                        values="0 50 50;-360 50 50"
                        keyTimes="0;1"
                        repeatCount="indefinite"
                        dur="1.3888888888888888s"
                        type="rotate"
                        attributeName="transform"
                    ></animateTransform>
                </circle>
                <g></g>
            </g>
        </svg>
    );
};
