namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BaseApiController : ControllerBase
{
  protected IMediator Mediator => HttpContext.RequestServices.GetService<IMediator>()
    ?? throw new ArgumentNullException("IMediatr service is unavailable");

  protected ActionResult<T> HandleResult<T>(Result<T> result)
  {
    if (!result.IsSuccess && result.Code == 404)
      return NotFound();

    if (result.IsSuccess && result.Value != null)
      return Ok(result.Value);

    return BadRequest();
  }
}
