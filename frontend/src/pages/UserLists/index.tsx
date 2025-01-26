import { useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import UserCard from '../../components/UserCard';
import { User } from '../../types/User';
import { useModal } from '../../hooks/useModal';
import { useLoading } from '../../hooks/useLoading';
import ModalContent from '../../components/Modal';
import { 
    createUser,
    deleteUser,
    fetchUsers,
    searchUser,
    updateUser 
} from '../../services/Users';
import { 
    Grid,
    Input,
    Label,
    Button,
    SelectCount
 } from './styles'; 

const UsersList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [count, setCount] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const { 
        isModalOpen,
        editingUser,
        newUser,
        setNewUser,
        handleOpenModal,
        handleCloseModal 
    } = useModal();
    const { loading, setLoading } = useLoading();    

    const handleSave = async () => {
        setLoading(true);
      
        try {
          if (editingUser) {
              const updatedUser = await updateUser(editingUser.id!, newUser);
              setUsers((prev) =>
                prev.map((user) => (user.id === updatedUser.data.id ? updatedUser.data : user))
              );
              handleCloseModal();            
          } else {
              const createdUser = await createUser(newUser);
              setUsers((prev) => [...prev, createdUser.data]);
              handleCloseModal();            
          }
        } catch (error:any) {
          if(error?.response?.status === 400) {
            alert(error?.response?.data?.message);            
          }
          console.error('Erro ao salvar usuário:', error);
        } finally {
          setLoading(false);
        }
    };

  
    const handleFetch = async () => {
        setLoading(true);
        try {
          const res = await fetchUsers(count);
          setUsers(res.data.users);
          setFilteredUsers(res.data.users); 
        } catch (error) {
          console.error('Erro ao buscar usuários:', error);
        } finally {
          setLoading(false);
        }
      };

    const handleSearch = async (term: string) => {
        try {
            setSearchTerm(term);
            if (term) {
                setLoading(true);
                const filtered = await searchUser(term);
                setFilteredUsers(filtered.data);
                setLoading(false);
            } else {
                setFilteredUsers(users);
            }
        } catch (error) {   
            console.error('Erro ao buscar usuários:', error);
            setLoading(false);
        }
    };

    const debouncedFetch = useMemo(
        () =>
        debounce((search: string) => {
            handleSearch(search);
          }, 800), 
        []
      );
    
    const handleSearchChange = (term: string) => {
       setSearchTerm(term);
       debouncedFetch(term); 
    };

    useEffect(() => {
        handleFetch();
    }, [count]);
  
    const handleDelete = async (id: number | undefined, name: string) => {
     const isSureDelete = confirm(`Tem certeza que deseja excluir o usuário ${name}?`);
     if (isSureDelete) {
        await deleteUser(id).then(() => {
            setUsers((prev) => prev.filter((user) => user.id !== id));
            setFilteredUsers((prev) => prev.filter((user) => user.id !== id));
          });
     }
    };
  
    return (
      <div className="p-4">
        <h1>Usuários</h1>
        <Label htmlFor="count">Digite o número de usuários a serem buscados:</Label>
         <SelectCount 
           disabled={loading} 
           value={count}
           onChange={(e: any) => setCount(e.target.value)}>
            <option value={10} selected>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
            <option value={80}>80</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
            <option value={500}>500</option>
         </SelectCount>
        <Button onClick={handleFetch} disabled={loading}>
          {loading ? 'Carregando...' : 'Buscar Usuários'}
        </Button>
        <Button onClick={() => handleOpenModal()}>
            Novo Usuário
        </Button>
        <Label htmlFor="search">Pesquisar por Nome:</Label>
        <Input
          type="text"
          id="search"
          value={searchTerm}
          onChange={(e: any) => handleSearchChange(e.target.value)}
          placeholder="Digite o nome para filtrar"
        />
        <Grid>
        {loading && <p>Carregando...</p>}
          {!loading && filteredUsers.map((user:User) => (
            <UserCard key={user.id} user={user} 
                onDelete={() => handleDelete(user.id, user.name)}
                onEdit={() => handleOpenModal(user)}
            />
          ))}
        </Grid>
        <ModalContent 
          isModalOpen={isModalOpen}
          editingUser={editingUser}
          setNewUser={setNewUser}
          newUser={newUser}
          handleCloseModal={handleCloseModal}
          handleSave={handleSave}
          loading={loading}
        />
      </div>
    );
  };
  
  export default UsersList;
