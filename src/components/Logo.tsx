/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export default function Logo({ className = "", size = 64, showText = true }: LogoProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {!imgError ? (
        <img
          src="/logo.png"
          alt="Praneeth's Kitchen Logo"
          className="transition-all duration-300 hover:scale-105 object-contain"
          style={{ width: size, height: size }}
          onError={() => setImgError(true)}
          referrerPolicy="no-referrer"
        />
      ) : (
        <svg
          width={size}
          height={size}
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all duration-300 hover:scale-105"
        >
        <defs>
          {/* Rich metallic gold gradient */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFBA6B" />
            <stop offset="30%" stopColor="#C5A059" />
            <stop offset="70%" stopColor="#F3DCA5" />
            <stop offset="100%" stopColor="#9A7B3E" />
          </linearGradient>

          {/* Deep dark charcoal/gold metallic dual drop shadow */}
          <filter id="luxuryGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#DFBA6B" floodOpacity="0.15" />
            <feDropShadow dx="-1" dy="-1" stdDeviation="2" floodColor="#000000" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Outer concentric thin gold ring */}
        <circle
          cx="250"
          cy="250"
          r="230"
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
          strokeDasharray="8, 4"
          opacity="0.5"
        />

        {/* Symmetrical Inner solid gold ring */}
        <circle
          cx="250"
          cy="250"
          r="215"
          stroke="url(#goldGradient)"
          strokeWidth="3.5"
          filter="url(#luxuryGlow)"
        />

        {/* Main PK Lettering Emblem */}
        <g id="letters" filter="url(#luxuryGlow)">
          {/* Letter P (Bold Serif, Black with gold inline or solid black) */}
          <path
            d="M 160,110 L 160,390"
            stroke="#1D1D1D"
            strokeWidth="38"
            strokeLinecap="square"
          />
          <path
            d="M 160,110 L 260,110 C 310,110 340,140 340,195 C 340,250 310,280 260,280 L 160,280"
            fill="none"
            stroke="#1D1D1D"
            strokeWidth="36"
            strokeLinejoin="miter"
          />
          {/* P Inner Gold highlight strip */}
          <path
            d="M 160,110 L 160,390 M 160,110 L 260,110 C 310,110 340,140 340,195 C 340,250 310,280 260,280 L 160,280"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="4"
            opacity="0.9"
          />

          {/* Letter K (Integrated into P loop, Gold) */}
          <path
            d="M 230,230 L 350,110"
            stroke="url(#goldGradient)"
            strokeWidth="34"
            strokeLinecap="round"
          />
          <path
            d="M 235,225 L 360,390"
            stroke="url(#goldGradient)"
            strokeWidth="36"
            strokeLinecap="square"
          />
        </g>

        {/* Left Laurel Branch (Gold leaves celebrating heritage standard) */}
        <g id="laurel-branch" opacity="0.9">
          <path
            d="M 130,290 C 110,260 105,210 115,160"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Leaf 1 */}
          <path d="M 115,160 C 105,150 90,152 82,165 C 80,175 95,180 115,160 Z" fill="url(#goldGradient)" />
          {/* Leaf 2 */}
          <path d="M 111,190 C 95,182 82,190 78,202 C 80,212 98,210 111,190 Z" fill="url(#goldGradient)" />
          {/* Leaf 3 */}
          <path d="M 110,225 C 92,220 81,232 80,245 C 85,252 100,245 110,225 Z" fill="url(#goldGradient)" />
          {/* Leaf 4 */}
          <path d="M 114,260 C 98,260 90,275 92,288 C 98,294 110,282 114,260 Z" fill="url(#goldGradient)" />
          {/* Leaf 5 */}
          <path d="M 124,290 C 112,298 108,315 115,325 C 122,328 130,312 124,290 Z" fill="url(#goldGradient)" />
        </g>

        {/* Right Tech-Lines (Circuit board tracks representing Cloud Kitchen, very clever detail!) */}
        <g id="tech-tracks" stroke="url(#goldGradient)" strokeWidth="3" fill="none" opacity="0.85">
          <path d="M 370,250 L 415,250 L 415,220" />
          <circle cx="415" cy="217" r="5" fill="url(#goldGradient)" />

          <path d="M 360,280 L 390,280 L 415,315" />
          <circle cx="415" cy="318" r="5" fill="url(#goldGradient)" />

          <path d="M 350,310 L 370,310 L 395,345" />
          <circle cx="395" cy="348" r="5" fill="url(#goldGradient)" />

          <path d="M 340,340 L 360,340 L 375,370" />
          <circle cx="375" cy="373" r="5" fill="url(#goldGradient)" />
        </g>

        {/* Elegant Chef Hat sitting atop the P */}
        <g id="chef-hat" filter="url(#luxuryGlow)">
          <path
            d="M 160,110 C 145,85 140,50 170,45 C 195,40 205,60 215,55 C 225,50 245,45 255,65 C 265,50 285,55 285,75 C 285,95 260,105 250,110 Z"
            fill="#FFFFFF"
            stroke="#1D1D1D"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          {/* Hat base */}
          <path
            d="M 160,100 L 250,100 L 245,115 L 165,115 Z"
            fill="url(#goldGradient)"
            stroke="#1D1D1D"
            strokeWidth="4"
          />
        </g>

        {/* Chef Spoon forming upper arm of K */}
        <g id="spoon" filter="url(#luxuryGlow)">
          {/* Oval bowl of the spoon */}
          <ellipse
            cx="370"
            cy="90"
            rx="24"
            ry="14"
            transform="rotate(-40 370 90)"
            fill="#1D1D1D"
            stroke="url(#goldGradient)"
            strokeWidth="3.5"
          />
        </g>

        {/* Bottom Symmetrical crossed fork & spoon/knife ribbon */}
        <g id="bottom-ribbon" stroke="url(#goldGradient)" strokeWidth="2.5" fill="none">
          <path d="M 150,440 L 350,440" />
          {/* Symmetrical dots */}
          <circle cx="130" cy="440" r="4" fill="url(#goldGradient)" />
          <circle cx="370" cy="440" r="4" fill="url(#goldGradient)" />
          {/* Cutlery emblem center */}
          <path d="M 235,425 L 265,455" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 265,425 L 235,455" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="250" cy="440" r="12" fill="#1D1D1D" stroke="url(#goldGradient)" strokeWidth="2" />
          <path d="M 245,435 L 255,445" stroke="#FFFFFF" strokeWidth="2" />
          <path d="M 255,435 L 245,445" stroke="#FFFFFF" strokeWidth="2" />
        </g>
      </svg>
      )}

      {showText && (
        <div className="text-center mt-3 select-none">
          <h1 className="font-serif-elegant font-bold tracking-[0.18em] text-xl sm:text-2xl text-charcoal leading-none uppercase">
            Praneeth's
          </h1>
          <div className="flex items-center justify-center gap-3 mt-1.5">
            <div className="h-[1.5px] w-8 sm:w-12 bg-gold/50" />
            <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.45em] text-gold uppercase font-bold leading-none">
              Kitchen
            </span>
            <div className="h-[1.5px] w-8 sm:w-12 bg-gold/50" />
          </div>
        </div>
      )}
    </div>
  );
}
