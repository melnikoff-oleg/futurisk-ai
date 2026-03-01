'use client'

import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  ReferenceDot,
  ReferenceArea,
  ReferenceLine,
} from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import type { TrajectoryPoint } from '@/types/report'

interface CareerTrajectoryChartProps {
  data: TrajectoryPoint[]
}

const chartConfig = {
  adapted: {
    label: 'If you adapt',
    color: 'var(--color-success)',
  },
  statusQuo: {
    label: "If you don't",
    color: 'var(--color-danger)',
  },
  aiAdoption: {
    label: 'AI adoption in your industry',
    color: 'var(--color-text-muted)',
  },
} satisfies ChartConfig

const yAxisTiers = [
  { value: 200, label: '2x Current' },
  { value: 150, label: '1.5x' },
  { value: 100, label: 'Current' },
  { value: 50, label: '0.5x' },
  { value: 0, label: 'Declining' },
]

function normalizeData(data: TrajectoryPoint[]): TrajectoryPoint[] {
  if (data.length === 0) return data
  const first = data[0]
  const startValue = Math.max(first.statusQuo, first.adapted)
  return data.map((point, i) => {
    if (i === 0) {
      return { ...point, statusQuo: startValue, adapted: startValue }
    }
    return point
  })
}

// Custom event pin dot renderer
function EventPinDot(props: {
  cx?: number
  cy?: number
  payload?: TrajectoryPoint
}) {
  const { cx, cy, payload } = props
  if (!cx || !cy || !payload?.eventPin) return null

  const pin = payload.eventPin
  const color =
    pin.type === 'opportunity'
      ? 'var(--color-success)'
      : pin.type === 'disruption'
        ? 'var(--color-danger)'
        : 'var(--color-accent)'

  return (
    <g>
      {/* Pin circle */}
      <circle cx={cx} cy={cy} r={6} fill={color} stroke="var(--color-surface)" strokeWidth={2} />
      {/* Inner icon indicator */}
      <circle cx={cx} cy={cy} r={2.5} fill="var(--color-surface)" />
    </g>
  )
}

