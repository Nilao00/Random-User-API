using Microsoft.EntityFrameworkCore;
using RandomUserApi.Models;

namespace RandomUserApi.Data
{
    public class RandomUserContext : DbContext
    {
        public RandomUserContext(DbContextOptions<RandomUserContext> options) : base(options)
        {
        }

        // Representa a tabela de usuários no banco de dados
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuração para a entidade User
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(u => u.Id); // Define a chave primária
                entity.Property(u => u.Name).IsRequired(); // Nome é obrigatório
                entity.Property(u => u.Email).IsRequired(); // Email é obrigatório
                entity.Property(u => u.Phone).HasMaxLength(15); // Tamanho máximo para o telefone
                entity.Property(u => u.Address).HasMaxLength(255); // Tamanho máximo para o endereço
            });
        }
    }
}
