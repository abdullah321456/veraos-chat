"use client";
import { useState } from "react";
import { Range } from "react-range";

export function AlignRangePicker() {
  const [values, setValues] = useState<number[]>([10]);

  return (
    <div className="mb-6">
      <Range
        step={1}
        min={0}
        max={100}
        values={values}
        onChange={setValues}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="w-full h-3 rounded-md relative"
            style={{
              background: `linear-gradient(to right, #9133CC ${values[0]}%, #EBD9F4 ${values[0]}%)`,
            }}>
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className="w-6 h-6 bg-[#9133CC] border-4 border-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-[#9133CC] transform translate-y-[-50%]">
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-[#9133CC]">
              {values[0]}%
            </span>
          </div>
        )}
      />
    </div>
  );
}
