import React, { useState } from 'react';

function App() {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);
    const [isReviewVisible, setIsReviewVisible] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        setData(result.data);
        alert('File uploaded successfully');
    };

    const handleReview = () => {
        setIsReviewVisible(true);
    };

    const handleConfirm = async () => {
        await fetch('/api/confirm-upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data })
        });

        alert('Data uploaded successfully');
        setIsReviewVisible(false);
    };

    return (
        <div className="App">
            <h1>Upfilex File Upload</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            <button onClick={handleReview}>Review</button>

            {isReviewVisible && (
                <div>
                    <h2>Review Uploaded File Data</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Column 1</th>
                                <th>Column 2</th>
                                {/* Add more columns as needed */}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.column1}</td>
                                    <td>{row.column2}</td>
                                    {/* Add more cells as needed */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={handleConfirm}>Confirm Upload</button>
                </div>
            )}
        </div>
    );
}

export default App;
