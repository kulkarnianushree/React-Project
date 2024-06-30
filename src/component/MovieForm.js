// MovieForm.js

import React, { useState } from "react";
import "./MovieForm.css"; // Import CSS file

const MovieForm = (props) => {
  const [initialData, setInitialData] = useState({
    title: '',
    date: '',
    opening_text: ''
  });

  const TitleChangeHandler = (event) => {
    setInitialData((prevdata) => ({
      ...prevdata,
      title: event.target.value
    }));
  };

  const DateChangeHandler = (event) => {
    setInitialData((prevdata) => ({
      ...prevdata,
      date: event.target.value
    }));
  };

  const TextChangeHandler = (event) => {
    setInitialData((prevdata) => ({
      ...prevdata,
      opening_text: event.target.value
    }));
  };

  const FormSubmitHandler = (event) => {
    event.preventDefault();
    props.onsetdata(initialData);
  };

  return (
    <form onSubmit={FormSubmitHandler} className="form-container">
      <div>
        <label htmlFor="Title">Title</label>
        <input
          id="Title"
          type="text"
          onChange={TitleChangeHandler}
          value={initialData.title}
        />
      </div>
      <div>
        <label htmlFor="Date">Release Date</label>
        <input
          id="Date"
          type="date"
          onChange={DateChangeHandler}
          value={initialData.date}
        />
      </div>
      <div>
        <label htmlFor="OT">Opening Text</label>
        <input
          id="OT"
          type="text"
          onChange={TextChangeHandler}
          value={initialData.opening_text}
        />
      </div>
      <div>
        <button>Add Movies</button>
      </div>
    </form>
  );
};

export default MovieForm;
