import html2canvas from 'html2canvas';
import JSZip from 'jszip';
import CPUChart from './charts/CPUChart';
import MemoryChart from './charts/MemoryChart';
import DiskChart from './charts/DiskChart';
import DiskUsageChart from './charts/DiskUsageChart';
import NetworkChart from './charts/NetworkChart';
import ProcessChart from './charts/ProcessChart';

function ChartContainer({ data }) {
    const exportChart = async (elementId, filename) => {
        const element = document.getElementById(elementId);
        if (!element) return;

        try {
            const canvas = await html2canvas(element, {
                backgroundColor: '#1e293b',
                scale: 2,
            });

            const link = document.createElement('a');
            link.download = `${filename}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (error) {
            console.error('Error exporting chart:', error);
            alert('Failed to export chart');
        }
    };

    const exportAllCharts = async () => {
        const zip = new JSZip();
        const charts = [
            { id: 'cpu-chart', name: 'cpu-usage' },
            { id: 'memory-chart', name: 'memory-usage' },
            { id: 'disk-chart', name: 'disk-io' },
            { id: 'disk-usage-chart', name: 'disk-usage' },
            { id: 'network-chart', name: 'network-traffic' },
            { id: 'process-chart', name: 'process-stats' },
        ];

        try {
            for (const chart of charts) {
                const element = document.getElementById(chart.id);
                if (element) {
                    const canvas = await html2canvas(element, {
                        backgroundColor: '#1e293b',
                        scale: 2,
                    });

                    const dataUrl = canvas.toDataURL('image/png');
                    const base64Data = dataUrl.split(',')[1];
                    zip.file(`${chart.name}.png`, base64Data, { base64: true });
                }
            }

            const content = await zip.generateAsync({ type: 'blob' });
            const link = document.createElement('a');
            link.download = 'sar-charts.zip';
            link.href = URL.createObjectURL(content);
            link.click();
        } catch (error) {
            console.error('Error exporting all charts:', error);
            alert('Failed to export charts');
        }
    };

    return (
        <div className="charts-container">
            <div className="export-controls">
                <button className="export-btn" onClick={exportAllCharts}>
                    📦 Export All Charts (ZIP)
                </button>
            </div>

            <div className="chart-card" id="cpu-chart">
                <div className="chart-header">
                    <h2>CPU Usage</h2>
                    <button
                        className="chart-export-btn"
                        onClick={() => exportChart('cpu-chart', 'cpu-usage')}
                    >
                        💾 Export PNG
                    </button>
                </div>
                <div className="chart-wrapper">
                    <CPUChart data={data.cpu} />
                </div>
            </div>

            <div className="chart-card" id="memory-chart">
                <div className="chart-header">
                    <h2>Memory Usage</h2>
                    <button
                        className="chart-export-btn"
                        onClick={() => exportChart('memory-chart', 'memory-usage')}
                    >
                        💾 Export PNG
                    </button>
                </div>
                <div className="chart-wrapper">
                    <MemoryChart data={data.memory} />
                </div>
            </div>

            <div className="chart-card" id="disk-chart">
                <div className="chart-header">
                    <h2>Disk I/O</h2>
                    <button
                        className="chart-export-btn"
                        onClick={() => exportChart('disk-chart', 'disk-io')}
                    >
                        💾 Export PNG
                    </button>
                </div>
                <div className="chart-wrapper">
                    <DiskChart data={data.disk} />
                </div>
            </div>

            <div className="chart-card" id="disk-usage-chart">
                <div className="chart-header">
                    <h2>Disk Usage (Filesystem)</h2>
                    <button
                        className="chart-export-btn"
                        onClick={() => exportChart('disk-usage-chart', 'disk-usage')}
                    >
                        💾 Export PNG
                    </button>
                </div>
                <div className="chart-wrapper">
                    <DiskUsageChart data={data.diskUsage} />
                </div>
            </div>

            <div className="chart-card" id="network-chart">
                <div className="chart-header">
                    <h2>Network Traffic</h2>
                    <button
                        className="chart-export-btn"
                        onClick={() => exportChart('network-chart', 'network-traffic')}
                    >
                        💾 Export PNG
                    </button>
                </div>
                <div className="chart-wrapper">
                    <NetworkChart data={data.network} />
                </div>
            </div>

            <div className="chart-card" id="process-chart">
                <div className="chart-header">
                    <h2>Process & Context Switch Stats</h2>
                    <button
                        className="chart-export-btn"
                        onClick={() => exportChart('process-chart', 'process-stats')}
                    >
                        💾 Export PNG
                    </button>
                </div>
                <div className="chart-wrapper">
                    <ProcessChart data={data.process} />
                </div>
            </div>
        </div>
    );
}

export default ChartContainer;
