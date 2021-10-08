import React, { useState, useEffect } from 'react';
import WidgetApiService from '../services/widget-api-service';

const WidgetEditForm = ({
  updateData,
  widgets,
  setWidgets,
  setView,
  onClickCancel,
}) => {
  const emptyInputs = {
    title: '',
    email: '',
    pswd: '',
    username: '',
    fullname: '',
    other: '',
    color: '',
    logo: '',
  };

  const [inputs, setInputs] = useState(emptyInputs);

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    const patchWidget = await WidgetApiService.updateWidget(
      inputs,
      updateData.w_uid
    );

    const id = updateData.w_uid;

    const widgetsAllIdsArr = widgets.map((w) => w.w_uid);
    const index = widgetsAllIdsArr.indexOf(id);

    let updateWidgetsInState = [...widgets];

    updateWidgetsInState.splice(index, 1, patchWidget[0]);

    setWidgets(updateWidgetsInState);

    // setWidgets(updateWidgetsState);
    setInputs(emptyInputs);
    setView('default');
  };

  // set the input state to match fields from props

  useEffect(() => {
    const { title, email, pswd, username, fullname, logo, color, other } =
      updateData;
    setInputs({
      title: title || '',
      email: email || '',
      pswd: pswd || '',
      username: username || '',
      fullname: fullname || '',
      logo: logo || '',
      color: color || '',
      other: other || '',
    });
  }, [updateData]);

  return (
    <form
      className="edit-widget-form"
      autoComplete="off"
      onSubmit={(e) => onFormSubmit(e)}
    >
      <div className="edit-widget-fieldset">
        <label>Title</label>
        <input
          className="form-control "
          type="text"
          name="title"
          required
          placeholder="Title"
          value={inputs.title}
          onChange={(e) => onChange(e)}
        />
      </div>

      <div className="edit-widget-fieldset">
        <label>Email</label>
        <input
          className="form-control "
          type="text"
          name="email"
          required
          placeholder="Email"
          value={inputs.email}
          onChange={(e) => onChange(e)}
        />
      </div>

      <div className="edit-widget-fieldset">
        <label>Password</label>
        <input
          className="form-control pswd-edit"
          type="text"
          name="pswd"
          placeholder="Password"
          required
          value={inputs.pswd}
          onChange={(e) => onChange(e)}
        />
      </div>

      <div className="edit-widget-fieldset">
        <label>Username</label>
        <input
          className="form-control"
          type="text"
          name="username"
          placeholder="Username"
          value={inputs.username}
          onChange={(e) => onChange(e)}
        />
      </div>

      <div className="edit-widget-fieldset">
        <label>Full Name</label>
        <input
          className="form-control"
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={inputs.fullname}
          onChange={(e) => onChange(e)}
        />
      </div>

      <div className="edit-widget-fieldset">
        <label>Other</label>
        <input
          className="form-control"
          type="text"
          name="other"
          placeholder="Other"
          value={inputs.other}
          onChange={(e) => onChange(e)}
        />
      </div>

      <div className="edit-widget-fieldset">
        <label>Logo</label>
        <input
          className="form-control"
          type="text"
          name="other"
          placeholder="Other"
          value={inputs.other}
          onChange={(e) => onChange(e)}
        />
      </div>

      <div className="edit-widget-fieldset">
        <label>Color</label>
        <input
          className="form-control"
          type="text"
          name="color"
          placeholder="Color"
          value={inputs.color}
          onChange={(e) => onChange(e)}
        />
      </div>

      <button className="btn btn-primary" type="submit">
        Save
      </button>
      <button className="btn btn-warning" type="button" onClick={onClickCancel}>
        Cancel
      </button>
    </form>
  );
};

export default WidgetEditForm;
