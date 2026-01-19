"use client";

import { type ReactNode } from "react";
import { Dithering, type DitheringParams } from "@paper-design/shaders-react";

interface AnimatedDitherProps extends DitheringParams {
  children?: ReactNode;
  className?: string;
  width: number;
  height: number;
}

export function AnimatedDither({
  children,
  className,
  width,
  height,
  colorBack = "#000000",
  colorFront = "#ffffff",
  shape = "simplex",
  type = "4x4",
  size = 2,
  speed = 1,
  ...rest
}: AnimatedDitherProps) {
  return (
    <div className={`relative ${className ?? ""}`} style={{ width, height }}>
      <Dithering
        width={width}
        height={height}
        colorBack={colorBack}
        colorFront={colorFront}
        shape={shape}
        type={type}
        size={size}
        speed={speed}
        {...rest}
      />
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
