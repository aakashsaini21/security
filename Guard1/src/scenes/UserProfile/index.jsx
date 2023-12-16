import React, { useState, useEffect } from 'react';
import './UserProfile.css'; // Import the CSS file

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/user/getProfile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Profile fetch failed');
        }

        const profileData = await response.json();
        setUserData(profileData.data);
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      {userData && (
        <div className="profile-fields">
          <label>Name:</label>
          <input type="text" value={userData.name} readOnly />

          <label>Email:</label>
          <input type="email" value={userData.email} readOnly />

          <label>Licence No:</label>
          <input type="text" value={userData.licence_no} readOnly />

          <label>Status:</label>
          <input type="text" value={userData.status} readOnly />

          <label>Age:</label>
          <input type="text" value={userData.age || 'N/A'} readOnly />

          <label>Guardian Name:</label>
          <input type="text" value={userData.guardian_name || 'N/A'} readOnly />

          <label>Guardian Number:</label>
          <input type="text" value={userData.guardian_number || 'N/A'} readOnly />

          <label>Address:</label>
          <input type="text" value={`${userData.address.address1}, ${userData.address.city}, ${userData.address.state}, ${userData.address.postalCode}, ${userData.address.country}`} readOnly />

          <label>Marital Status:</label>
          <input type="text" value={userData.married_status ? 'Married' : 'Single'} readOnly />

          <label>Blood Group:</label>
          <input type="text" value={userData.blood_group || 'N/A'} readOnly />

          <label>Phone Number:</label>
          <input type="text" value={userData.phone_no || 'N/A'} readOnly />

          <label>Alternate Phone Number:</label>
          <input type="text" value={userData.alternate_phone_no || 'N/A'} readOnly />

          {/* {userData.profile_image && (
            <div className="profile-image">
              <img src={userData.profile_image} alt="Profile" />
            </div>
          )} */}

        </div>
      )}

    </div>
  );
};

export default UserProfile;
