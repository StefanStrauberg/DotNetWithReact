namespace API.Middleware;

public class ExceptionMiddleware(ILogger<ExceptionMiddleware> logger,
                                 IHostEnvironment env) 
    : IMiddleware
{
    static readonly JsonSerializerOptions _jsonOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    };

    public async Task InvokeAsync(HttpContext context,
                                  RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (ValidationException ex)
        {
            await HandleValidationEsxception(context,
                                             ex);
        }
        catch (Exception ex)
        {
            await HandleException(context, ex);
        }
    }

    bool IsDevelopment() => env.IsDevelopment();

    async Task HandleException(HttpContext context,
                               Exception ex)
    {
        logger.LogError(ex, "An error occurred: {ErrorMessage}", ex.Message);
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;

        var response = IsDevelopment()
            ? new AppException(context.Response.StatusCode,
                               ex.Message,
                               ex.StackTrace)
            : new AppException(context.Response.StatusCode,
                               ex.Message,
                               null);
        var json = JsonSerializer.Serialize(response, _jsonOptions);

        await context.Response.WriteAsync(json);
    }

    static async Task HandleValidationEsxception(HttpContext context,
                                                 ValidationException ex)
    {
        var validationErrors = new Dictionary<string, string[]>();

        if (ex.Errors != null)
        {
            foreach (var error in ex.Errors)
            {
                if (validationErrors.TryGetValue(error.PropertyName,
                                                 out var existingErrors))
                {
                    validationErrors[error.PropertyName] = [.. existingErrors, error.ErrorMessage];
                }
                else
                {
                    validationErrors[error.PropertyName] = [error.ErrorMessage];
                }
            }
        }

        context.Response.StatusCode = StatusCodes.Status400BadRequest;
        
        var validationProblemDetails = new ValidationProblemDetails(validationErrors)
        {
            Status = StatusCodes.Status400BadRequest,
            Type = "ValidationFailure",
            Title = "Validation error",
            Detail = "One or more validation error has occured"
        };

        await context.Response.WriteAsJsonAsync(validationProblemDetails);
    }
}
