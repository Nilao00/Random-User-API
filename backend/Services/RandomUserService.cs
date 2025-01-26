using System.Net.Http;
using System.Text.Json;
using RandomUserApi.Models;

namespace RandomUserApi.Services
{
    public class RandomUserService
    {
        private readonly HttpClient _httpClient;

        public RandomUserService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        /// <summary>
        /// Obtém uma lista de usuários aleatórios da API Random User.
        /// </summary>
        /// <param name="count">Número de usuários a buscar.</param>
        /// <returns>Uma lista de objetos User.</returns>
        public async Task<List<User>> GetRandomUsers(int count)
        {
            var url = $"https://randomuser.me/api/?results={count}";

            try
            {
                var response = await _httpClient.GetAsync(url);

                if (!response.IsSuccessStatusCode)
                {
                    throw new Exception($"Failed to fetch users: {response.ReasonPhrase}");
                }

                var responseContent = await response.Content.ReadAsStringAsync();

                // Deserializa a resposta da API
                var randomUserApiResponse = JsonSerializer.Deserialize<RandomUserApiResponse>(
                    responseContent,
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
                );

                if (randomUserApiResponse?.Results == null)
                {
                    throw new Exception("No users found in the API response.");
                }

                // Mapeia os resultados da API para o modelo User
                var users = randomUserApiResponse.Results.Select(result => new User
                {
                    Name = $"{result.Name.First} {result.Name.Last}",
                    Email = result.Email,
                    Phone = result.Phone,
                    Address = $"{result.Location.Street.Number} {result.Location.Street.Name}, {result.Location.City}, {result.Location.State}, {result.Location.Country}"
                }).ToList();

                return users;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error fetching users from Random User API: {ex.Message}");
            }
        }
    }

    /// <summary>
    /// Classe para deserializar a resposta da API Random User.
    /// </summary>
    public class RandomUserApiResponse
    {
        public List<RandomUserResult> Results { get; set; }
    }

    public class RandomUserResult
    {
        public RandomUserName Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public RandomUserLocation Location { get; set; }
    }

    public class RandomUserName
    {
        public string First { get; set; }
        public string Last { get; set; }
    }

    public class RandomUserLocation
    {
        public RandomUserStreet Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
    }

    public class RandomUserStreet
    {
        public int Number { get; set; }
        public string Name { get; set; }
    }
}
