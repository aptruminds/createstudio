"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "motion/react"

interface Frame {
  id: number
  video: string
  poster?: string
  label?: string
  defaultPos: { x: number; y: number; w: number; h: number }
  mediaSize: number
  isHovered: boolean
}

interface FrameComponentProps {
  video: string
  poster?: string
  label?: string
  mediaSize: number
  isHovered: boolean
}

function FrameComponent({ video, poster, label, mediaSize, isHovered }: FrameComponentProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches)
  }, [])

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    if (isHovered) {
      el.play().catch(() => {})
    } else if (isTouch) {
      // The render above detached src; load() is what actually aborts the
      // fetch and frees the decoder — nine live video pipelines are enough
      // to blow iOS Safari's per-tab memory budget and crash the tab.
      el.pause()
      el.load()
    } else {
      // Revert the cell to its original state: paused at the first frame.
      el.pause()
      el.currentTime = 0
    }
  }, [isHovered, isTouch])

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      <video
        ref={videoRef}
        // Touch devices only attach the source while the tile is active, so
        // an idle tile holds no decoder or buffered data at all — the poster
        // keeps it visual in the meantime.
        src={isTouch && !isHovered ? undefined : video}
        poster={poster}
        loop
        muted
        playsInline
        preload="metadata"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transform: `scale(${mediaSize})`,
          transformOrigin: "center",
          // Dim the placeholder video so the service name reads cleanly;
          // show it at full brightness while hovered (the label fades out).
          filter: isHovered ? "brightness(1)" : "brightness(0.22)",
          transition: "filter 0.3s ease-in-out, transform 0.3s ease-in-out",
        }}
      />

      {label && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 12px",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(22px, 2.6vw, 44px)",
              lineHeight: 1.15,
              textAlign: "center",
              color: "#fff",
              opacity: isHovered ? 0 : 1,
              transform: isHovered ? "scale(1.06)" : "scale(1)",
              transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
            }}
          >
            {label}
          </span>
        </div>
      )}
    </div>
  )
}

interface DynamicFrameLayoutProps {
  frames: Frame[]
  className?: string
  hoverSize?: number
  gapSize?: number
}

export function DynamicFrameLayout({
  frames: initialFrames,
  className = "",
  hoverSize = 6,
  gapSize = 4,
}: DynamicFrameLayoutProps) {
  const [frames] = useState<Frame[]>(initialFrames)
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)

  const getRowSizes = () => {
    if (hovered === null) return "4fr 4fr 4fr"
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map((r) => (r === hovered.row ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  const getColSizes = () => {
    if (hovered === null) return "4fr 4fr 4fr"
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map((c) => (c === hovered.col ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  const getTransformOrigin = (x: number, y: number) => {
    const vertical = y === 0 ? "top" : y === 4 ? "center" : "bottom"
    const horizontal = x === 0 ? "left" : x === 4 ? "center" : "right"
    return `${vertical} ${horizontal}`
  }

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateRows: getRowSizes(),
        gridTemplateColumns: getColSizes(),
        gap: `${gapSize}px`,
        transition: "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
      }}
    >
      {frames.map((frame) => {
        const row = Math.floor(frame.defaultPos.y / 4)
        const col = Math.floor(frame.defaultPos.x / 4)

        return (
          <motion.div
            key={frame.id}
            style={{
              position: "relative",
              overflow: "hidden",
              transformOrigin: getTransformOrigin(frame.defaultPos.x, frame.defaultPos.y),
              transition: "transform 0.4s ease",
            }}
            onMouseEnter={() => {
              if (window.matchMedia("(hover: none)").matches) return
              setHovered({ row, col })
            }}
            onMouseLeave={() => {
              if (window.matchMedia("(hover: none)").matches) return
              setHovered(null)
            }}
            // Touch devices never hover: a tap activates the tile (video plays,
            // label fades) and a second tap on it reverts it. The mouse handlers
            // are gated above so the synthetic mouse events a tap fires don't
            // fight the toggle.
            onClick={() => {
              if (!window.matchMedia("(hover: none)").matches) return
              setHovered((prev) =>
                prev?.row === row && prev?.col === col ? null : { row, col },
              )
            }}
          >
            <FrameComponent
              video={frame.video}
              poster={frame.poster}
              label={frame.label}
              mediaSize={frame.mediaSize}
              isHovered={hovered?.row === row && hovered?.col === col}
            />
          </motion.div>
        )
      })}
    </div>
  )
}
