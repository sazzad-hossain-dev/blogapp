const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <svg
                className="pl"
                viewBox="0 0 160 160"
                width="160px"
                height="160px"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#000"></stop>
                        <stop offset="100%" stopColor="#fff"></stop>
                    </linearGradient>
                    <mask id="mask1">
                        <rect
                            x="0"
                            y="0"
                            width="160"
                            height="160"
                            fill="url(#grad)"
                        ></rect>
                    </mask>
                    <mask id="mask2">
                        <rect
                            x="28"
                            y="28"
                            width="104"
                            height="104"
                            fill="url(#grad)"
                        ></rect>
                    </mask>
                </defs>

                <g>
                    <g className="pl__ring-rotate">
                        <circle
                            className="pl__ring-stroke"
                            cx="80"
                            cy="80"
                            r="72"
                            fill="none"
                            stroke="hsl(223,90%,55%)"
                            strokeWidth="16"
                            strokeDasharray="452.39 452.39"
                            strokeDashoffset="452"
                            strokeLinecap="round"
                            transform="rotate(-45,80,80)"
                        ></circle>
                    </g>
                </g>
                <g mask="url(#mask1)">
                    <g className="pl__ring-rotate">
                        <circle
                            className="pl__ring-stroke"
                            cx="80"
                            cy="80"
                            r="72"
                            fill="none"
                            stroke="hsl(193,90%,55%)"
                            strokeWidth="16"
                            strokeDasharray="452.39 452.39"
                            strokeDashoffset="452"
                            strokeLinecap="round"
                            transform="rotate(-45,80,80)"
                        ></circle>
                    </g>
                </g>

                <g>
                    <g
                        strokeWidth="4"
                        strokeDasharray="12 12"
                        strokeDashoffset="12"
                        strokeLinecap="round"
                        transform="translate(80,80)"
                    >
                        <polyline
                            className="pl__tick"
                            stroke="hsl(223,10%,90%)"
                            points="0,2 0,14"
                            transform="rotate(-135,0,0) translate(0,40)"
                        ></polyline>
                        <polyline
                            className="pl__tick"
                            stroke="hsl(223,10%,90%)"
                            points="0,2 0,14"
                            transform="rotate(-90,0,0) translate(0,40)"
                        ></polyline>
                        <polyline
                            className="pl__tick"
                            stroke="hsl(223,10%,90%)"
                            points="0,2 0,14"
                            transform="rotate(-45,0,0) translate(0,40)"
                        ></polyline>
                        <polyline
                            className="pl__tick"
                            stroke="hsl(223,10%,90%)"
                            points="0,2 0,14"
                            transform="rotate(0,0,0) translate(0,40)"
                        ></polyline>
                        <polyline
                            className="pl__tick"
                            stroke="hsl(223,10%,90%)"
                            points="0,2 0,14"
                            transform="rotate(45,0,0) translate(0,40)"
                        ></polyline>
                        <polyline
                            className="pl__tick"
                            stroke="hsl(223,10%,90%)"
                            points="0,2 0,14"
                            transform="rotate(90,0,0) translate(0,40)"
                        ></polyline>
                        <polyline
                            className="pl__tick"
                            stroke="hsl(223,10%,90%)"
                            points="0,2 0,14"
                            transform="rotate(135,0,0) translate(0,40)"
                        ></polyline>
                        <polyline
                            className="pl__tick"
                            stroke="hsl(223,10%,90%)"
                            points="0,2 0,14"
                            transform="rotate(180,0,0) translate(0,40)"
                        ></polyline>
                    </g>
                </g>
                <g mask="url(#mask1)">
                    <g
                        strokeWidth="4"
                        strokeDasharray="12 12"
                        strokeDashoffset="12"
                        strokeLinecap="round"
                        transform="translate(80,80)"
                    >
                        <polyline
                            className="pl__tick"
                            stroke="hsl(223,90%,80%)"
                            points="0,2 0,14"
                            transform="rotate(-135,0,0) translate(0,40)"
                        ></polyline>
                        <polyline
                            className="pl__tick"
                            stroke="hsl(223,90%,80%)"
                            points="0,2 0,14"
                            transform="rotate(-90,0,0) translate(0,40)"
                        ></polyline>
                        <polyline
                            className="pl__tick"
                            stroke="hsl(223,90%,80%)"
                            points="0,2 0,14"
                            transform="rotate(-45,0,0) translate(0,40)"
                        ></polyline>
                        <polyline
                            className="pl__tick"
                            stroke="hsl(223,90%,80%)"
                            points="0,2 0,14"
                            transform="rotate(0,0,0) translate(0,40)"
                        ></polyline>
                        <polyline
                            className="pl__tick"
                            stroke="hsl(223,90%,80%)"
                            points="0,2 0,14"
                            transform="rotate(45,0,0) translate(0,40)"
                        ></polyline>
                        <polyline
                            className="pl__tick"
                            stroke="hsl(223,90%,80%)"
                            points="0,2 0,14"
                            transform="rotate(90,0,0) translate(0,40)"
                        ></polyline>
                        <polyline
                            className="pl__tick"
                            stroke="hsl(223,90%,80%)"
                            points="0,2 0,14"
                            transform="rotate(135,0,0) translate(0,40)"
                        ></polyline>
                        <polyline
                            className="pl__tick"
                            stroke="hsl(223,90%,80%)"
                            points="0,2 0,14"
                            transform="rotate(180,0,0) translate(0,40)"
                        ></polyline>
                    </g>
                </g>
            </svg>
        </div>
    );
};

export default LoadingSpinner;
