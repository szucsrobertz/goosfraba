import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import LineGraph from '../../components/LineGraph/LineGraph';

import { getAllPosts } from '../../queries/posts';
import { DEFAULT_GRAPH_DATA, NUMBER_OF_POSTS, YEAR_CRITERIA } from '../../configs/constants';

import { Posts, PostsGraphData } from '../../interfaces/posts';

import './HomePage.css';
import BarChart from '../../components/BarChart/BarChart';
import { ParentSize } from '@visx/responsive';

const HomePage: React.FC = () => {
  const { loading, data } = useQuery(getAllPosts, {
    variables: { count: NUMBER_OF_POSTS },
  });

  const [graphData, setGraphData] = useState<PostsGraphData[]>(DEFAULT_GRAPH_DATA);

  useEffect(() => {
    if (data) {
      data?.allPosts.forEach((data: Posts) => {
        const currentDate = new Date(Number(data.createdAt));
        const year = currentDate.getFullYear();
        if (year === YEAR_CRITERIA) {
          const month = currentDate.getMonth();
          graphData[month].count += 1;

          setGraphData(graphData);
        }
      });
    }
  }, [data, graphData]);

  return (
    <div className='content'>
      {loading ? (
        <div className='loading-text'>The data is loading</div>
      ) : (
        <>
          <div className='graph-container'>
            <ParentSize>
              {(parent) => (
                <BarChart
                  data={graphData}
                  width={parent.width}
                  height={parent.height}
                  xAxisProperty={'month'}
                  yAxisProperty={'count'}
                />
              )}
            </ParentSize>
          </div>
          <div className='graph-container'>
            <LineGraph data={graphData} xAxisProperty={'month'} yAxisProperty={'count'} />
          </div>
        </>
      )}
    </div>
  );
};
export default HomePage;
