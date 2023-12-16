import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const GuardRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [aadharNo, setAadharNo] = useState('');
  const [licenceNo, setLicenceNo] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [guardianNumber, setGuardianNumber] = useState('');
  const [age, setAge] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [alternatePhoneNo, setAlternatePhoneNo] = useState('');
  const [lastJob, setLastJob] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');

  // State variables for address fields
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [landmark, setLandmark] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get the token from local storage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("No token found. Please login.");
      }

       // Construct the address object
       const addressData = {
        address1,
        address2,
        landmark,
        street,
        city,
        state,
        postalCode,
        country,
      };

      // Create a new JSON object with all form data
      const guardData = {
        name,
        email,
        password,
        aadharNo,
        licenceNo,
        guardianName,
        guardianNumber,
        age,
        phoneNo,
        alternatePhoneNo,
        lastJob,
        bloodGroup,
        address: addressData, // Add address object
      };

      // Make the API call
      const response = await fetch('/admin/addUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(guardData)
      });

      // Handle the response
      const data = await response.json();
      if (response.ok) {
        console.log('Registration Successful:', data);
        // You can navigate or display a success message
      } else {
        console.error('Registration Error:', data);
        // Handle error responses
      }
    } catch (error) {
      console.error('API Call Failed:', error);
      // Handle network or other errors
    }
  };

  return (
    <>
      <h2>REGISTER GUARD</h2>
      <Form onSubmit={handleFormSubmit}>
      {/* --------------------------------------- */}
      <div className="row mb-3">
          <div className="col">
            <input type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)} className="form-control" aria-label="Name"/>
          </div>
          <div className="col">
            <input type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} className="form-control" aria-label="Email"/>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <input type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} className="form-control" aria-label="Password" autoComplete="new-password" 
            // autoComplete will block the password fill
            />
          </div>
          <div className="col">
            <input type="text"
            placeholder="Passport Number"
            value={aadharNo}
            onChange={(e) => setAadharNo(e.target.value)}className="form-control" aria-label="Aadhar Number"/>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <input type="text"
            placeholder="License Number"
            value={licenceNo}
            onChange={(e) => setLicenceNo(e.target.value)}className="form-control" aria-label="License Number"/>
          </div>
          <div className="col">
            <input type="text"
            placeholder="Guardian Name"
            value={guardianName}
            onChange={(e) => setGuardianName(e.target.value)} className="form-control" aria-label="Position"/>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <input type="text"
            placeholder="Guardian Phone Number"
            value={guardianNumber}
            onChange={(e) => setGuardianNumber(e.target.value)} className="form-control" aria-label="Parent Phone Number"/>
          </div>
          <div className="col">
            <input type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)} className="form-control" aria-label="Age"/>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <input type="text"
            placeholder="Phone Number"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)} className="form-control" aria-label="Phone Number"/>
          </div>
          <div className="col">
            <input type="text"
            placeholder="Alternate Phone Number"
            value={alternatePhoneNo}
            onChange={(e) => setAlternatePhoneNo(e.target.value)} className="form-control" aria-label="Alternate Phone Number"/>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <input type="text"
            placeholder="Last Job"
            value={lastJob}
            onChange={(e) => setLastJob(e.target.value)} className="form-control" aria-label="Last Job"/>
          </div>
          <div className="col">
            <input type="text"
            placeholder="Blood Group"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)} className="form-control" aria-label="Blood Group"/>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <input type="text"
            placeholder="Address Line 1"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)} className="form-control" aria-label="Address Line 1"/>
          </div>
          <div className="col">
            <input type="text"
            placeholder="Address Line 2"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)} className="form-control" aria-label="Address Line 2"/>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <input type="text"
            placeholder="Landmark"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)} className="form-control" aria-label="Landmark"/>
          </div>
          <div className="col">
            <input type="text"
            placeholder="Street"
            value={street}
            onChange={(e) => setStreet(e.target.value)} className="form-control" aria-label="Street"/>
          </div>
          <div className="col">
            <input type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}className="form-control" aria-label="City"/>
          </div>
        </div>

        <div className="row mb-3">
          
          <div className="col">
            <input type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}className="form-control" aria-label="State"/>
          </div>
          <div className="col">
            <input type="text"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)} className="form-control" aria-label="Postal Code"/>
          </div>
          <div className="col">
            <input type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)} className="form-control" aria-label="Country"/>
          </div>
        </div>
        <Button type="submit" className="btn btn-primary">
          Add Guard
        </Button>
      </Form>
    </>
  );
};

export default GuardRegister;
