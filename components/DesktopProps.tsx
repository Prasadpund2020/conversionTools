import React from "react";

export default function DesktopProps() {
  return (
    <>
      {/* Ambient lighting overlay */}
      <div className="fixed inset-0 desk-vignette z-0 pointer-events-none" />

      {/* Bottom Left: Potted Green Foliage / Succulent */}
      <div className="fixed bottom-0 left-0 pointer-events-none z-10 w-44 h-44 overflow-hidden select-none">
        <svg
          className="w-full h-full transform translate-y-6 -translate-x-6 filter drop-shadow-xl"
          fill="none"
          viewBox="0 0 200 200"
        >
          <path
            d="M-10 190 C20 130, 70 120, 100 130 C90 160, 50 180, -10 190 Z"
            fill="#2d5a27"
          />
          <path
            d="M-5 195 C25 140, 65 130, 95 135"
            stroke="#3d7535"
            strokeWidth="2"
          />
          <path
            d="M30 200 C50 140, 110 110, 150 130 C130 165, 80 185, 30 200 Z"
            fill="#3e7c33"
          />
          <path
            d="M10 170 C40 100, 90 90, 120 115 C100 140, 60 155, 10 170 Z"
            fill="#4d9940"
          />
          <path
            d="M-10 150 C20 90, 80 80, 90 110 C70 130, 30 145, -10 150 Z"
            fill="#5cb74d"
          />
        </svg>
      </div>

      {/* Bottom Right: Leather Desk Pad, Luxury Ballpoint Pen, and Yellow Post-It Note */}
      <div className="fixed -bottom-6 -right-6 w-80 h-48 pointer-events-none z-20 select-none">
        {/* Leather Desk Mat / Black Notebook Edge */}
        <div className="leather-pad absolute right-0 bottom-0 w-72 h-40 rounded-tl-3xl" />

        {/* Luxury Ballpoint Pen with Gold Clips */}
        <div className="luxury-pen absolute bottom-12 right-40 w-4 h-36 bg-gradient-to-r from-amber-700 via-neutral-900 to-black rounded-full border-t border-amber-400/40">
          {/* Gold pen clip */}
          <div className="absolute top-6 left-1 w-1.5 h-14 bg-gradient-to-r from-amber-200 to-amber-500 rounded-sm shadow-xs" />
          {/* Gold center ring */}
          <div className="absolute top-20 left-0 w-full h-1 bg-amber-400" />
        </div>

        {/* Yellow Post-It Sticky Note */}
        <div className="sticky-note absolute bottom-5 right-6 w-36 h-32 p-3.5 flex flex-col justify-center items-center text-center font-handwriting select-none">
          <span className="text-stone-800 text-lg font-bold leading-tight">
            Simple Tools
          </span>
          <span className="text-stone-700 text-sm font-semibold mt-0.5">
            for Everyday Files
          </span>
          <div className="w-16 h-0.5 bg-stone-500/30 rounded mt-1" />
        </div>
      </div>
    </>
  );
}
