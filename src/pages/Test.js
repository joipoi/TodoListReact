import React from 'react';
import Select, { components } from 'react-select';

const { Option } = components;

const RemoveOption = ({ data, removeOption }) => {
  return (
    <Option {...data}>
      <div>
        {data.label}
        <button onClick={() => removeOption(data)} style={{ marginLeft: '5px' }}>
          Remove
        </button>
      </div>
    </Option>
  );
};

const customComponents = {
  Option: RemoveOption,
};

const Test = () => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const handleRemoveOption = (removedOption) => {
    // Implement logic to remove the option from your state or wherever it's stored
    console.log('Removing:', removedOption);
  };

  return (
    <Select
      options={options}
      components={customComponents}
      onChange={(selectedOptions) => console.log(selectedOptions)}
    />
  );
};

export default Test;