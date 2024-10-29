import React, { useState, ChangeEvent, FormEvent } from 'react';
import "./input.css"

interface FormData {
  name: string ; 
  price: number ;
  stock: number ;
}

interface InputFormProps {
  addItemFunction: (item: FormData) => void;
}

const InputForm: React.FC<InputFormProps> = ({ addItemFunction }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    price: 0,
    stock: 0
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if(formData){
      setFormData({...formData, [name]: value});
    }
   
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(formData.name && formData.price && formData.stock){
      addItemFunction(formData);
      setFormData({
        name: '',
        price: 0,
        stock: 0
      });
    }
   
  };

  return (
    <div className='input'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Title"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={formData.price > 0 ? formData.price : ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="stock"
          placeholder="Stock availability"
          value={formData.stock > 0 ? formData.stock : ''}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default InputForm;
