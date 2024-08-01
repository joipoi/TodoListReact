import React, { useState } from 'react';
import SideContent from '../components/SideContent';
import MainContainer from '../components/MainContainer';

function HomePage() {
  const [selectedItemText, setSelectedItemText] = useState('');

  const handleItemClick = (text) => {
    setSelectedItemText(text);
  };
  return (

      <div className="appContainer">
       <SideContent onItemClick={handleItemClick} />
       <MainContainer selectedItemText={selectedItemText} />
      </div>
  );
}

export default HomePage;
  