export function CareerTrajectoryChart({ data: rawData }: CareerTrajectoryChartProps) {
  const data = normalizeData(rawData)
  const lastPoint = data[data.length - 1]
  const firstPoint = data[0]

  // Find the peak adapted value for "Peak Earnings" zone
  const peakAdapted = Math.max(...data.map((d) => d.adapted))
  const peakIndex = data.findIndex((d) => d.adapted === peakAdapted)

  // Find where statusQuo drops significantly (below 80% of start)
  const startVal = firstPoint?.statusQuo ?? 100
  const disruptionStart = data.findIndex((d, i) => i > 0 && d.statusQuo < startVal * 0.8)

  // Separate event pins by line position
  const adaptedPins = data.filter((d) => d.eventPin && d.eventPin.type === 'opportunity')
  const statusQuoPins = data.filter((d) => d.eventPin && d.eventPin.type === 'disruption')
  const milestonePins = data.filter((d) => d.eventPin && d.eventPin.type === 'milestone')

  return (
    <div className="w-full">
      {/* Inline legend */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-4 text-xs text-text-muted">
        <div className="flex items-center gap-1.5">
          <div className="h-0.5 w-5 bg-success rounded-full" />
          <span>If you adapt</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-0.5 w-5 bg-danger rounded-full border-dashed" style={{ borderTop: '2px dashed var(--color-danger)', height: 0 }} />
          <span>If you don&apos;t</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-5 bg-text-muted/10 rounded-sm" />
          <span>AI adoption in your industry</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-success border-2 border-surface" />
          <span>Opportunity</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-danger border-2 border-surface" />
          <span>Disruption</span>
        </div>
      </div>

      <ChartContainer config={chartConfig} className="h-[520px] w-full [&_svg]:overflow-visible">
        <AreaChart data={data} margin={{ top: 50, right: 100, left: 15, bottom: 20 }}>
          <defs>
            <linearGradient id="fillAdapted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-success)" stopOpacity={0.18} />
              <stop offset="100%" stopColor="var(--color-success)" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="fillStatusQuo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-danger)" stopOpacity={0.1} />
              <stop offset="100%" stopColor="var(--color-danger)" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="fillAiAdoption" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-text-muted)" stopOpacity={0.08} />
              <stop offset="100%" stopColor="var(--color-text-muted)" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="fillDivergence" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-success)" stopOpacity={0.08} />
              <stop offset="100%" stopColor="var(--color-danger)" stopOpacity={0.04} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="quarter"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
            padding={{ left: 5, right: 5 }}
            interval={0}
            angle={-35}
            textAnchor="end"
            height={50}
          />
          <YAxis
            domain={[0, 200]}
            tickLine={false}
            axisLine={false}
            ticks={yAxisTiers.map((t) => t.value)}
            tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }}
            tickFormatter={(v) => {
              const tier = yAxisTiers.find((t) => t.value === v)
              return tier ? tier.label : `${v}%`
            }}
            width={80}
          />

          {/* "Current Level" reference line */}
          <ReferenceLine
            y={100}
            stroke="var(--color-border)"
            strokeDasharray="4 4"
            strokeWidth={1}
          />

          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value, name) => {
                  if (name === 'aiAdoption') return [`${value}%`, 'AI Adoption']
                  if (name === 'adapted') return [`${value}%`, 'If you adapt']
                  if (name === 'statusQuo') return [`${value}%`, "If you don't"]
                  return [value, name]
                }}
              />
            }
          />

          {/* Peak earnings zone shading */}
          {peakIndex > 0 && peakIndex < data.length - 1 && (
            <ReferenceArea
              x1={data[Math.max(0, peakIndex - 1)].quarter}
              x2={data[Math.min(data.length - 1, peakIndex + 1)].quarter}
              y1={peakAdapted}
              y2={peakAdapted - 20}
              fill="var(--color-success)"
              fillOpacity={0.06}
              strokeOpacity={0}
              label={{
                value: 'Peak Earnings Window',
                position: 'insideTopLeft',
                style: { fontSize: 9, fill: 'var(--color-success)', fontWeight: 600 },
              }}
            />
          )}

          {/* Disruption zone shading */}
          {disruptionStart > 0 && (
            <ReferenceArea
              x1={data[disruptionStart].quarter}
              x2={data[data.length - 1].quarter}
              y1={startVal}
              y2={0}
              fill="var(--color-danger)"
              fillOpacity={0.03}
              strokeOpacity={0}
            />
          )}

          {/* Divergence shading between the two main lines */}
          {data.length >= 2 &&
            data.slice(1, -1).map((point, i) => {
              const actualIndex = i + 1
              const next = data[actualIndex + 1]
              if (!next) return null
              if (point.adapted <= point.statusQuo) return null
              return (
                <ReferenceArea
                  key={`div-${point.quarter}`}
                  x1={point.quarter}
                  x2={next.quarter}
                  y1={Math.max(point.adapted, next.adapted)}
                  y2={Math.min(point.statusQuo, next.statusQuo)}
                  fill="url(#fillDivergence)"
                  fillOpacity={1}
                  strokeOpacity={0}
                />
              )
            })}

          {/* AI Adoption backdrop area — subtle grey */}
          <Area
            type="monotone"
            dataKey="aiAdoption"
            stroke="none"
            fill="url(#fillAiAdoption)"
            dot={false}
          />

          {/* Status quo line — dashed red */}
          <Area
            type="monotone"
            dataKey="statusQuo"
            stroke="var(--color-danger)"
            strokeWidth={2}
            strokeDasharray="6 3"
            fill="url(#fillStatusQuo)"
            dot={{ r: 3, fill: 'var(--color-danger)', stroke: 'var(--color-surface)', strokeWidth: 1.5 }}
            activeDot={{ r: 5 }}
          />

          {/* Adapted line — solid green */}
          <Area
            type="monotone"
            dataKey="adapted"
            stroke="var(--color-success)"
            strokeWidth={2.5}
            fill="url(#fillAdapted)"
            dot={{ r: 3, fill: 'var(--color-success)', stroke: 'var(--color-surface)', strokeWidth: 1.5 }}
            activeDot={{ r: 5 }}
          />

          {/* Event pin annotations for opportunity events */}
          {adaptedPins.map((point) => (
            <ReferenceDot
              key={`opp-${point.quarter}`}
              x={point.quarter}
              y={point.adapted}
              r={6}
              fill="var(--color-success)"
              stroke="var(--color-surface)"
              strokeWidth={2}
              label={{
                value: point.eventPin!.label,
                position: 'top',
                offset: 20,
                style: {
                  fontSize: 9,
                  fill: 'var(--color-success)',
                  fontWeight: 600,
                },
              }}
            />
          ))}

          {/* Event pin annotations for disruption events */}
          {statusQuoPins.map((point) => (
            <ReferenceDot
              key={`dis-${point.quarter}`}
              x={point.quarter}
              y={point.statusQuo}
              r={6}
              fill="var(--color-danger)"
              stroke="var(--color-surface)"
              strokeWidth={2}
              label={{
                value: point.eventPin!.label,
                position: 'bottom',
                offset: 20,
                style: {
                  fontSize: 9,
                  fill: 'var(--color-danger)',
                  fontWeight: 600,
                },
              }}
            />
          ))}

          {/* Milestone event annotations */}
          {milestonePins.map((point) => (
            <ReferenceDot
              key={`mile-${point.quarter}`}
              x={point.quarter}
              y={point.adapted}
              r={6}
              fill="var(--color-accent)"
              stroke="var(--color-surface)"
              strokeWidth={2}
              label={{
                value: point.eventPin!.label,
                position: 'top',
                offset: 20,
                style: {
                  fontSize: 9,
                  fill: 'var(--color-accent)',
                  fontWeight: 600,
                },
              }}
            />
          ))}

          {/* End-of-line labels */}
          {lastPoint && (
            <>
              <ReferenceDot
                x={lastPoint.quarter}
                y={lastPoint.adapted}
                r={5}
                fill="var(--color-success)"
                stroke="var(--color-surface)"
                strokeWidth={2}
                label={{
                  value: `${lastPoint.adapted}%`,
                  position: 'right',
                  offset: 12,
                  style: {
                    fontSize: 12,
                    fill: 'var(--color-success)',
                    fontWeight: 700,
                  },
                }}
              />
              <ReferenceDot
                x={lastPoint.quarter}
                y={lastPoint.statusQuo}
                r={5}
                fill="var(--color-danger)"
                stroke="var(--color-surface)"
                strokeWidth={2}
                label={{
                  value: `${lastPoint.statusQuo}%`,
                  position: 'right',
                  offset: 12,
                  style: {
                    fontSize: 12,
                    fill: 'var(--color-danger)',
                    fontWeight: 700,
                  },
                }}
              />
            </>
          )}

          {/* Starting point marker */}
          {firstPoint && (
            <ReferenceDot
              x={firstPoint.quarter}
              y={firstPoint.adapted}
              r={7}
              fill="var(--color-text)"
              stroke="var(--color-surface)"
              strokeWidth={2}
              label={{
                value: 'You are here',
                position: 'top',
                offset: 20,
                style: {
                  fontSize: 11,
                  fill: 'var(--color-text)',
                  fontWeight: 700,
                },
              }}
            />
          )}
        </AreaChart>
      </ChartContainer>
    </div>
  )
}
