/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  lightText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  showText = true,
  size = 'md',
  lightText = true,
}) => {
  // Dimension mappings based on size
  const shieldDimensions = {
    sm: { width: 36, height: 40 },
    md: { width: 64, height: 72 },
    lg: { width: 110, height: 125 },
    xl: { width: 160, height: 180 },
  };

  const currentShield = shieldDimensions[size];

  return (
    <div className={`flex flex-col items-center justify-center ${className}`} id="niic-logo-container">
      {/* High-Fidelity SVG Shield Logo matching the Navodaya brand image */}
      <svg
        width={currentShield.width}
        height={currentShield.height}
        viewBox="0 0 110 125"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_8px_16px_rgba(30,58,138,0.3)] select-none hover:scale-105 transition-transform duration-300"
        id="niic-shield-svg"
      >
        <defs>
          {/* Main Shield Gradient (Deep blue to vibrant royal blue) */}
          <linearGradient id="shieldGrad" x1="55" y1="5" x2="55" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="60%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>

          {/* Border highlight for 3D metallic feel */}
          <linearGradient id="shieldBorderGrad" x1="55" y1="0" x2="55" y2="125" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.9" />
          </linearGradient>

          {/* Red/Orange Sun Inner Gradient */}
          <radialGradient id="sunGrad" cx="90" cy="27" r="10" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF8A00" />
            <stop offset="60%" stopColor="#FF3D00" />
            <stop offset="100%" stopColor="#D50000" />
          </radialGradient>

          {/* Drop shadow filter for elements */}
          <filter id="logoShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="3" stdDeviation="2" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* 3D Curved Outer Shield Base */}
        <path
          d="M55 5 C85 5, 102 12, 102 38 C102 70, 78 108, 55 120 C32 108, 8 70, 8 38 C8 12, 25 5, 55 5 Z"
          fill="url(#shieldGrad)"
          stroke="url(#shieldBorderGrad)"
          strokeWidth="3.5"
          filter="url(#logoShadow)"
        />

        {/* Outer Shadow Groove */}
        <path
          d="M55 10 C81 10, 96 16, 96 40 C96 68, 75 102, 55 113 C35 102, 14 68, 14 40 C14 16, 29 10, 55 10 Z"
          stroke="#172554"
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />

        {/* Stylized White 'N' Element inside the Shield */}
        {/* Drawn to precisely resemble the bold Capital N character from the logo */}
        <path
          d="M30 35 L42 35 L68 74 L68 45 L80 45 L80 92 L68 92 L42 53 L42 92 L30 92 Z"
          fill="#FFFFFF"
          className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
        />

        {/* Distinct Red/Orange Sun on the Top Right of the 'N' */}
        <circle cx="74" cy="28" r="9.5" fill="url(#sunGrad)" className="drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />

        {/* Radiating Sunbeams around the circle (5 small elegant yellow beams calibrated around (74, 28)) */}
        <line x1="74" y1="15" x2="74" y2="9" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
        <line x1="80.5" y1="16.7" x2="83.5" y2="11.5" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
        <line x1="85.3" y1="21.5" x2="90.5" y2="18.5" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
        <line x1="67.5" y1="16.7" x2="64.5" y2="11.5" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
        <line x1="62.7" y1="21.5" x2="57.5" y2="18.5" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
      </svg>

      {showText && (
        <div className="text-center mt-4 flex flex-col items-center animate-fade-in">
          {/* Logo Main Heading: "NAVODAYA" styled with a beautiful gradient */}
          <span
            className={`font-sans font-black tracking-[0.18em] uppercase transition-colors duration-300 ${
              size === 'sm' ? 'text-lg mt-1' : size === 'md' ? 'text-2xl' : size === 'lg' ? 'text-4xl' : 'text-5xl'
            } ${lightText ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-indigo-300 drop-shadow-[0_2px_8px_rgba(30,58,138,0.5)]' : 'text-blue-900'}`}
          >
            NAVODAYA
          </span>

          {/* Logo Tagline Subtext: "THE CAMPUS OF POSSIBILITIES" */}
          <span
            className={`font-sans tracking-[0.22em] uppercase ${
              size === 'sm' ? 'text-[8px]' : size === 'md' ? 'text-[10px]' : size === 'lg' ? 'text-xs' : 'text-sm'
            } ${lightText ? 'text-slate-100' : 'text-slate-800'} font-extrabold mt-1 text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]`}
          >
            The Campus of Possibilities
          </span>

          {/* Incubation Center Designation */}
          <span
            className={`font-sans tracking-[0.18em] uppercase ${
              size === 'sm' ? 'text-[6px]' : size === 'md' ? 'text-[8px]' : size === 'lg' ? 'text-[10px]' : 'text-xs'
            } ${lightText ? 'text-teal-400 font-bold' : 'text-teal-700 font-bold'} mt-1.5`}
          >
            Innovation & Incubation Centre
          </span>
        </div>
      )}
    </div>
  );
};
