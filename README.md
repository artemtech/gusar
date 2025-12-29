# GUSAR - GUI SAR Data Visualizer

A modern web application for visualizing SAR (System Activity Report) data with interactive charts and export capabilities.

## Features

- 📊 **Interactive Charts**: Visualize CPU, Memory, Disk I/O, Network, and Process statistics
- 📤 **File Upload**: Drag & drop or browse to upload SAR files
- 💾 **Export**: Download individual charts as PNG or all charts as ZIP
- 🎨 **Modern UI**: Beautiful dark theme with smooth animations
- ⚡ **Fast**: Optimized data sampling for large SAR files

## Prerequisites

- Node.js 18+
- npm or yarn

## Installation

### Backend Setup

```bash
cd server
npm install
```

### Frontend Setup

```bash
cd client
npm install
```

## Running the Application

### Start the Backend Server

```bash
cd server
npm start
```

The server will run on `http://localhost:3001`

### Start the Frontend

```bash
cd client
npm run dev
```

The application will open at `http://localhost:3000`

## Usage

1. **Upload SAR File**:
   - Drag and drop your SAR file (output from `sar -A -f`) onto the upload area
   - Or click to browse and select the file

2. **View Charts**:
   - CPU Usage: User, System, I/O Wait, and Idle percentages
   - Memory Usage: Used, Cached, Buffers, and Free memory
   - Disk I/O: Read/Write throughput, TPS, and utilization
   - Disk Usage: Disk usage percentage
   - Network Traffic: RX/TX throughput
   - Process Stats: Process creation and context switches

3. **Export Charts**:
   - Click "Export PNG" on any chart to download it individually
   - Click "Export All Charts (ZIP)" to download all charts at once

## SAR File Format

The application expects SAR output generated with:
```bash
ls /var/log/sysstat/sa?? | xargs -i sar -A -f {}  >  /tmp/sar_$(uname -n).txt
echo "-- df --" >> /tmp/sar_$(uname -n).txt
df >> /tmp/sar_$(uname -n).txt
echo "-- end df --" >> /tmp/sar_$(uname -n).txt
```

## Technology Stack

### Backend
- Node.js + Express
- Multer (file uploads)
- Custom SAR parser

### Frontend
- React 18
- Vite
- Recharts (charting library)
- html2canvas (PNG export)
- JSZip (ZIP creation)

## Project Structure

```
gusar/
├── server/
│   ├── package.json
│   ├── server.js
│   └── parser.js
├── client/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── components/
│       │   ├── FileUpload.jsx
│       │   ├── ChartContainer.jsx
│       │   └── charts/
│       │       ├── CPUChart.jsx
│       │       ├── MemoryChart.jsx
│       │       ├── DiskChart.jsx
│       │       ├── NetworkChart.jsx
│       │       └── ProcessChart.jsx
└── README.md
└── docker-compose.yaml
└── docker/
    └── Dockerfile.client
    └── Dockerfile.server
    └── nginx.conf
```
## Using docker

```bash
# build image first
docker compose build app
docker compose build backend

# start the frontend and backend
docker compose up -d

# access
access via browser at http://localhost:3000
```


## License

MIT
