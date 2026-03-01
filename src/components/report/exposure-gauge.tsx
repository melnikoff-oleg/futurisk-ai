interface ExposureGaugeProps {
  score: number
  label: string
}

function scoreColor(score: number): string {
  if (score >= 9) return 'var(--color-danger)'
  if (score >= 7) return 'var(--color-warning)'
  if (score >= 4) return 'var(--color-accent)'
  return 'var(--color-success)'
}

export function ExposureGauge({ score, label }: ExposureGaugeProps) {
  const size = 180
  const strokeWidth = 14
  const radius = (size - strokeWidth) / 2
  const cx = size / 2
  const cy = size / 2 + 10

  // Semicircle: from 180° to 0° (left to right)
  const startAngle = Math.PI
  const endAngle = 0
  const scoreAngle = startAngle - ((score / 10) * (startAngle - endAngle))

  const bgArcPath = describeArc(cx, cy, radius, endAngle, startAngle)
  const fillArcPath = describeArc(cx, cy, radius, scoreAngle, startAngle)

  const color = scoreColor(score)

  return (
    <div className="flex flex-col items-center gap-1">
      <svg
        width={size}
        height={size / 2 + 30}
        viewBox={`0 0 ${size} ${size / 2 + 30}`}
        className="overflow-visible"
      >
        {/* Background arc */}
        <path
          d={bgArcPath}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Filled arc */}
        <path
          d={fillArcPath}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Score number */}
        <text
          x={cx}
          y={cy - 8}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontSize: 42,
            fontWeight: 700,
            fill: color,
            fontFamily: 'var(--font-sans)',
          }}
        >
          {score}
        </text>
        <text
          x={cx}
          y={cy + 20}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontSize: 10,
            fontWeight: 600,
            fill: 'var(--color-text-muted)',
            fontFamily: 'var(--font-sans)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
          }}
        >
          out of 10
        </text>
      </svg>
      <span
        className="text-xs font-semibold uppercase tracking-widest"
        style={{ color }}
      >
        {label}
      </span>
    </div>
  )
}

function describeArc(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string {
  const startX = cx + radius * Math.cos(startAngle)
  const startY = cy - radius * Math.sin(startAngle)
  const endX = cx + radius * Math.cos(endAngle)
  const endY = cy - radius * Math.sin(endAngle)
  const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0

  return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${endX} ${endY}`
}
