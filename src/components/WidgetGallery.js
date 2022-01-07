import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

import WidgetApiService from '../services/widget-api-service';
import { XORCipher } from '../services/xor';
import goldenSpearOfJustice from '../services/magic-text';

// * Components
import WidgetSearch from './WidgetSearch';
import WidgetCreateForm from './WidgetCreateForm';
import Widget from './Widget';
import Sort from './Sort';

const WidgetGallery = () => {
  const [widgets, setWidgets] = useState([]);
  const [search, setSearch] = useState('');

  const fetchWidgets = async (byName) => {
    const res = await WidgetApiService.getWidgets(byName);
    setWidgets(res);
  };

  useEffect(() => {
    // * On page load, fetch all widgets
    fetchWidgets(false);
  }, []);

  // * Render the widgets dependent on the search string
  // * If search.length === 0 then return all widgets

  const filterWidgets = widgets.filter((w) => {
    if (widgets.length === 0) {
      return false;
    }

    const titleMatch = w.w_title.toLowerCase().includes(search.toLowerCase());

    return titleMatch;
  });

  // * Set the search input to state
  const handleSearchInput = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const renderWidgets = () => {
    const jsxWidgets = filterWidgets.map((widget) => {
      const widgetData = {
        user_uid: widget.user_uid,
        w_uid: widget.w_uid,
        w_title: widget.w_title,
        w_email: widget.w_email,
        w_pswd: widget.w_pswd,
        w_username: widget.w_username,
        w_fullname: widget.w_fullname,
        w_other: widget.w_other,
        w_color: widget.w_color,
        w_logo: widget.w_logo,
        w_created_at: widget.w_created_at,
      };
      return (
        <Widget
          key={widget.w_uid}
          w_data={widgetData}
          widgets={widgets}
          setWidgets={setWidgets}
        />
      );
    });
    return jsxWidgets;
  };

  const createAndDownloadPdf = async () => {
    const widgetsByName = await WidgetApiService.getWidgets(true);

    const pdfData = widgetsByName.map((w) => {
      const encryptedPswd = w.w_pswd;
      const pdfDataItem = {
        service: w.w_title,
        email: w.w_email,
        username: w.w_username,
        pswd: XORCipher.decode(goldenSpearOfJustice, encryptedPswd),
      };
      return pdfDataItem;
    });

    axios
      .post('http://localhost:8082/api/widget/create-pdf', pdfData)
      .then(() =>
        axios.get('http://localhost:8082/api/widget/fetch-pdf', {
          responseType: 'blob',
          headers: { token: sessionStorage.getItem('token') },
        })
      )
      .then((res) => {
        console.log(res);
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        console.log(res.data);
        saveAs(pdfBlob, 'tractor-specs.pdf');
      });
  };

  return (
    <>
      <hr />
      <h3>Widget Control Panel</h3>
      <WidgetSearch handleInput={handleSearchInput} search={search} />
      <WidgetCreateForm widgets={widgets} setWidgets={setWidgets} />
      <Sort fetchWidgets={fetchWidgets} />
      <ul className="widgets">{renderWidgets()}</ul>
      <footer>
        <button
          className="btn btn-primary report-btn"
          onClick={createAndDownloadPdf}
        >
          Generate Report
        </button>
      </footer>
    </>
  );
};

export default WidgetGallery;
