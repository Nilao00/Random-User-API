import { memo } from 'react';
import { User } from '../../types/User';
import { 
    Modal,
    ModalContent,
    ModalOverlay,
    Button,
    Input,
    Label 
} from './styles';

type ModalProps = {
    isModalOpen: boolean;
    editingUser: User | null;
    setNewUser: React.Dispatch<React.SetStateAction<User>>;
    newUser: User;
    handleCloseModal: () => void;
    handleSave: () => void;
    loading: boolean;
};

const ModalComponent = ({ 
    isModalOpen,
    editingUser, 
    setNewUser,
    newUser,
    handleCloseModal,
    handleSave,
    loading
}: ModalProps) => {
    return (
        isModalOpen && (
            <ModalOverlay>
              <Modal>
                <h2>{editingUser ? 'Editar Usuário' : 'Criar Usuário'}</h2>
                <ModalContent>
                  <Label>Nome:</Label>
                  <Input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    required
                 />
                  <Label>Email:</Label>
                  <Input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    required
                  />
                  <Label>Telefone:</Label>
                  <Input
                    type="tel"
                    value={newUser.phone}
                    maxLength={13}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  />
                  <Label>Endereço:</Label>
                  <Input
                    type="text"
                    value={newUser.address}
                    onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                    required
                 />
                  <div style={{ display: 'flex' }}>
                    <Button onClick={handleSave} disabled={loading}>
                      {loading ? 'Salvando...' : 'Salvar'}
                    </Button>
                    <Button onClick={handleCloseModal} style={{ marginLeft: '10px' }}>
                      Cancelar
                    </Button>
                  </div>
                </ModalContent>
              </Modal>
            </ModalOverlay>
          )
    );
};

export default memo(ModalComponent);

