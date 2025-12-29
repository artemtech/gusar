import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

function DiskUsageChart({ data }) {
    if (!data || data.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#cbd5e1' }}>
                No disk usage data available
            </div>
        );
    }

    // Convert KB to GB and prepare data
    const diskData = data.map(d => ({
        filesystem: d.filesystem.replace('/dev/', ''),
        mountPoint: d.mountPoint,
        usedGB: (d.used / 1024 / 1024).toFixed(2),
        availableGB: (d.available / 1024 / 1024).toFixed(2),
        totalGB: (d.size / 1024 / 1024).toFixed(2),
        usePercent: d.usePercent
    }));

    // Color based on usage percentage
    const getColor = (percent) => {
        if (percent >= 90) return '#ef4444'; // Red
        if (percent >= 75) return '#f59e0b'; // Orange
        return '#10b981'; // Green
    };

    return (
        <div>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={diskData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                    <XAxis
                        type="number"
                        domain={[0, 100]}
                        stroke="#cbd5e1"
                        tick={{ fontSize: 12 }}
                        label={{ value: 'Disk Usage (%)', position: 'insideBottom', offset: -2, fill: '#cbd5e1' }}
                    />
                    <YAxis
                        type="category"
                        dataKey="mountPoint"
                        stroke="#cbd5e1"
                        tick={{ fontSize: 12 }}
                        width={100}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1e293b',
                            border: '1px solid #475569',
                            borderRadius: '8px',
                        }}
                        formatter={(value, name, props) => {
                            if (name === 'usePercent') {
                                return [`${value}%`, 'Usage'];
                            }
                            return value;
                        }}
                    />
                    <Bar dataKey="usePercent" name="Usage %">
                        {diskData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getColor(entry.usePercent)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>

            {/* Disk details table */}
            <div style={{ marginTop: '2.5rem', overflowX: 'auto' }}>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '0.9rem'
                }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #475569' }}>
                            <th style={{ padding: '0.75rem', textAlign: 'left', color: '#cbd5e1' }}>Filesystem</th>
                            <th style={{ padding: '0.75rem', textAlign: 'left', color: '#cbd5e1' }}>Mount Point</th>
                            <th style={{ padding: '0.75rem', textAlign: 'right', color: '#cbd5e1' }}>Total</th>
                            <th style={{ padding: '0.75rem', textAlign: 'right', color: '#cbd5e1' }}>Used</th>
                            <th style={{ padding: '0.75rem', textAlign: 'right', color: '#cbd5e1' }}>Available</th>
                            <th style={{ padding: '0.75rem', textAlign: 'right', color: '#cbd5e1' }}>Use%</th>
                        </tr>
                    </thead>
                    <tbody>
                        {diskData.map((disk, index) => (
                            <tr key={index} style={{ borderBottom: '1px solid #334155' }}>
                                <td style={{ padding: '0.75rem', color: '#f1f5f9' }}>{disk.filesystem}</td>
                                <td style={{ padding: '0.75rem', color: '#f1f5f9' }}>{disk.mountPoint}</td>
                                <td style={{ padding: '0.75rem', textAlign: 'right', color: '#cbd5e1' }}>{disk.totalGB} GB</td>
                                <td style={{ padding: '0.75rem', textAlign: 'right', color: '#cbd5e1' }}>{disk.usedGB} GB</td>
                                <td style={{ padding: '0.75rem', textAlign: 'right', color: '#cbd5e1' }}>{disk.availableGB} GB</td>
                                <td style={{
                                    padding: '0.75rem',
                                    textAlign: 'right',
                                    color: getColor(disk.usePercent),
                                    fontWeight: '600'
                                }}>
                                    {disk.usePercent}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DiskUsageChart;
