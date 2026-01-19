import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { AnimatedDither } from "@/components/animated-dither"
import type { DitheringShape, DitheringType } from "@paper-design/shaders"

function getContrastColor(hex: string): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = num >> 16;
  const g = (num >> 8) & 0xff;
  const b = num & 0xff;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#1a1a1a" : "#f5f5f5";
}

const coinCardVariants = cva(
  "rounded-md overflow-hidden flex flex-col",
  {
    variants: {
      size: {
        xs: "w-36 h-48",
        sm: "w-48 h-64",
        md: "w-72 h-96",
        lg: "w-96 h-[32rem]",
        xl: "w-[28rem] h-[37rem]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

const sizeDimensions = {
  xs: { width: 144, height: 192, padding: 8 },
  sm: { width: 192, height: 256, padding: 10 },
  md: { width: 288, height: 384, padding: 12 },
  lg: { width: 384, height: 512, padding: 20 },
  xl: { width: 448, height: 592, padding: 24 },
} as const;

interface DitherConfig {
  shape: DitheringShape;
  type: DitheringType;
  ratio?: number;
}

interface CoinCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof coinCardVariants> {
  colorBack?: string;
  colorFront?: string;
  ditherConfig?: DitherConfig;
}

export function CoinCard({
  className,
  size = "md",
  style,
  colorBack,
  colorFront,
  ditherConfig,
  children,
  ...props
}: CoinCardProps) {
  const bgColor = style?.backgroundColor as string | undefined;
  const resolvedBg = colorBack ?? bgColor ?? "#7C927B";
  const dims = sizeDimensions[size ?? "md"];
  const ditherRatio = ditherConfig?.ratio ?? 0.5;
  const containerWidth = dims.width - dims.padding * 2;
  const containerHeight = (dims.height * ditherRatio) - dims.padding * 2;
  const ditherSize = Math.max(containerWidth, containerHeight);

  return (
    <div
      className={cn(coinCardVariants({ size }), className)}
      style={style}
      {...props}
    >
      {ditherConfig && (
        <div className="flex items-center justify-center" style={{ flex: ditherRatio, padding: dims.padding }}>
          <div
            className="flex items-center justify-center overflow-hidden"
            style={{ width: containerWidth, height: containerHeight }}
          >
            <AnimatedDither
              width={ditherSize}
              height={ditherSize}
              colorBack={resolvedBg}
              colorFront={colorFront ?? getContrastColor(resolvedBg)}
              shape={ditherConfig.shape}
              type={ditherConfig.type}
              size={2}
              speed={0.8}
            />
          </div>
        </div>
      )}
      <div className="" style={{ flex: ditherConfig ? 1 - ditherRatio : 1 }}>
        {children}
      </div>
    </div>
  )
}
