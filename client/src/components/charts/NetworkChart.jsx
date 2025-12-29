import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function NetworkChart({ data }) {
    // Get unique interfaces and use the first non-loopback one
    const interfaces = [...new Set(data.map(d => d.iface))];
    const primaryInterface = interfaces[0];

    const networkData = data
        .filter((d, i) => d.iface === primaryInterface && i % 10 === 0)
        .map(d => ({
            time: d.time,
            rxPackets: d.rxpck,
            txPackets: d.txpck,
            rxKB: d.rxkB,
            txKB: d.txkB
        }));

    return (
        <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={networkData}>
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
                    label={{ value: 'KB/s', angle: -90, position: 'insideLeft', fill: '#cbd5e1' }}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#1e293b',
                        border: '1px solid #475569',
                        borderRadius: '8px'
                    }}
                />
                <Legend />
                <Area type="monotone" dataKey="rxKB" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="RX (KB/s)" />
                <Area type="monotone" dataKey="txKB" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="TX (KB/s)" />
            </AreaChart>
        </ResponsiveContainer>
    );
}

export default NetworkChart;
