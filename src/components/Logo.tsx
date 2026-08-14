/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  variant?: "auto" | "light" | "dark";
}

export default function Logo({ className = "", size = 64, showText = true, variant = "auto" }: LogoProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`inline-flex flex-col items-center justify-center ${className}`}>
      {!imgError ? (
        <div 
          className="relative flex items-center justify-center rounded-xl transition-all duration-300 hover:scale-105 shrink-0"
          style={{ width: size, height: size }}
        >
          <img
            src="/logo.svg"
            alt="Praneeth's Kitchen Logo"
            className="w-full h-full object-contain drop-shadow-md rounded-lg"
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
          className="transition-all duration-300 hover:scale-105 drop-shadow-md shrink-0 select-none"
        >
          <defs>
            {/* Rich metallic gold gradient */}
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FAF0CA" />
              <stop offset="30%" stopColor="#E5C158" />
              <stop offset="70%" stopColor="#F5D77F" />
              <stop offset="100%" stopColor="#9A7B3E" />
            </linearGradient>

            {/* Radial background dark plaque gradient */}
            <radialGradient id="badgeBg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2A2421" />
              <stop offset="70%" stopColor="#181412" />
              <stop offset="100%" stopColor="#0D0B0A" />
            </radialGradient>

            {/* Subtle inner gold shine */}
            <linearGradient id="shineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* Drop shadow for inner elements */}
            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000000" floodOpacity="0.7" />
              <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#E5C158" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Outer Royal Dark Crest Badge Circle */}
          <circle
            cx="250"
            cy="250"
            r="235"
            fill="url(#badgeBg)"
            stroke="url(#goldGradient)"
            strokeWidth="9"
            filter="url(#goldGlow)"
          />

          {/* Secondary Concentric Golden Ring */}
          <circle
            cx="250"
            cy="250"
            r="218"
            stroke="url(#goldGradient)"
            strokeWidth="2.5"
            strokeDasharray="8, 5"
            opacity="0.85"
          />

          {/* Glass Highlight Arch */}
          <path
            d="M 32,250 A 218,218 0 0,1 468,250 Z"
            fill="url(#shineGradient)"
            pointerEvents="none"
          />

          {/* --- TOP CHEF HAT EMBLEM --- */}
          <g id="crown" filter="url(#goldGlow)">
            <path
              d="M 185,110 C 160,65 205,38 228,62 C 242,38 272,38 286,62 C 308,38 352,65 327,110 Z"
              fill="#FFFFFF"
              stroke="url(#goldGradient)"
              strokeWidth="4.5"
              strokeLinejoin="round"
            />
            <rect
              x="180"
              y="105"
              width="140"
              height="18"
              rx="4"
              fill="url(#goldGradient)"
              stroke="#0D0B0A"
              strokeWidth="2.5"
            />
            <circle cx="210" cy="114" r="3" fill="#DC2626" />
            <circle cx="250" cy="114" r="4" fill="#FFFFFF" />
            <circle cx="290" cy="114" r="3" fill="#DC2626" />
          </g>

          {/* --- CENTRAL MONOGRAM PK --- */}
          <g id="monogram" filter="url(#goldGlow)">
            {/* Letter P */}
            <path
              d="M 145,145 L 145,320 M 145,145 L 220,145 C 258,145 278,162 278,198 C 278,235 258,252 220,252 L 145,252"
              fill="none"
              stroke="url(#goldGradient)"
              strokeWidth="28"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 145,145 L 145,320 M 145,145 L 220,145 C 258,145 278,162 278,198 C 278,235 258,252 220,252 L 145,252"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            />

            {/* Letter K */}
            <path
              d="M 215,225 L 325,145"
              stroke="url(#goldGradient)"
              strokeWidth="28"
              strokeLinecap="round"
            />
            <path
              d="M 215,215 L 330,320"
              stroke="url(#goldGradient)"
              strokeWidth="28"
              strokeLinecap="round"
            />
            <path
              d="M 215,225 L 325,145 M 215,215 L 330,320"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.85"
            />
          </g>

          {/* --- LAUREL LEAVES --- */}
          <g id="laurels" opacity="0.9" filter="url(#goldGlow)">
            <path d="M 90,190 C 75,225 75,270 90,305" stroke="url(#goldGradient)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M 80,198 C 65,193 55,208 70,218 C 80,218 85,203 80,198 Z" fill="url(#goldGradient)" />
            <path d="M 73,235 C 57,233 50,250 65,257 C 75,255 77,243 73,235 Z" fill="url(#goldGradient)" />
            <path d="M 75,272 C 60,274 55,290 70,294 C 77,292 77,280 75,272 Z" fill="url(#goldGradient)" />

            <path d="M 410,190 C 425,225 425,270 410,305" stroke="url(#goldGradient)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M 420,198 C 435,193 445,208 430,218 C 420,218 415,203 420,198 Z" fill="url(#goldGradient)" />
            <path d="M 427,235 C 443,233 450,250 435,257 C 425,255 423,243 427,235 Z" fill="url(#goldGradient)" />
            <path d="M 425,272 C 440,274 445,290 430,294 C 423,292 423,280 425,272 Z" fill="url(#goldGradient)" />
          </g>

          {/* --- BOTTOM CURVED BANNER --- */}
          <g id="ribbon" filter="url(#goldGlow)">
            <rect
              x="75"
              y="350"
              width="350"
              height="52"
              rx="26"
              fill="#0D0B0A"
              stroke="url(#goldGradient)"
              strokeWidth="3.5"
            />
            <circle cx="105" cy="376" r="4.5" fill="url(#goldGradient)" />
            <circle cx="395" cy="376" r="4.5" fill="url(#goldGradient)" />

            <text
              x="250"
              y="383"
              textAnchor="middle"
              fill="url(#goldGradient)"
              fontSize="19"
              fontWeight="900"
              fontFamily="Georgia, serif"
              letterSpacing="2.5"
            >
              PRANEETH'S KITCHEN
            </text>
          </g>

          {/* Tagline */}
          <text
            x="250"
            y="432"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="12"
            fontWeight="700"
            fontFamily="sans-serif"
            letterSpacing="4"
            opacity="0.9"
          >
            EST. 2024 • TELANGANA
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

