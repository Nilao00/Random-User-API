import { useState } from 'react';
import { User } from '../types/User';

export const useModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [newUser, setNewUser] = useState<User>({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const handleOpenModal = (user?: User) => {
        if (user) {
          setEditingUser(user);
          setNewUser(user);
        } else {
          setEditingUser(null);
          setNewUser({
            name: '',
            email: '',
            phone: '',
            address: ''
          });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewUser({
          name: '',
          email: '',
          phone: '',
          address: ''
        });
        setEditingUser(null);
    };

    return {
        isModalOpen,
        editingUser,
        newUser,
        setNewUser,
        handleOpenModal,
        handleCloseModal
    };
};