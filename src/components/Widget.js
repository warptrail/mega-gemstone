import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { XORCipher } from '../services/xor';
import goldenSpearOfJustice from '../services/magic-text';
import WidgetApiService from '../services/widget-api-service';
import WidgetEditForm from './WidgetEditForm';

const Widget = ({ w_data, widgets, setWidgets }) => {
  const [view, setView] = useState('default');
  const [copy, setCopy] = useState(false);

  // console.log(w_data);
  const {
    user_uid,
    w_color,
    w_created_at,
    w_email,
    w_fullname,
    w_logo,
    w_pswd,
    w_other,
    w_title,
    w_uid,
    w_username,
  } = w_data;

  const encryptedPswd = w_pswd;
  const decryptedPswd = XORCipher.decode(goldenSpearOfJustice, encryptedPswd);

  const formatDataForUpdate = {
    w_uid,
    title: w_title,
    email: w_email,
    pswd: decryptedPswd,
    username: w_username,
    fullname: w_fullname,
    other: w_other,
    logo: w_logo,
    color: w_color,
  };

  console.log(formatDataForUpdate);

  // * On delete button --> delete the widget from database

  const onClickDelete = (e) => {
    setView('delete');
  };
  const onClickForSureDelete = () => {
    console.log('deleting widget # ', w_uid);
    WidgetApiService.deleteWidget(w_uid);

    function arrayRemove(arr, value) {
      return arr.filter(function (ele) {
        return ele.w_uid !== value;
      });
    }

    const updatedWidgets = arrayRemove(widgets, w_uid);
    setWidgets(updatedWidgets);
  };

  // * On edit pull up edit form
  const onClickEdit = () => {
    setView('edit');
  };

  const onClickCancel = () => {
    setView('default');
  };

  // ^ Different Views

  // * Default display view

  const renderDefault = () => {
    // Need to decrypt the password to display correctly

    return (
      <>
        <div className="widget-info">
          <p className="widget-item title">{w_title}</p>
          <p className="widget-item email">{w_email}</p>
          {/* render username, fullname, other conditionally*/}
          {w_username ? (
            <p className="widget-item username">{w_username} </p>
          ) : (
            ''
          )}
          {w_fullname ? (
            <p className="widget-item fullname">{w_fullname} </p>
          ) : (
            ''
          )}
          {w_other ? <p className="widget-item fullname">{w_other} </p> : ''}

          {/* Password Curtain */}
          <div className="outer-pswd">
            <div className="inner-pswd">
              <p className="widget-item pswd">{decryptedPswd}</p>
              <CopyToClipboard
                text={decryptedPswd}
                onCopy={() => {
                  setCopy(true);
                  setTimeout(() => {
                    setCopy(false);
                  }, 2000);
                }}
              >
                <button className="no-styles ">{!copy ? '⏩' : '✅'}</button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
        <div className="widget-button-panel">
          <button className="btn btn-warning" onClick={onClickEdit}>
            edit
          </button>
          <button className="btn btn-danger" onClick={onClickDelete}>
            delete
          </button>
        </div>
      </>
    );
  };

  // * Edit Widget Form

  const renderEditForm = () => {
    return (
      <WidgetEditForm
        updateData={formatDataForUpdate}
        widgets={widgets}
        setWidgets={setWidgets}
        onClickCancel={onClickCancel}
        setView={setView}
      />
    );
  };

  // * Delete Are you sure Warning
  const renderConfirmDelete = () => {
    const onFormSubmit = (e) => {
      e.preventDefault();
      onClickForSureDelete();
    };
    return (
      <form className="confirm-delete-form" onSubmit={(e) => onFormSubmit(e)}>
        <p className="confirm-delete-text">
          Are you sure you want to delete this record? This cannot be undone.
        </p>
        <button className="btn btn-danger" type="submit">
          Delete
        </button>
        <button
          className="btn btn-warning"
          type="button"
          onClick={onClickCancel}
        >
          Cancel
        </button>
      </form>
    );
  };

  // * Control function

  const determineView = () => {
    if (view === 'default') {
      return renderDefault();
    } else if (view === 'edit') {
      return renderEditForm();
    } else if (view === 'delete') {
      return renderConfirmDelete();
    }
  };

  return <li className="widget-list-container">{determineView()}</li>;
};

export default Widget;
