interface AdkarScores {
  awareness: number;
  desire: number;
  knowledge: number;
  ability: number;
  reinforcement: number;
}

interface Props {
  scores: AdkarScores;
}

const DIMENSIONS = ['Awareness', 'Desire', 'Knowledge', 'Ability', 'Reinforcement'];
const KEYS: (keyof AdkarScores)[] = ['awareness', 'desire', 'knowledge', 'ability', 'reinforcement'];

const CX = 160;
const CY = 155;
const MAX_R = 100;
const LEVELS = 5;

function toPoint(angle: number, r: number): [number, number] {
  const rad = (angle - 90) * (Math.PI / 180);
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)];
}

function getAngles(n: number): number[] {
  return Array.from({ length: n }, (_, i) => (360 / n) * i);
}

export default function AdkarRadar({ scores }: Props) {
  const angles = getAngles(5);

  // Grid pentagon points for each level
  const gridLevels = Array.from({ length: LEVELS }, (_, i) => {
    const r = (MAX_R / LEVELS) * (i + 1);
    return angles.map(a => toPoint(a, r)).map(([x, y]) => `${x},${y}`).join(' ');
  });

  // Score polygon
  const scorePoints = KEYS.map((k, i) => {
    const r = (scores[k] / 5) * MAX_R;
    return toPoint(angles[i], r);
  });
  const scorePolygon = scorePoints.map(([x, y]) => `${x},${y}`).join(' ');

  // Label positions (slightly outside max radius)
  const labelPositions = angles.map(a => toPoint(a, MAX_R + 26));

  const scoreColor = (s: number) => s >= 4 ? '#d4af37' : s === 3 ? '#60a5fa' : '#f87171';

  return (
    <svg viewBox="0 0 320 310" className="w-full max-w-sm mx-auto">
      {/* Grid lines (spokes) */}
      {angles.map((angle, i) => {
        const [x, y] = toPoint(angle, MAX_R);
        return (
          <line
            key={i}
            x1={CX} y1={CY}
            x2={x} y2={y}
            stroke="#334155"
            strokeWidth="1"
          />
        );
      })}

      {/* Grid pentagons */}
      {gridLevels.map((pts, i) => (
        <polygon
          key={i}
          points={pts}
          fill="none"
          stroke="#334155"
          strokeWidth={i === LEVELS - 1 ? 1.5 : 1}
        />
      ))}

      {/* Score level labels (1–5) on the first spoke */}
      {Array.from({ length: LEVELS }, (_, i) => {
        const r = (MAX_R / LEVELS) * (i + 1);
        const [x, y] = toPoint(0, r);
        return (
          <text
            key={i}
            x={x + 5}
            y={y + 4}
            fontSize="9"
            fill="#64748b"
          >
            {i + 1}
          </text>
        );
      })}

      {/* Score polygon fill */}
      <polygon
        points={scorePolygon}
        fill="#d4af37"
        fillOpacity="0.15"
        stroke="#d4af37"
        strokeWidth="2"
      />

      {/* Score dots */}
      {scorePoints.map(([x, y], i) => (
        <circle
          key={i}
          cx={x} cy={y}
          r="5"
          fill={scoreColor(scores[KEYS[i]])}
          stroke="#0f172a"
          strokeWidth="2"
        />
      ))}

      {/* Dimension labels */}
      {labelPositions.map(([x, y], i) => {
        const anchor = x < CX - 5 ? 'end' : x > CX + 5 ? 'start' : 'middle';
        return (
          <text
            key={i}
            x={x}
            y={y + 4}
            textAnchor={anchor}
            fontSize="11"
            fontWeight="600"
            fill="#cbd5e1"
          >
            {DIMENSIONS[i]}
          </text>
        );
      })}

      {/* Score values next to dots */}
      {scorePoints.map(([x, y], i) => (
        <text
          key={i}
          x={x + (x < CX ? -10 : 10)}
          y={y - 8}
          textAnchor={x < CX ? 'end' : 'start'}
          fontSize="11"
          fontWeight="700"
          fill={scoreColor(scores[KEYS[i]])}
        >
          {scores[KEYS[i]]}
        </text>
      ))}
    </svg>
  );
}
