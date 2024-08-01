import React, { useState } from 'react';

function SideContent({ onItemClick }) {
  const getCategories = () => {
    let test = JSON.parse(localStorage.getItem('categories')) || [];
    return test;
  }

  const [categories, setCategories] = useState(getCategories());

  const handleDelete = (e) => {
    let name = e.target.parentElement.textContent.split(" ❌")[0];
    const updatedCategories = categories.filter(category => category !== name);
    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
  };
  const handleItemClick = (e) => {
    let name = e.target.parentElement.textContent.split(" ❌")[0];
    onItemClick(name);
  };


  return <div id="sideContDiv">
    <h1>Categories</h1>
      <ul className="categoryList">
      <li><p  onClick={handleItemClick}>All Categories</p></li>
        {categories.map((item, index) => (
           <li key={index} style={{ color: index % 3 === 0 ? '#421191' : index % 3 === 1 ? '#c25b3e' : '#c2b73e' }}><p  onClick={handleItemClick}>{item} <span className="deleteItem" onClick={(name) => handleDelete(name)}>&#10060;</span></p></li>
        ))}
      </ul>
  </div>;
}

export default SideContent;