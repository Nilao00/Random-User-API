namespace RandomUserApi.Models
{
    public class User
    {
        public int Id { get; set; } // ID único (chave primária)
        public string Name { get; set; } // Nome do usuário
        public string Email { get; set; } // Email do usuário
        public string Phone { get; set; } // Telefone
        public string Address { get; set; } // Endereço
    }
}