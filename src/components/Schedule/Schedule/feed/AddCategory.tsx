import React, { useState } from 'react';
import styled from 'styled-components';

interface Category {
  id: number;
  name: string;
}

const AddCategory: React.FC = () => {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleAddCategory = () => {
    const newCategory: Category = {
      id: Date.now(),
      name: name,
    };
    setCategories([...categories, newCategory]);
    setName('');
  };

  return (
    <div>
      <Title>Add Category</Title>
      <C_Title>카테고리 제목
      <input type="text" value={name} onChange={handleNameChange} />
      <button onClick={handleAddCategory}>Add</button>
      </C_Title>
      <h3>Categories:</h3>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AddCategory;

const Title = styled.div`
`

const C_Title = styled.div`
`
