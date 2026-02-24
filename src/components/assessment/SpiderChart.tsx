"use client";

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { ScoreResult } from '@/lib/assessment/utils';

interface SpiderChartProps {
  data: ScoreResult[];
}

export default function SpiderChart({ data }: SpiderChartProps) {
  const chartData = data.map((item) => ({
    category: item.category.replace(' ', '\n'),
    score: item.score,
    actualScore: item.score,
    fullMark: 50,
  }));

  const renderCustomLabel = (props: any) => {
    const { x, y, index } = props;
    const item = chartData[index];
    const offsetY = (index === 2 || index === 3) ? 10 : -10;

    return (
      <g>
        <text
          x={x}
          y={y + offsetY}
          fill="#0f172a"
          fontWeight="bold"
          fontSize="16"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {item.actualScore}
        </text>
      </g>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={chartData}>
        <PolarGrid stroke="#94a3b8" strokeDasharray="3 3" />
        <PolarAngleAxis
          dataKey="category"
          tick={{ fill: '#475569', fontSize: 12, fontWeight: 'bold' }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 50]}
          tick={{ fill: '#475569', fontSize: 11 }}
          tickCount={6}
        />
        <Radar
          name="Your Score"
          dataKey="score"
          stroke="#1d4ed8"
          fill="#1d4ed8"
          fillOpacity={0.5}
          label={renderCustomLabel}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
