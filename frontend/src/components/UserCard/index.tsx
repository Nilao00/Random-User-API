import { User } from '../../types/User';
import { Button, Card, ButtonEdit} from './styles';

type UserCardProps = {
    user: User;
    onDelete: (id: number | undefined) => void;
    onEdit: (user: User) => void;
};
const UserCard = ({ user, onDelete, onEdit }:UserCardProps) => {
    return (
      <Card>
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Address: {user.address}</p>
        <Button onClick={() => onDelete(user.id)}>Delete</Button>
        <ButtonEdit onClick={() => onEdit(user)}>Editar</ButtonEdit>
      </Card>
    );
  };
  
  export default UserCard;