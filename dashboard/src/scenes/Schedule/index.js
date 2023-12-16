import React, { useState,useEffect } from 'react'
import { Button, Form } from 'react-bootstrap';


const ScheduleJob = () => {
    const [site_id, setSite_id] = useState('')
    const [user_id, setUser_id] = useState('')
    const [no_of_days, setNo_of_days] = useState('')
    //site details
    const [start_date, setStart_date] = useState('');
    const [end_date, setEnd_date] = useState('');
    const [position, setPosition] = useState('');
    const [start_time, setStart_time] = useState('');
    const [end_time, setEnd_time] = useState('');
    const [shift_type, setShift_type] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');



    const handleFormSubmit = async (e) =>{
        e.preventDefault()
        try {
          // Get the token from local storage
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error("No token found. Please login.");
          }
    
          // Create a new JSON object with all form data
          const jobData = {
            site_id,
            user_id,
            no_of_days,
            start_date,
            end_date,
            position,
            start_time,
            end_time,
            shift_type
          };
    
          // Make the API call
          const response = await fetch('/admin/addJob', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(jobData)
          });
    
          // Handle the response
          const data = await response.json();
          // if (response.ok) {
          //   console.log('Registration Successful:', data);
          //   // You can navigate or display a success message
          // } else {
          //   console.error('Registration Error:', data);
          //   // Handle error responses
          // }
          if (response.ok) {
            console.log('Registration Successful:', data);
            setShowAlert(true);
            setAlertMessage('Job successfully scheduled!');
        
            // Clear the form
            setSite_id('');
            setUser_id('');
            setNo_of_days('');
            setStart_date('');
            setEnd_date('');
            setPosition('');
            setStart_time('');
            setEnd_time('');
            setShift_type('');
        } else {
            console.error('Registration Error:', data);
            setShowAlert(true);
            setAlertMessage('Error scheduling the job. Please try again.');
        }
        
        } catch (error) {
          console.error('API Call Failed:', error);
          // Handle network or other errors
        }    }

        /* get data of user and site to show in list */

        const [users, setUsers] = useState([]);
    const [sites, setSites] = useState([]);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/admin/getInactiveGuard', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.error || 'Failed to fetch users.');
            }
            setUsers(responseData.data);
            console.log("Guard Data : " + responseData.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    

    const fetchSites = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('/admin/getSites', {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      const responseData = await response.json();
      setSites(responseData.data);  // Use responseData.data to get the array of sites
      console.log("Site Data : " + responseData.data);
  };
  

        fetchUsers();
        fetchSites();
    }, []);
    return (
    <div>
      {showAlert && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
                {alertMessage}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setShowAlert(false)}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )}
        <Form  onSubmit={handleFormSubmit}>
        <div className="row mb-2">
                    <div className="col">
                        <select 
                            value={site_id} 
                            onChange={(e) => setSite_id(e.target.value)} 
                            className="form-control" 
                            aria-label="Site ID">
                            <option value="">Select Site</option>
                            {sites.map(site => <option key={site._id} value={site._id}>{site.site_name}</option>)}

                        </select>
                    </div>
                    <div className="col">
                        <select 
                            value={user_id} 
                            onChange={(e) => setUser_id(e.target.value)} 
                            className="form-control" 
                            aria-label="User ID">
                            <option value="">Select User</option>
                            {users.map(user => <option key={user._id} value={user._id}>{user.name}</option>)}
                        </select>
                    </div>
        </div>

        <div className="row mb-2">
          <div className="col">
          <select
            name="shift_type"
            value={shift_type}
            onChange={(e) => setShift_type(e.target.value)}
            className="form-control" aria-label="Shift Type"
          >
            <option value="">Select Shift Type</option>
            <option value="full">Full</option>
            <option value="main">Half</option>
            <option value="gate">Gate</option>
            <option value="outer">Outer</option>
          </select>
            </div>
          <div className="col">
            <input type="text"
            placeholder="No Of Days"
            value={no_of_days}
            onChange={(e) => setNo_of_days(e.target.value)} className="form-control" aria-label="No Of Days"/>
          </div>
        </div>
        
        <div className="row mb-2">
          <div className="col">
            <input type="date"
            placeholder="Start Date"
            value={start_date}
            onChange={(e) => setStart_date(e.target.value)} className="form-control" aria-label="Start Date"/>
          </div>
          <div className="col">
            <input type="date"
            placeholder="End Date"
            value={end_date}
            onChange={(e) => setEnd_date(e.target.value)} className="form-control" aria-label="End Date"/>
          </div>
          <div className="col">
            <input type="time"
            placeholder="Start Time"
            value={start_time}
            onChange={(e) => setStart_time(e.target.value)} className="form-control" aria-label="Start Time"/>
            </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <input type="time"
            placeholder="End Time"
            value={end_time}
            onChange={(e) => setEnd_time(e.target.value)} className="form-control" aria-label="End Time"/>
          </div>
          <div className="col">
            <input type="text"
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)} className="form-control" aria-label="Position"/>
          </div>
        </div>

        <Button type="submit" className="sign-in-btn">Schedule Job </Button>
        </Form>
    </div>
  )
}

export default ScheduleJob