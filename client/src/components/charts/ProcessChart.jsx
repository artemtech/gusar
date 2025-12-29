import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function ProcessChart({ data }) {
    // Sample every 10th point for better performance
    const processData = data
        .filter((d, i) => i % 10 === 0)
        .map(d => ({
            time: d.time,
            processes: d.procs,
            contextSwitches: d.cswch
        }));

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={processData}>
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
                    label={{ value: 'Processes/s', angle: -90, position: 'insideLeft', fill: '#cbd5e1' }}
                />
                <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#cbd5e1"
                    tick={{ fontSize: 12 }}
                    label={{ value: 'Context Switches/s', angle: 90, position: 'insideRight', fill: '#cbd5e1' }}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#1e293b',
                        border: '1px solid #475569',
                        borderRadius: '8px'
                    }}
                />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="processes" stroke="#3b82f6" strokeWidth={2} dot={false} name="Processes/s" />
                <Line yAxisId="right" type="monotone" dataKey="contextSwitches" stroke="#10b981" strokeWidth={2} dot={false} name="Context Switches/s" />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default ProcessChart;
