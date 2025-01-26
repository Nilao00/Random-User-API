using Microsoft.EntityFrameworkCore;
using RandomUserApi.Data;
using RandomUserApi.Services;
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer(); 
builder.Services.AddSwaggerGen();
Env.Load();
    
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
connectionString = connectionString
    .Replace("{POSTGRES_HOST}", Environment.GetEnvironmentVariable("POSTGRES_HOST"))
    .Replace("{POSTGRES_PORT}", Environment.GetEnvironmentVariable("POSTGRES_PORT"))
    .Replace("{POSTGRES_DB}", Environment.GetEnvironmentVariable("POSTGRES_DB"))
    .Replace("{POSTGRES_USER}", Environment.GetEnvironmentVariable("POSTGRES_USER"))
    .Replace("{POSTGRES_PASSWORD}", Environment.GetEnvironmentVariable("POSTGRES_PASSWORD"));
builder.Services.AddDbContext<RandomUserContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddHttpClient<RandomUserService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowSpecificOrigins");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();


using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<RandomUserContext>();
    dbContext.Database.Migrate(); 
}

app.Run();
