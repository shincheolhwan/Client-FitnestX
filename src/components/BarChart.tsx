import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './colors.css';

const BarChart = () => {
    const data = {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [30, 50, 70, 40, 90, 100, 70],
                backgroundColor: 'var(--brand-color-primary)',
            },
            {
                label: 'Dataset 2',
                data: [40, 60, 80, 50, 60, 90, 80],
                backgroundColor: 'var(--secondary-color-primary)',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default BarChart;
