var policyName = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt =>
{
  opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors(options => 
{
  options.AddPolicy(policyName,
                    builder => 
                    {
                      builder.WithOrigins("http://localhost:3000")
                             .AllowAnyMethod()
                             .AllowAnyHeader();
                    });
});
builder.Services.AddMediatR(x => {
  x.RegisterServicesFromAssemblyContaining<GetActivitiesList>();
  x.AddOpenBehavior(typeof(ValidationBehavior<,>));
});
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);
builder.Services.AddValidatorsFromAssemblyContaining<CreateActivityValidator>();
builder.Services.AddTransient<ExceptionMiddleware>();

var app = builder.Build();

// Configure the HTTP request pipeline
app.UseMiddleware<ExceptionMiddleware>();
app.UseCors(policyName);

app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
  var context = services.GetRequiredService<AppDbContext>();
  await context.Database.MigrateAsync();
  await DbInitializer.SeedDataAsync(context);
}
catch (Exception ex)
{
  var logger = services.GetRequiredService<ILogger<Program>>();
  logger.LogError(ex, "An error occured during migration.");
}

app.Run();
