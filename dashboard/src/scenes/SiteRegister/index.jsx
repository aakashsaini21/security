import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';


const SiteRegister = () => {
    const [site_name, setSite_name] = useState('')
    const [any_prequation, setAny_prequation] = useState('')
    const [servelance_type, setServelance_type] = useState('')
    //site details
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [landmark, setLandmark] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [nearest_police_station,setNearest_police_station] = useState('');
    const [nearest_fire_brigade, setNearest_fire_brigade] = useState('')
    //owner detail
    const [name, setName] =useState('')
    const [phone_no, setPhone_no] =useState('')
    const [alternate_phone_no, setAlternate_phone_no] =useState('')
    const [email, setEmail] =useState('')


    const handleFormSubmit = async (e) =>{
        e.preventDefault()
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
            nearest_police_station,
            nearest_fire_brigade
          };

          const prequation = [any_prequation];

          const ownerData ={
            name,
            phone_no,
            alternate_phone_no,
            email
          }
    
          // Create a new JSON object with all form data
          const siteData = {
            site_name,
            any_prequation: prequation,
            servelance_type,
            address: addressData, // Add address object
            owner_detail:ownerData
          };
    
          // Make the API call
          const response = await fetch('/admin/addSite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(siteData)
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
        }    }
    return (
    <div>
        <Form  onSubmit={handleFormSubmit}>
        <div className="row mb-2">
          <div className="col">
            <input type="text" placeholder="Site name" value={site_name} onChange={(e) => setSite_name(e.target.value)} className="form-control" aria-label="Site name"/>
            </div>
          <div className="col">
            <input type="text" placeholder="Any prequation" value={any_prequation} onChange={(e) => setAny_prequation(e.target.value)} className="form-control" aria-label="Any Prequation"/>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col">
          <select
            name="servelance_type"
            value={servelance_type}
            onChange={(e) => setServelance_type(e.target.value)}
            className="form-control" aria-label="Servelance Type"
          >
            <option value="">Select Surveillance Type</option>
            <option value="full">Full</option>
            <option value="main">Main</option>
            <option value="gate">Gate</option>
            <option value="outer">Outer</option>
          </select>
            </div>
          <div className="col">
            <input type="text"
            placeholder="Address Line 1"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)} className="form-control" aria-label="Address Line 1"/>
          </div>
        </div>
        
        <div className="row mb-2">
          <div className="col">
            <input type="text"
            placeholder="Address Line 2"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)} className="form-control" aria-label="Address Line 2"/>
          </div>
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
        </div>
        {/* Address */}

        <div className="row mb-3">
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
            onChange={(e) => setCity(e.target.value)} className="form-control" aria-label="City"/>
          </div>
          <div className="col">
            <input type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)} className="form-control" aria-label="State"/>
            </div>
        </div>


        <div className="row mb-3">
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
          <div className="col">
            <input type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)} className="form-control" aria-label="State"/>
            {/* chnage this to file upload */}
            </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <input type="text"
            placeholder="Fire Station Full Address"
            value={nearest_fire_brigade}
            onChange={(e) => setNearest_fire_brigade(e.target.value)} className="form-control" aria-label="Fire Station"/>
          </div>
          <div className="col">
            <input type="text"
            placeholder="Polic Station Full Address "
            value={nearest_police_station}
            onChange={(e) => setNearest_police_station(e.target.value)} className="form-control" aria-label="Polic Station"/>
          </div>
        </div>


        {/* owner details */}
        <div className="row mb-3">
          <div className="col">
            <input type="text"
            placeholder="Owner Name"
            value={name}
            onChange={(e) => setName(e.target.value)} className="form-control" aria-label="Owner Name"/>
          </div>
          <div className="col">
            <input type="text"
            placeholder="Owner Phone No"
            value={phone_no}
            onChange={(e) => setPhone_no(e.target.value)} className="form-control" aria-label="Owner Phone No"/>
          </div>
          <div className="col">
            <input type="text"
            placeholder="Alternate Phone No"
            value={alternate_phone_no}
            onChange={(e) => setAlternate_phone_no(e.target.value)} className="form-control" aria-label="Alternate Phone No"/>
            {/* chnage this to file upload */}
            </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <input type="text"
            placeholder="james@james.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)} className="form-control" aria-label="Owner Email"/>
          </div>
        </div>
        {/* owner details end */}

        <Button type="submit" className="sign-in-btn">Add Site </Button>
        </Form>
    </div>
  )
}

export default SiteRegister