import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { parseSARFile } from './parser.js';
import { readFileSync } from 'fs';

const app = express();
const PORT = 3001;

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(cors());
app.use(express.json());

let cachedData = null;

// Upload and parse SAR file
app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const content = req.file.buffer.toString('utf-8');
        cachedData = parseSARFile(content);

        res.json({
            success: true,
            message: 'File parsed successfully',
            stats: {
                cpu: cachedData.cpu.length,
                memory: cachedData.memory.length,
                disk: cachedData.disk.length,
                network: cachedData.network.length,
                process: cachedData.process.length,
                swap: cachedData.swap.length
            }
        });
    } catch (error) {
        console.error('Error parsing file:', error);
        res.status(500).json({ error: 'Failed to parse file' });
    }
});

// Get parsed data
app.get('/api/data', (req, res) => {
    if (!cachedData) {
        return res.status(404).json({ error: 'No data available. Please upload a file first.' });
    }
    res.json(cachedData);
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
