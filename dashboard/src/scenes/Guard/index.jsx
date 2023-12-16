import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, useTheme, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import Header from '../../components/Header';

const Guard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const columns = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'name',
      headerName: 'Name',
      cellClassName: 'name-column--cell',
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: 'phone_no',
      headerName: 'Phone Number',
      // flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box display="flex" justifyContent="space-around">
            
            <Button variant="contained" color="secondary" onClick={() => handleView(row)}>
              View
            </Button>
            <Button variant="contained" color="error" onClick={() => handleDelete(row)}>
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    // Fetch data from the backend
    fetch('/admin/getUsers', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          // Map the backend data to include an 'id' property
          const usersWithIds = data.data.map((user, index) => ({
            ...user,
            id: index + 1, // You can use a unique identifier here
          }));
          setUsers(usersWithIds);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleEdit = (user) => {
    // Handle edit action for the user
    console.log('Edit user:', user);
  };

  // Create a function to open the details modal and populate user details
  const handleView = (user) => {
    setSelectedUser(user);
    setIsDetailsModalOpen(true);
  };

  const handleDelete = (user) => {
    // Show a confirmation dialog to confirm the delete action
    const confirmDelete = window.confirm(`Are you sure you want to delete ${user.name}?`);
    if (confirmDelete) {
      // Send a DELETE request to the backend to delete the user
      fetch(`/admin/deleteUser/${user._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            // If the user is successfully deleted, remove the user from the local state
            const updatedUsers = users.filter((u) => u._id !== user._id);
            setUsers(updatedUsers);
            console.log(`User ${user.name} deleted successfully.`);
          } else {
            console.error(`Error deleting user ${user.name}`);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  //  Create a function to close the details modal
  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
  };

  return (
    <Box m="20px">
      <Header title="Guard" subtitle="Managing the Guard Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <DataGrid rows={users} columns={columns} autoHeight />
        )}
      </Box>

      {/* Step 4: Create the details modal */}
      <Dialog open={isDetailsModalOpen} onClose={handleCloseDetailsModal} fullWidth maxWidth="sm">
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
  {selectedUser && (
    <div>
      <Typography>Name: {selectedUser.name}</Typography>
      <Typography>Age: {selectedUser.age}</Typography>
      <Typography>Mob No : {selectedUser.phone_no}</Typography>
      <Typography>Licence No: {selectedUser.licence_no}</Typography>
      <Typography>Address 1: {selectedUser.address.address1}</Typography>
      <Typography>Address 2: {selectedUser.address.address2}</Typography>
      <Typography>Landmark: {selectedUser.address.landmark}</Typography>
      <Typography>Street: {selectedUser.address.street}</Typography>
      <Typography>City: {selectedUser.address.city}</Typography>
      <Typography>State: {selectedUser.address.state}</Typography>
      <Typography>Postal Code: {selectedUser.address.postalCode}</Typography>
      <Typography>Country: {selectedUser.address.country}</Typography>
      <Typography>Emergency Contact: {selectedUser.alternate_phone_no}</Typography>
    </div>
  )}
</DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDetailsModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Guard;
