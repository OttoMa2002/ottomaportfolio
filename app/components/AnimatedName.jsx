/* Hero 名字：hover 时溶解成线条自绘、再填实回正常字（纯 CSS，路径见 namePaths.js）。 */
import { NAME_VIEWBOX, NAME_ZH, NAME_EN } from "./namePaths"

const GLYPHS = [
  ...NAME_ZH.map((d) => ({ d, color: "#f5f1e8" })),
  ...NAME_EN.map((d) => ({ d, color: "rgba(255, 210, 0, 0.85)" })),
]

export default function AnimatedName({ className = "" }) {
  return (
    <div className={`animated-name ${className}`}>
      <svg viewBox={NAME_VIEWBOX} width="100%" role="img" aria-label="马超越昊 Otto Ma">
        {GLYPHS.map((g, i) => (
          <path
            key={i}
            d={g.d}
            pathLength="1"
            className="name-glyph"
            style={{ fill: g.color, stroke: g.color }}
          />
        ))}
      </svg>
    </div>
  )
}
