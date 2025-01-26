import { useState } from 'react';
import { Button, Form, Input } from './styles';

type UserFormProps = {
    onSubmit: (data: any) => void;
    initialData?: any;
};

const UserForm = ({ onSubmit, initialData }: UserFormProps) => {
    const [formData, setFormData] = useState(
      initialData || { name: '', email: '', phone: '', address: '' }
    );
  
    const handleChange = (e: any) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e: any) => {
      e.preventDefault();
      onSubmit(formData);
    };
  
    return (
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <Button type="submit">Submit</Button>
      </Form>
    );
  };
  
  export default UserForm;