/**
 * Hero visual: how a payment integration actually threads together.
 * Merchant -> platform -> gateway on the way out, and an asynchronous
 * webhook on the way back. Purely decorative, so it is hidden from
 * assistive tech and described by the surrounding copy instead.
 */

type NodeProps = {
  x: number
  label: string
  sub: string
  accent?: boolean
}

function FlowNode({ x, label, sub, accent }: NodeProps) {
  return (
    <g>
      <rect
        x={x}
        y={40}
        width={124}
        height={58}
        rx={10}
        className={
          accent
            ? 'fill-[var(--accent-soft)] stroke-[var(--accent)]'
            : 'fill-[var(--surface)] stroke-[var(--border-strong)]'
        }
        strokeWidth={1}
      />
      <text
        x={x + 62}
        y={64}
        textAnchor="middle"
        className={`text-[12px] font-semibold ${accent ? 'fill-[var(--accent)]' : 'fill-[var(--text)]'}`}
      >
        {label}
      </text>
      <text
        x={x + 62}
        y={81}
        textAnchor="middle"
        className="fill-[var(--text-faint)] text-[10px] [font-family:var(--font-mono)]"
      >
        {sub}
      </text>
    </g>
  )
}

export function PaymentFlow() {
  return (
    <svg
      viewBox="0 0 520 232"
      role="presentation"
      aria-hidden="true"
      className="w-full"
    >
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" className="fill-[var(--border-strong)]" />
        </marker>
        <marker
          id="arrow-accent"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" className="fill-[var(--accent)]" />
        </marker>
      </defs>

      {/* label */}
      <text
        x={8}
        y={18}
        className="fill-[var(--text-faint)] text-[10px] tracking-[0.14em] uppercase [font-family:var(--font-mono)]"
      >
        payment flow
      </text>

      {/* outbound legs */}
      <line
        x1={134}
        y1={69}
        x2={192}
        y2={69}
        className="flow-line stroke-[var(--border-strong)]"
        strokeWidth={1.5}
        markerEnd="url(#arrow)"
      />
      <text
        x={163}
        y={58}
        textAnchor="middle"
        className="fill-[var(--text-faint)] text-[9px] [font-family:var(--font-mono)]"
      >
        request
      </text>

      <line
        x1={326}
        y1={69}
        x2={384}
        y2={69}
        className="flow-line stroke-[var(--border-strong)]"
        strokeWidth={1.5}
        markerEnd="url(#arrow)"
      />
      <text
        x={355}
        y={58}
        textAnchor="middle"
        className="fill-[var(--text-faint)] text-[9px] [font-family:var(--font-mono)]"
      >
        checkout
      </text>

      <FlowNode x={10} label="Merchant" sub="site / cart" />
      <FlowNode x={198} label="PayLexer" sub="unified API" accent />
      <FlowNode x={386} label="Gateway" sub="provider" />

      {/* asynchronous return path */}
      <path
        d="M448 106 V164 Q448 176 436 176 H84 Q72 176 72 164 V106"
        fill="none"
        className="flow-line stroke-[var(--accent)]"
        strokeWidth={1.5}
        markerEnd="url(#arrow-accent)"
        opacity={0.85}
      />
      <circle cx={260} cy={176} r={3.5} className="flow-node fill-[var(--accent)]" />
      <line
        x1={260}
        y1={172}
        x2={260}
        y2={106}
        className="stroke-[var(--accent)]"
        strokeWidth={1}
        strokeDasharray="3 5"
        opacity={0.45}
      />
      <text
        x={260}
        y={198}
        textAnchor="middle"
        className="fill-[var(--accent)] text-[10px] [font-family:var(--font-mono)]"
      >
        webhook · payment status
      </text>

      {/* state chips */}
      <g className="[font-family:var(--font-mono)]">
        {['pending', 'authorized', 'settled'].map((state, i) => (
          <g key={state}>
            <rect
              x={120 + i * 100}
              y={212}
              width={84}
              height={16}
              rx={8}
              className="fill-[var(--surface)] stroke-[var(--border)]"
              strokeWidth={1}
            />
            <text
              x={162 + i * 100}
              y={223.5}
              textAnchor="middle"
              className="fill-[var(--text-faint)] text-[9px]"
            >
              {state}
            </text>
          </g>
        ))}
      </g>
    </svg>
  )
}
