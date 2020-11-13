import React from 'react';

export const Form = ({ onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input className="form-control" id="name" />
            </div>

            <div className="form-group">
                <label htmlFor="instructor">Instructor</label>
                <input className="form-control" id="instructor" />
            </div>

            <div className='form-group'>
                <label htmlFor="time">Time</label>
                <select className="custom-select mr-sm-2" id="time">
                    <option defaultValue="0">Choose...</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div>

            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">
                    Submit
                    
                </button>

            </div>
        </form>
   );
};

export default Form;