import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import Header from '../../components/Header';

const ScheduledJob = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [editedJob, setEditedJob] = useState({});
  const [isViewOnly, setIsViewOnly] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'site_id', headerName: 'Site ID' },
    { field: 'user_id', headerName: 'User ID' },
    { field: 'no_of_days', headerName: 'Number of Days' },
    { field: 'start_date', headerName: 'Start Date', type: 'date' },
    { field: 'end_date', headerName: 'End Date', type: 'date' },
    { field: 'start_time', headerName: 'Start Time' },
   
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: ({ row }) => (
        <Box display="flex" justifyContent="space-around">
          
          <Button variant="contained" color="secondary" onClick={() => handleView(row)}>
            View
          </Button>
          <Button variant="contained" color="error" onClick={() => handleDelete(row)}>
            Delete
          </Button>
        </Box>
      ),
    },
  ];
  

  useEffect(() => {
    fetch('/admin/getJobs', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            console.error('Error Response:', errorData);
            throw new Error('Failed to fetch');
          });
        }
        return response.json();
      })
    .then((data) => {
      if (data.data) {
        const jobsWithIds = data.data.map((job, index) => ({
          ...job,
          id: index + 1,
        }));
        setJobs(jobsWithIds);
      }
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      setLoading(false);
    });
  }, []);

  const handleEdit = (job) => {
    console.log("Editing job: ", job);
    const formattedJob = {
      ...job,
      start_date: new Date(job.start_date).toISOString().split('T')[0],
      end_date: new Date(job.end_date).toISOString().split('T')[0]
    };
    setSelectedJob(formattedJob);
    setEditedJob(formattedJob);
    setIsViewOnly(false);
    setIsDetailsModalOpen(true);
  };
  
  const handleView = (job) => {
    const formattedJob = {
      ...job,
      start_date: new Date(job.start_date).toISOString().split('T')[0],
      end_date: new Date(job.end_date).toISOString().split('T')[0]
    };
    setSelectedJob(formattedJob);
    setIsViewOnly(true);
    setIsDetailsModalOpen(true);
  };
  

  const handleDelete = (job) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${job.jobName}?`);
    if (confirmDelete) {
      fetch(`/admin/deleteJob/${job._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      })
      .then((response) => {
        if (response.status === 200) {
          const updatedJobs = jobs.filter((j) => j._id !== job._id);
          setJobs(updatedJobs);
          console.log(`Job ${job.jobName} deleted successfully.`);
        } else {
          console.error(`Error deleting job ${job.jobName}`);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }
  };

  const updateJob = () => {
    fetch(`/admin/updateJob/${editedJob._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ ...editedJob, job_id: editedJob._id })
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          console.error('Error Response:', errorData);
          throw new Error(`Failed to update job: ${JSON.stringify(errorData)}`);
        });
      }
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        const updatedJobs = jobs.map((j) =>
          j._id === editedJob._id ? editedJob : j
        );
        setJobs(updatedJobs);
        setShowNotification(true); 
        setTimeout(() => setShowNotification(false), 3000); 
        setIsDetailsModalOpen(false);
      } else {
        console.error(`Error updating job with ID ${editedJob._id}:`, data);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  };
  

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedJob((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box m="20px">
      {showNotification && (
        <div className="alert alert-success" role="alert">
          Job updated successfully!
        </div>
      )}
      <Header title="Scheduled Jobs" subtitle="All Jobs" />
      <Box m="40px 0 0 0" height="75vh">
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <DataGrid rows={jobs} columns={columns} autoHeight />
        )}
      </Box>

      <Dialog open={isDetailsModalOpen} onClose={handleCloseDetailsModal} fullWidth maxWidth="sm">
        <DialogTitle>Job Details</DialogTitle>
        <DialogContent>
  {selectedJob && (
    <div>
      {console.log("Rendering job in modal: ", selectedJob, editedJob)}
      <TextField
        label="Site ID"
        name="site_id"
        fullWidth
        margin="normal"
        value={isViewOnly ? selectedJob.site_id : editedJob.site_id}
        onChange={handleInputChange}
        disabled={isViewOnly}
      />
      <TextField
        label="User ID"
        name="user_id"
        fullWidth
        margin="normal"
        value={isViewOnly ? selectedJob.user_id : editedJob.user_id}
        onChange={handleInputChange}
        disabled={isViewOnly}
      />
      <TextField
        label="Number of Days"
        name="no_of_days"
        fullWidth
        margin="normal"
        value={isViewOnly ? selectedJob.no_of_days : editedJob.no_of_days}
        onChange={handleInputChange}
        disabled={isViewOnly}
      />
      <TextField
        label="Start Date"
        name="start_date"
        fullWidth
        margin="normal"
        type="date"
        value={isViewOnly ? selectedJob.start_date : editedJob.start_date}
        onChange={handleInputChange}
        disabled={isViewOnly}
      />
      <TextField
        label="End Date"
        name="end_date"
        fullWidth
        margin="normal"
        type="date"
        value={isViewOnly ? selectedJob.end_date : editedJob.end_date}
        onChange={handleInputChange}
        disabled={isViewOnly}
      />
      <TextField
        label="Start Time"
        name="start_time"
        fullWidth
        margin="normal"
        type="time"
        value={isViewOnly ? selectedJob.start_time : editedJob.start_time}
        onChange={handleInputChange}
        disabled={isViewOnly}
      />
      <TextField
        label="End Time"
        name="end_time"
        fullWidth
        margin="normal"
        type="time"
        value={isViewOnly ? selectedJob.end_time : editedJob.end_time}
        onChange={handleInputChange}
        disabled={isViewOnly}
      />
      <TextField
        label="Position"
        name="position"
        fullWidth
        margin="normal"
        value={isViewOnly ? selectedJob.position : editedJob.position}
        onChange={handleInputChange}
        disabled={isViewOnly}
      />
      <TextField
        label="Shift Type"
        name="shift_type"
        fullWidth
        margin="normal"
        value={isViewOnly ? selectedJob.shift_type : editedJob.shift_type}
        onChange={handleInputChange}
        disabled={isViewOnly}
      />
    </div>
  )}
</DialogContent>
        <DialogActions>
          {!isViewOnly && (
            <Button onClick={updateJob} color="primary">
              Save
            </Button>
          )}
          <Button onClick={handleCloseDetailsModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ScheduledJob;
