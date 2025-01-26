using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RandomUserApi.Data;
using RandomUserApi.Models;
using RandomUserApi.Services;

namespace RandomUserApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly RandomUserContext _context;
        private readonly RandomUserService _service;

        public UsersController(RandomUserContext context, RandomUserService service)
        {
            _context = context;
            _service = service;
        }

        // Endpoint para buscar e salvar usuários da API Random User
        [HttpGet("fetch")]
        public async Task<IActionResult> FetchAndSaveUsers(int count = 10)
        {
            try
            {
                var users = await _service.GetRandomUsers(count);
                _context.Users.AddRange(users);
                await _context.SaveChangesAsync();

                return Ok(new { message = $"{users.Count} users fetched and saved successfully.", users });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while fetching users.", error = ex.Message });
            }
        }

        // Endpoint para listar todos os usuários salvos no banco
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var users = await _context.Users.ToListAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while fetching users from the database.", error = ex.Message });
            }
        }

        // Endpoint para buscar um único usuário pelo ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            try
            {
                var user = await _context.Users.FindAsync(id);

                if (user == null)
                    return NotFound(new { message = "User not found." });

                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while fetching the user.", error = ex.Message });
            }
        }

          // Endpoint para buscar usuários pelo nome
        [HttpGet("search")]
        public async Task<IActionResult> SearchUsersByName(string name)
        {
            try
            {
                var users = await _context.Users
                    .Where(u => EF.Functions.Like(u.Name.ToLower(), $"%{name.ToLower()}%"))
                    .ToListAsync();

                if (users.Count == 0)
                    return NotFound(new { message = "No users found with the specified name." });

                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while searching for users.", error = ex.Message });
            }
        }

        // Endpoint para criar um novo usuário manualmente
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] User newUser)
        {
            try
            {
                _context.Users.Add(newUser);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetUserById), new { id = newUser.Id }, newUser);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while creating the user.", error = ex.Message });
            }
        }

        // Endpoint para atualizar um usuário existente
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User updatedUser)
        {
            if (id != updatedUser.Id)
                return BadRequest(new { message = "User ID mismatch." });

            try
            {
                var user = await _context.Users.FindAsync(id);

                if (user == null)
                    return NotFound(new { message = "User not found." });

                // Atualiza as propriedades do usuário
                user.Name = updatedUser.Name;
                user.Email = updatedUser.Email;
                user.Phone = updatedUser.Phone;
                user.Address = updatedUser.Address;

                _context.Users.Update(user);
                await _context.SaveChangesAsync();

                return Ok(new { message = "User updated successfully.", user });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while updating the user.", error = ex.Message });
            }
        }

        // Endpoint para deletar um usuário
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                var user = await _context.Users.FindAsync(id);

                if (user == null)
                    return NotFound(new { message = "User not found." });

                _context.Users.Remove(user);
                await _context.SaveChangesAsync();

                return Ok(new { message = "User deleted successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while deleting the user.", error = ex.Message });
            }
        }
    }
}
