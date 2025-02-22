namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BaseApiController : ControllerBase
{
  protected IMediator Mediator => HttpContext.RequestServices.GetService<IMediator>()
    ?? throw new ArgumentNullException("IMediatr service is unavailable");
}
