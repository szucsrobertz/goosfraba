import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import { getAllPosts } from './queries/posts';

import './App.css';

function App() {
  const { loading, error, data } = useQuery(getAllPosts, {
    variables: { count: 10 },
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
        const index = new Date(Number(data.createdAt)).getMonth();
        graphData[index].count += 1;

        setGraphData(graphData);
      });
    }
  }, [data]);

  return <div className='App'></div>;
}

export default App;
