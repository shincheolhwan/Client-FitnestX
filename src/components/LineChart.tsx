import React from 'react';
import {Line} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend, TooltipItem
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface InputProps {
    day?: number,
    pastData?: number[],
}

const LineChart: React.FC<InputProps> = ({day = 0, pastData = [10, 20, 30, 40, 50, 60, 70]}) => {
    let labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    function rearrangeArray(arr: any[], startIndex: number) {
        // 시작 인덱스부터 끝까지의 요소 추출
        const frontPart = arr.slice(startIndex);
        // 배열의 처음부터 시작 인덱스 이전의 요소 추출
        const rearPart = arr.slice(0, startIndex);
        // 두 부분을 결합하여 새로운 배열 생성
        return frontPart.concat(rearPart);
    }


    const data = {
        labels: rearrangeArray(labels, day),
        datasets: [
            {
                label: 'Completion Rate',
                data: rearrangeArray(pastData, day),
                borderColor: 'rgba(255, 255, 255, 1)',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                borderWidth: 2,
                pointRadius: 3, // 점 크기를 5로 설정하여 툴팁을 더 쉽게 볼 수 있게 함
                tension: 0.4,
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true, // 툴팁 활성화
                callbacks: {
                    label: function (context: TooltipItem<any>) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y;
                        }
                        return label;
                    }
                }
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: 'white',

                },
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)',
                },
                ticks: {
                    color: 'white',
                    beginAtZero: true,
                    max: 100,
                    stepSize: 20,
                },
            },
        },
    };

    return <Line data={data} options={options}/>;
};

export default LineChart;
