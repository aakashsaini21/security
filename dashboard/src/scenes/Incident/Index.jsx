import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';

function DailyReport() {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/admin/getDailyReport');
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const data = await response.json();
        setReports(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleOpenModal = (report) => {
    setSelectedReport(report);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedReport(null);
  };

  const renderImages = (imageList) => {
    return imageList.map((image, idx) => (
      <img key={idx} src={`http://localhost:4000/uploads/${image}`} alt="Report" style={{ width: '100px', height: '100px', marginRight: '10px' }} />
    ));
  };

  const renderModalContent = () => {
    return (
      <Box style={{ backgroundColor: 'black', padding: '20px' }}>
        <Typography variant="h6">Report Details</Typography>
        <Typography>Comment: {selectedReport.daily_report_comment}</Typography>
        <Typography>Site ID: {selectedReport.site_id.$oid}</Typography>
        <Typography>User ID: {selectedReport.user_id.$oid}</Typography>
        <Typography>Site Name: {selectedReport.site_id.name}</Typography>
        <Typography>User Name: {selectedReport.user_id.name}</Typography>
        <Typography>Status: {selectedReport.status}</Typography>
        <Typography>Check-in Time: {selectedReport.checkin_time}</Typography>
        <Typography>Incident: {selectedReport.is_incident ? 'Yes' : 'No'}</Typography>
        <Typography>Incident Time: {selectedReport.incident_time}</Typography>
        <div>
          <p>Incident Images:</p>
          {renderImages(selectedReport.incident_images)}
        </div>
        <div>
          <p>Daily Report Images:</p>
          {renderImages(selectedReport.daily_report_images)}
        </div>
      </Box>
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Daily Report</h1>
      {reports.length > 0 ? (
        <table style={{width:"100%"}}>
          <thead>
            <tr>
              <th>User Name</th>
              {/* <th>Site Name</th> */}
              <th>Comment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={index}>
                <td>{report.user_id.name}</td>
                {/* <td>{report.site_id.name}</td> */}
                <td>{report.daily_report_comment}</td>
                <td>
                  <Button variant="contained" color="primary" onClick={() => handleOpenModal(report)}>
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No reports available.</p>
      )}

      {selectedReport && (
        <Modal open={openModal} onClose={handleCloseModal}>
          {renderModalContent()}
        </Modal>
      )}
    </div>
  );
}

export default DailyReport;
