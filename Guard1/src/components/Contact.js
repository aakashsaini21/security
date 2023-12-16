// src/components/Contact.js
import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send an email via EmailJS
    emailjs.send('service_7zjwn78', 'template_w7bqfn9', formData, 'j44QpQHr3oPbQXIBM')
      .then((response) => {
         console.log('SUCCESS!', response.status, response.text);
         // Here you can clear the formData or display a success message
         alert('Message successfully sent!');
         setFormData({ user_name: '', user_email: '', message: '' }); // Clear the form
      }, (err) => {
         console.log('FAILED...', err);
         // Here you can display an error message
         alert('Failed to send the message, please try again.');
      });
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center mb-6">Get in Touch</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="user_name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="user_name"
            id="user_name"
            value={formData.user_name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="user_email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="user_email"
            id="user_email"
            value={formData.user_email}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
