let tempChart, rainChart;

export function initCharts(tempCtx, rainCtx, data) {
    if (tempChart)
        tempChart.destroy();

    if (rainChart)
        rainChart.destroy();

    const hours = data.hourly.time.map(t => t.split('T')[1]);
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: 0,
                right: 0,
                bottom: 10,
                top: 5
            }
        },
        scales: {
            y: {
                ticks: {
                    padding: 5
                }
            },
            x: {
                ticks: {
                    maxRotation: 0,
                    autoSkip: true
                }
            }
        }
    };


    tempChart = new Chart(tempCtx, {
        type: 'line',
        data: { labels: hours, datasets: [{ label: 'Temp °C', data: data.hourly.temperature_2m, borderColor: '#6366F1', fill: false }] },
        options: chartOptions
    });

    rainChart = new Chart(rainCtx, {
        type: 'bar',
        data: { labels: hours, datasets: [{ label: 'Precipitation mm', data: data.hourly.precipitation, backgroundColor: '#3B82F6' }] },
        options: chartOptions
    });
}
