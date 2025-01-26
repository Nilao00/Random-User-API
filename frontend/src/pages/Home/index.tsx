import { Button, Description, HomeContainer, Title } from './styles';

const Home = () => {
    return (
      <HomeContainer>
        <Title>Bem vindo ao Random User API</Title>
        <Description>
            Esse é um aplicativo de exemplo para demonstrar como criar uma API RESTful com WebApi C# e React.
        </Description>
        <Button to="/users">Ver usuários</Button>
      </HomeContainer>
    );
  };
  
  export default Home;
  