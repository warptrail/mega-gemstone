import React, { useState } from 'react';
import { XORCipher } from '../services/xor';
import WidgetApiService from '../services/widget-api-service';
import goldenSpearOfJustice from '../services/magic-text';
const WidgetForm = ({ widgets, setWidgets }) => {
  const emptyInputs = {
    title: '',
    email: '',
    username: '',
    fullname: '',
    pswd: '',
    other: '',
  };

  const [inputs, setInputs] = useState(emptyInputs);
  const [toggled, setToggled] = useState(false);
  const { title, email, username, fullname, pswd, other } = inputs;

  const onChange = (e) => {
    console.log(inputs);
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // const message = 'message';
  // const encodedMessage = XORCipher.encode('key', message);
  // console.log(message, encodedMessage);

  // const decodeMessage = XORCipher.decode('key', encodedMessage);
  // const differentKey = XORCipher.decode('hello', encodedMessage);

  // console.log('back to -->', decodeMessage);
  // console.log('different key: ', differentKey);

  // * On form submit, create a new widget

  const onFormSubmit = async (e) => {
    // We meed to encrypt the password right before it goes to db

    e.preventDefault();

    const newWidgetFromInputs = {
      title,
      email,
      username,
      fullname,
      pswd,
      other,
    };

    const pswdFromInput = pswd;
    const encodedPswd = XORCipher.encode(goldenSpearOfJustice, pswdFromInput);

    newWidgetFromInputs.pswd = encodedPswd;

    const newWidget = await WidgetApiService.newWidget(newWidgetFromInputs);
    const updateWidgetsState = [...widgets, newWidget];
    setWidgets(updateWidgetsState);
    setInputs(emptyInputs);
    setToggled(false);
  };

  const toggleForm = () => {
    setToggled(!toggled);
    setInputs(emptyInputs);
  };

  const promptNewWidget = () => {
    return (
      <div className="form-header">
        <button
          className={`btn  btn-block btn-${toggled ? 'warning' : 'primary'}`}
          onClick={toggleForm}
        >
          {toggled ? 'Close Form Fields' : 'Create New Widget'}
        </button>
      </div>
    );
  };

  const renderTheForm = () => {
    return (
      <form
        className="d-grid gap-3 mx-5 create-widget-form"
        onSubmit={(e) => onFormSubmit(e)}
        autoComplete="off"
      >
        <input
          className="form-control create-input required"
          type="text"
          name="title"
          required
          placeholder="Title"
          value={title}
          onChange={(e) => onChange(e)}
        />
        <input
          className="form-control create-input required"
          type="text"
          name="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => onChange(e)}
        />
        <input
          className="form-control create-input"
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => onChange(e)}
        />
        <input
          className="form-control create-input pswd"
          type="text"
          name="pswd"
          placeholder="Password"
          required
          minLength={4}
          value={pswd}
          onChange={(e) => onChange(e)}
        />
        <input
          className="form-control create-input"
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={fullname}
          onChange={(e) => onChange(e)}
        />
        <input
          className="form-control create-input"
          type="text"
          name="other"
          placeholder="Other"
          value={other}
          onChange={(e) => onChange(e)}
        />

        <button type="submit" className="btn btn-success btn-block">
          New Widget
        </button>
      </form>
    );
  };

  return (
    <>
      {promptNewWidget()}
      {toggled ? renderTheForm() : ''}
    </>
  );
};

export default WidgetForm;
