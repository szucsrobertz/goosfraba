import React, { useMemo } from 'react';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { GradientDarkgreenGreen } from '@visx/gradient';
import { scaleBand, scaleLinear } from '@visx/scale';

interface LineGraphProps {
  data: { month: string; count: number }[];
  width: number;
  height: number;
  xAxisProperty: string;
  yAxisProperty: string;
}

const xAccessor = (property: string) => (data: any) => data[property];
const yAccessor = (property: string) => (data: any) => data[property];

const BarChart: React.FC<LineGraphProps> = ({
  data,
  width,
  height,
  xAxisProperty,
  yAxisProperty,
}) => {
  const xMax = width - 30;
  const yMax = height - 120;

  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: data.map((item) => xAccessor(xAxisProperty)(item)),
        padding: 0.4,
      }),
    [xMax, data, xAxisProperty]
  );

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map((item) => yAccessor(yAxisProperty)(item)))],
      }),
    [yMax, data, yAxisProperty]
  );
  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill='url(#teal)' rx={14} />
      <GradientDarkgreenGreen id='teal' />
      <Group top={120 / 2} left={30}>
        {data.map((item) => {
          const x = xAccessor(xAxisProperty)(item);
          const barWidth = xScale.bandwidth();
          const y = yMax - (yScale(yAccessor(yAxisProperty)(item)) ?? 0);
          const barX = xScale(x);
          const barY = yMax - y;
          return (
            <Bar
              key={`bar-${x}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={y}
              fill='rgba(23, 233, 217, .5)'
            />
          );
        })}
        <AxisBottom
          numTicks={data.length}
          top={yMax}
          scale={xScale}
          tickLabelProps={() => ({
            fill: '#ffeb3b',
            fontSize: 15,
            textAnchor: 'middle',
          })}
        />
        <AxisLeft
          scale={yScale.nice()}
          numTicks={10}
          top={0}
          tickLabelProps={(e) => ({
            fill: '#ffeb3b',
            fontSize: 10,
            textAnchor: 'end',
            x: -12,
            y: (yScale(e) ?? 0) + 3,
          })}
        />
      </Group>
    </svg>
  );
};

export default BarChart;
