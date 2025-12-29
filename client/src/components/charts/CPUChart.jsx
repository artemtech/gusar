import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function CPUChart({ data }) {
    // Filter for 'all' CPU data and sample every 10th point for better performance
    const cpuAllData = data
        .filter((d, i) => d.cpu === 'all' && i % 10 === 0)
        .map(d => ({
            time: d.time,
            user: d.usr,
            system: d.sys,
            iowait: d.iowait,
            idle: d.idle
        }));

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={cpuAllData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis
                    dataKey="time"
                    stroke="#cbd5e1"
                    tick={{ fontSize: 12 }}
                    interval="preserveStartEnd"
                />
                <YAxis
                    stroke="#cbd5e1"
                    tick={{ fontSize: 12 }}
                    label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft', fill: '#cbd5e1' }}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#1e293b',
                        border: '1px solid #475569',
                        borderRadius: '8px'
                    }}
                />
                <Legend />
                <Line type="monotone" dataKey="user" stroke="#3b82f6" strokeWidth={2} dot={false} name="User %" />
                <Line type="monotone" dataKey="system" stroke="#ef4444" strokeWidth={2} dot={false} name="System %" />
                <Line type="monotone" dataKey="iowait" stroke="#f59e0b" strokeWidth={2} dot={false} name="I/O Wait %" />
                <Line type="monotone" dataKey="idle" stroke="#10b981" strokeWidth={2} dot={false} name="Idle %" />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default CPUChart;
