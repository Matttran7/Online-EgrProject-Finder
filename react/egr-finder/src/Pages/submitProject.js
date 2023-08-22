import React, { useState } from 'react';
import './submitProjectStyle.css';
import { useNavigate } from "react-router-dom";


function SubmitProject() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    projectName: '',
    groupName: '',
    projectDescription: '',
    projectContact: ''
  });

  const handleSubmit = async () => {
    try {
      // Send form data to backend
      const response = await fetch('/api/submitProject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        navigate('/thankyouSubmit');
      } else {
        console.error('Error submitting form');
      }
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div>
      <h2 className='submitYourProject'>submit project</h2>
      <form className='submitForm' onSubmit={handleSubmit}>
        <label htmlFor="projectName">Project Name </label>
        <input type="text" id="projectName" name="projectName"  onChange={handleChange} required/>
        <br />
        <label htmlFor="groupName">Group Name </label>
        <input type="text" id="groupName" name="groupName"  onChange={handleChange} required/>
        <br /><br />
        <label htmlFor="projectDescription">Project Description</label><br />
        <textarea id="projectDescription" name="projectDescription"  onChange={handleChange} required></textarea>
        <br /><br />
        <label htmlFor="projectContact">Contact for Project (number,email,etc)</label><br />
        <input type="text" id="projectContact" name="projectContact"  onChange={handleChange} required/>
        <br /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SubmitProject;
