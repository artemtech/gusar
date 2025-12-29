import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function DiskChart({ data }) {
    // Group by device and sample data
    const devices = [...new Set(data.map(d => d.device))];
    const primaryDevice = devices[0]; // Use first device

    const diskData = data
        .filter((d, i) => d.device === primaryDevice && i % 10 === 0)
        .map(d => ({
            time: d.time,
            tps: d.tps,
            read: d.rkBs,
            write: d.wkBs,
            util: d.util
        }));

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={diskData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis
                    dataKey="time"
                    stroke="#cbd5e1"
                    tick={{ fontSize: 12 }}
                    interval="preserveStartEnd"
                />
                <YAxis
                    yAxisId="left"
                    stroke="#cbd5e1"
                    tick={{ fontSize: 12 }}
                    label={{ value: 'KB/s', angle: -90, position: 'insideLeft', fill: '#cbd5e1' }}
                />
                <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#cbd5e1"
                    tick={{ fontSize: 12 }}
                    label={{ value: 'TPS / Util %', angle: 90, position: 'insideRight', fill: '#cbd5e1' }}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#1e293b',
                        border: '1px solid #475569',
                        borderRadius: '8px'
                    }}
                />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="read" stroke="#3b82f6" strokeWidth={2} dot={false} name="Read (KB/s)" />
                <Line yAxisId="left" type="monotone" dataKey="write" stroke="#ef4444" strokeWidth={2} dot={false} name="Write (KB/s)" />
                <Line yAxisId="right" type="monotone" dataKey="tps" stroke="#10b981" strokeWidth={2} dot={false} name="TPS" />
                <Line yAxisId="right" type="monotone" dataKey="util" stroke="#f59e0b" strokeWidth={2} dot={false} name="Util %" />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default DiskChart;
