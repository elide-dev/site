import * as React from "react";

export default function Gradients() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable={false} style={{ width: 0, height: 0, position: 'absolute' }}>
        <defs>
          {/* Gradient: Grays */}
          <linearGradient id="grays-0" x1="0" x2="0" y1="0" y2="1" gradientTransform="rotate(0)">
            <stop offset="50%" stopColor="rgba(177, 177, 177, 1)" />
            <stop offset="50%" stopColor="rgba(181, 181, 181, 1)" />
            <stop offset="100%" stopColor="rgba(208, 208, 208, 1)" />
          </linearGradient>
          <linearGradient id="grays-1" x1="0" x2="0" y1="0" y2="1" gradientTransform="rotate(0)">
            <stop offset="0%" stopColor="rgba(177, 177, 177, 1)" />
            <stop offset="50%" stopColor="rgba(181, 181, 181, 1)" />
            <stop offset="100%" stopColor="rgba(200, 200, 200, 1)" />
          </linearGradient>
          <linearGradient id="grays-2" x1="0" x2="0" y1="0" y2="1" gradientTransform="rotate(-55.1153)">
            <stop offset="0%" stopColor="rgba(181, 181, 181, 1)" />
            <stop offset="43%" stopColor="rgba(182, 182, 182, 1)" />
            <stop offset="100%" stopColor="rgba(206, 206, 206, 1)" />
          </linearGradient>

          {/* Gradient: Colors */}
          <linearGradient id="colors-0" x1="0" x2="0" y1="0" y2="1" gradientTransform="rotate(0)">
            <stop offset="43%" stopColor="rgba(90, 0, 255, 1)" />
            <stop offset="54%" stopColor="rgba(93, 0, 254, 1)" />
            <stop offset="64%" stopColor="rgba(103, 0, 252, 1)" />
            <stop offset="72%" stopColor="rgba(120, 0, 249, 1)" />
            <stop offset="80%" stopColor="rgba(144, 0, 245, 1)" />
            <stop offset="88%" stopColor="rgba(176, 0, 239, 1)" />
          </linearGradient>
          <linearGradient id="colors-1" x1="0" x2="0" y1="0" y2="1" gradientTransform="rotate(-80.119)">
            <stop offset="43%" stopColor="rgba(90, 0, 255, 1)" />
            <stop offset="54%" stopColor="rgba(93, 0, 254, 1)" />
            <stop offset="64%" stopColor="rgba(103, 0, 252, 1)" />
            <stop offset="72%" stopColor="rgba(120, 0, 249, 1)" />
            <stop offset="80%" stopColor="rgba(144, 0, 245, 1)" />
            <stop offset="88%" stopColor="rgba(176, 0, 239, 1)" />
          </linearGradient>
          <linearGradient id="colors-2" x1="0" x2="0" y1="0" y2="1" gradientTransform="rotate(-55.1153)">
            <stop offset="0%" stopColor="rgba(90, 0, 255, 1)" />
            <stop offset="11%" stopColor="rgba(100, 0, 241, 1)" />
            <stop offset="47%" stopColor="rgba(135, 6, 196, 1)" />
            <stop offset="100%" stopColor="rgba(173, 11, 147, 1)" />
          </linearGradient>
        </defs>
      </svg>
    )
}
