import React, { useState, useEffect } from 'react';

import WidgetApiService from '../services/widget-api-service';

// * Components
import WidgetSearch from './WidgetSearch';
import WidgetCreateForm from './WidgetCreateForm';
import Widget from './Widget';

const WidgetGallery = () => {
  const [widgets, setWidgets] = useState([]);
  const [search, setSearch] = useState('');

  const fetchWidgets = async () => {
    const res = await WidgetApiService.getWidgets();
    setWidgets(res);
  };

  useEffect(() => {
    // * On page load, fetch all widgets
    fetchWidgets();
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

  return (
    <>
      <hr />
      <h3>Widget Control Panel</h3>
      <WidgetSearch handleInput={handleSearchInput} search={search} />
      <WidgetCreateForm widgets={widgets} setWidgets={setWidgets} />
      <ul className="widgets">{renderWidgets()}</ul>
    </>
  );
};

export default WidgetGallery;
