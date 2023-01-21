import React from 'react';
import { AnimatedGrid, AnimatedLineSeries, XYChart, Tooltip, Axis } from '@visx/xychart';
import { ParentSize } from '@visx/responsive';

import { BREAKPOINT_MOBILE, BREAKPOINT_TABLET } from '../../configs/constants';

interface LineGraphProps {
  data: { month: string; count: number }[];
}

const LineGraph: React.FC<LineGraphProps> = ({ data }) => {
  const accessors = {
    xAccessor: (d: any) => d.month,
    yAccessor: (d: any) => d.count,
  };

  function setNumberOfTicks(input: number) {
    if (input <= BREAKPOINT_MOBILE) {
      return 4;
    } else if (input <= BREAKPOINT_TABLET && input > BREAKPOINT_MOBILE) {
      return 5;
    }
  }

  return (
    <ParentSize>
      {(parent) => (
        <XYChart
          height={500}
          width={parent.width || 1000}
          xScale={{ type: 'band' }}
          yScale={{ type: 'linear' }}
        >
          <Axis
            orientation='bottom'
            tickLength={10}
            hideAxisLine
            hideTicks
            numTicks={setNumberOfTicks(parent.width)}
          />
          <Axis orientation='left' tickLength={10} hideTicks />
          <AnimatedGrid />
          <Tooltip
            snapTooltipToDatumX
            snapTooltipToDatumY
            showVerticalCrosshair
            showSeriesGlyphs
            renderTooltip={({ tooltipData, colorScale }) => (
              <div>
                {accessors.xAccessor(tooltipData?.nearestDatum?.datum)} :{' '}
                {accessors.yAccessor(tooltipData?.nearestDatum?.datum)} post(s)
              </div>
            )}
          />
          <AnimatedLineSeries dataKey='test' data={data} {...accessors} />
        </XYChart>
      )}
    </ParentSize>
  );
};
export default LineGraph;
