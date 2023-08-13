import React from 'react';
import './submitProjectStyle.css';

function SubmitProject() {
  const handleSubmit = () => {
  };

  return (
    <div>
      <h2 className='submitYourProject'>submit project</h2>
      <form className='submitForm' onSubmit={handleSubmit}>
        <label htmlFor="projectName">Project Name </label>
        <input type="text" id="projectName" name="projectName" required/>
        <br />
        <label htmlFor="groupName">Group Name </label>
        <input type="text" id="groupName" name="groupName" required/>
        <br /><br />
        <label htmlFor="projectDescription">Project Description</label><br />
        <textarea id="projectDescription" name="projectDescription" required></textarea>
        <br /><br />
        <label htmlFor="projectContact">Contact for Project (number,email,etc)</label><br />
        <input type="text" id="projectContact" name="projectContact" required/>
        <br /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SubmitProject;
