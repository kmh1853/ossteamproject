import React from 'react';
import './Tabs.css';

const Tabs = ({ activeTab, onChangeTab, children }) => {
  const tabs = React.Children.toArray(children);

  return (
    <div className="tabs-container">
      <div className="tabs">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-button ${tab.props.label === activeTab ? 'active' : ''}`}
            onClick={() => onChangeTab(tab.props.label)}
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {tabs.find((tab) => tab.props.label === activeTab)}
      </div>
    </div>
  );
};

export default Tabs;
