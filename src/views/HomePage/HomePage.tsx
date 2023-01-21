import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import LineGraph from '../../components/LineGraph/LineGraph';

import { getAllPosts } from '../../queries/posts';

import './HomePage.css';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const { loading, data } = useQuery(getAllPosts, {
    variables: { count: 1000 },
  });

  const [graphData, setGraphData] = useState<{ month: string; count: number }[]>([
    { month: 'January', count: 0 },
    { month: 'February', count: 0 },
    { month: 'March', count: 0 },
    { month: 'April', count: 0 },
    { month: 'May', count: 0 },
    { month: 'June', count: 0 },
    { month: 'July', count: 0 },
    { month: 'August', count: 0 },
    { month: 'September', count: 0 },
    { month: 'October', count: 0 },
    { month: 'November', count: 0 },
    { month: 'December', count: 0 },
  ]);

  useEffect(() => {
    if (data) {
      data?.allPosts.forEach((data: any) => {
        const year = new Date(Number(data.createdAt)).getFullYear();
        if (year === 2019) {
          const index = new Date(Number(data.createdAt)).getMonth();
          graphData[index].count += 1;

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
        <div className='graph-container'>
          <LineGraph data={graphData} xAxisProperty={'month'} yAxisProperty={'count'} />
        </div>
      )}
    </div>
  );
};
export default HomePage;
