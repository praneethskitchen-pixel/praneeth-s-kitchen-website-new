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
    <div className={`inline-flex flex-col items-center justify-center ${className}`}>
      {!imgError ? (
        <div 
          className="relative flex items-center justify-center rounded-xl bg-charcoal p-1.5 border border-gold/60 shadow-md transition-all duration-300 hover:scale-105 hover:border-gold hover:shadow-gold/20 overflow-hidden shrink-0"
          style={{ width: size, height: size }}
        >
          <img
            src="/logo.png"
            alt="Praneeth's Kitchen Logo"
            className="w-full h-full object-contain rounded-lg"
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <svg
          width={size}
          height={size}
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all duration-300 hover:scale-105 drop-shadow-md shrink-0"
        >
          <defs>
            {/* Rich metallic gold gradient */}
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9E29B" />
              <stop offset="35%" stopColor="#E5C158" />
              <stop offset="70%" stopColor="#F5D77F" />
              <stop offset="100%" stopColor="#A68331" />
            </linearGradient>

            {/* Radial background dark plaque gradient */}
            <radialGradient id="badgeBg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#221E1B" />
              <stop offset="70%" stopColor="#151311" />
              <stop offset="100%" stopColor="#0B0A09" />
            </radialGradient>

            {/* Subtle inner gold shine */}
            <linearGradient id="shineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* Drop shadow for inner elements */}
            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.8" />
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#E5C158" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Solid Royal Dark Badge Base Circle */}
          <circle
            cx="250"
            cy="250"
            r="240"
            fill="url(#badgeBg)"
            stroke="url(#goldGradient)"
            strokeWidth="10"
            filter="url(#goldGlow)"
          />

          {/* Secondary Concentric Dashed Golden Ring */}
          <circle
            cx="250"
            cy="250"
            r="224"
            stroke="url(#goldGradient)"
            strokeWidth="3"
            strokeDasharray="10, 6"
            opacity="0.85"
          />

          {/* Top Half Arch Glass Shine */}
          <path
            d="M 26,250 A 224,224 0 0,1 474,250 Z"
            fill="url(#shineGradient)"
            pointerEvents="none"
          />

          {/* --- TOP CHEF CROWN EMBLEM --- */}
          <g id="crown" filter="url(#goldGlow)">
            {/* White/Gold Puff Topping */}
            <path
              d="M 185,95 C 160,50 205,25 228,52 C 242,28 272,28 286,52 C 308,25 352,50 327,95 Z"
              fill="#FFFFFF"
              stroke="url(#goldGradient)"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            {/* Crown Base Band */}
            <rect
              x="180"
              y="90"
              width="150"
              height="20"
              rx="4"
              fill="url(#goldGradient)"
              stroke="#0B0A09"
              strokeWidth="3"
            />
            {/* Small red/gold jewel accent dots */}
            <circle cx="210" cy="100" r="3.5" fill="#DC2626" />
            <circle cx="250" cy="100" r="4.5" fill="#FFFFFF" />
            <circle cx="290" cy="100" r="3.5" fill="#DC2626" />
          </g>

          {/* --- CENTRAL BOLD PK MONOGRAM --- */}
          <g id="monogram" filter="url(#goldGlow)">
            {/* Letter P Stem & Loop */}
            <path
              d="M 140,135 L 140,325 M 140,135 L 225,135 C 265,135 285,155 285,192 C 285,230 265,250 225,250 L 140,250"
              fill="none"
              stroke="url(#goldGradient)"
              strokeWidth="32"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Letter P White/Light Highlight Center Strip */}
            <path
              d="M 140,135 L 140,325 M 140,135 L 225,135 C 265,135 285,155 285,192 C 285,230 265,250 225,250 L 140,250"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            />

            {/* Letter K Diagonal Arms */}
            <path
              d="M 220,220 L 335,135"
              stroke="url(#goldGradient)"
              strokeWidth="32"
              strokeLinecap="round"
            />
            <path
              d="M 220,210 L 340,325"
              stroke="url(#goldGradient)"
              strokeWidth="32"
              strokeLinecap="round"
            />
            {/* Letter K White Highlight */}
            <path
              d="M 220,220 L 335,135 M 220,210 L 340,325"
              stroke="#FFFFFF"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.85"
            />
          </g>

          {/* --- LEFT & RIGHT LAUREL WREATH BRANCHES --- */}
          <g id="laurels" opacity="0.9" filter="url(#goldGlow)">
            {/* Left Laurel Leaves */}
            <path d="M 85,180 C 70,220 70,270 85,310" stroke="url(#goldGradient)" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 75,190 C 60,185 50,200 65,210 C 75,210 80,195 75,190 Z" fill="url(#goldGradient)" />
            <path d="M 68,230 C 52,228 45,245 60,252 C 70,250 72,238 68,230 Z" fill="url(#goldGradient)" />
            <path d="M 70,270 C 55,272 50,288 65,292 C 72,290 72,278 70,270 Z" fill="url(#goldGradient)" />

            {/* Right Laurel Leaves */}
            <path d="M 415,180 C 430,220 430,270 415,310" stroke="url(#goldGradient)" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 425,190 C 440,185 450,200 435,210 C 425,210 420,195 425,190 Z" fill="url(#goldGradient)" />
            <path d="M 432,230 C 448,228 455,245 440,252 C 430,250 428,238 432,230 Z" fill="url(#goldGradient)" />
            <path d="M 430,270 C 445,272 450,288 435,292 C 428,290 428,278 430,270 Z" fill="url(#goldGradient)" />
          </g>

          {/* --- BOTTOM CURVED BRAND RIBBON BANNER --- */}
          <g id="ribbon" filter="url(#goldGlow)">
            <rect
              x="75"
              y="355"
              width="350"
              height="55"
              rx="27.5"
              fill="#0B0A09"
              stroke="url(#goldGradient)"
              strokeWidth="4"
            />
            {/* Banner Side Accents */}
            <circle cx="105" cy="382.5" r="5" fill="url(#goldGradient)" />
            <circle cx="395" cy="382.5" r="5" fill="url(#goldGradient)" />

            {/* Brand Text */}
            <text
              x="250"
              y="390"
              textAnchor="middle"
              fill="url(#goldGradient)"
              fontSize="20"
              fontWeight="900"
              fontFamily="Georgia, serif"
              letterSpacing="3"
            >
              PRANEETH'S KITCHEN
            </text>
          </g>

          {/* Bottom Heritage Tagline */}
          <text
            x="250"
            y="435"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="12"
            fontWeight="700"
            fontFamily="monospace"
            letterSpacing="5"
            opacity="0.9"
          >
            EST. 2024 • HYDERABAD
          </text>
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

