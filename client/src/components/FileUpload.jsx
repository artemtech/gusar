import { useState } from 'react';

function FileUpload({ onFileUpload, loading }) {
    const [dragOver, setDragOver] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => {
        setDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);

        const file = e.dataTransfer.files[0];
        if (file) {
            setSelectedFile(file);
            onFileUpload(file);
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            onFileUpload(file);
        }
    };

    return (
        <div
            className={`file-upload ${dragOver ? 'drag-over' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !loading && document.getElementById('file-input').click()}
        >
            <input
                id="file-input"
                type="file"
                accept=".txt"
                onChange={handleFileSelect}
                disabled={loading}
            />

            <div className="upload-icon">📊</div>
            <h3>Upload SAR File</h3>
            <p>Drag and drop your SAR file here, or click to browse</p>
            <button className="upload-btn" disabled={loading}>
                {loading ? 'Processing...' : 'Select File'}
            </button>

            {selectedFile && !loading && (
                <div className="file-info">
                    ✓ {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </div>
            )}
        </div>
    );
}

export default FileUpload;
