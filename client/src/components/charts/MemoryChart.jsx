import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function MemoryChart({ data }) {
    // Sample every 10th point for better performance
    const memoryData = data
        .filter((d, i) => i % 10 === 0)
        .map(d => ({
            time: d.time,
            used: (d.kbmemused / 1024 / 1024).toFixed(2), // Convert to GB
            free: (d.kbmemfree / 1024 / 1024).toFixed(2),
            cached: (d.kbcached / 1024 / 1024).toFixed(2),
            buffers: (d.kbbuffers / 1024 / 1024).toFixed(2)
        }));

    return (
        <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={memoryData}>
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
                    label={{ value: 'Memory (GB)', angle: -90, position: 'insideLeft', fill: '#cbd5e1' }}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#1e293b',
                        border: '1px solid #475569',
                        borderRadius: '8px'
                    }}
                />
                <Legend />
                <Area type="monotone" dataKey="used" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="Used (GB)" />
                <Area type="monotone" dataKey="cached" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} name="Cached (GB)" />
                <Area type="monotone" dataKey="buffers" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} name="Buffers (GB)" />
                <Area type="monotone" dataKey="free" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Free (GB)" />
            </AreaChart>
        </ResponsiveContainer>
    );
}

export default MemoryChart;
