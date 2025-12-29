import { useState } from 'react';
import axios from 'axios';
import FileUpload from './components/FileUpload';
import ChartContainer from './components/ChartContainer';
import './index.css';

const API_URL = 'http://localhost:3001/api';

function App() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileUpload = async (file) => {
        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const uploadResponse = await axios.post(`${API_URL}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (uploadResponse.data.success) {
                const dataResponse = await axios.get(`${API_URL}/data`);
                setData(dataResponse.data);
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to upload and parse file');
            console.error('Upload error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app">
            <header className="header">
                <h1>GUSAR</h1>
                <p>SAR Data Visualization Tool</p>
            </header>

            <FileUpload onFileUpload={handleFileUpload} loading={loading} />

            {error && (
                <div className="error">
                    <strong>Error:</strong> {error}
                </div>
            )}

            {loading && (
                <div className="loading">
                    <div className="loading-spinner"></div>
                    <p>Parsing SAR file...</p>
                </div>
            )}

            {data && !loading && <ChartContainer data={data} />}
        </div>
    );
}

export default App;
