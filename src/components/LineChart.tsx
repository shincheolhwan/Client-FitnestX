import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './colors.css';

const LineChart = () => {
    const data = {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [30, 50, 70, 40, 90, 100, 70],
                borderColor: 'var(--brand-color-primary)',
                backgroundColor: 'rgba(146, 163, 253, 0.2)',
                fill: true,
            },
            {
                label: 'Dataset 2',
                data: [40, 60, 80, 50, 60, 90, 80],
                borderColor: 'var(--secondary-color-primary)',
                backgroundColor: 'rgba(197, 139, 242, 0.2)',
                fill: true,
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

    return <Line data={data} options={options} />;
};

export default LineChart;
