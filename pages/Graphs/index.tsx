import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import styles from './index.module.scss';
import Navbar from '../../Components/Navbar';
import Dashboard from '../../Components/Dashboardleft';
import 'chart.js/auto';

interface User {
  createdAt: string;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

const Index: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth/all');
        setUsers(response.data);
        prepareChartData(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const prepareChartData = (data: User[]) => {
    const sortedUsers = data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    const labels = sortedUsers.map(user => new Date(user.createdAt).toLocaleDateString());
    const counts = sortedUsers.map((_, index) => index + 1);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Number of Users',
          data: counts,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    });
  };

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', height: 'auto' }}>
        <Dashboard />
        <div className={styles.container}>
          <div className={styles.chartContainer}>
            <h2>User Growth Over Time</h2>
            <Bar data={chartData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
