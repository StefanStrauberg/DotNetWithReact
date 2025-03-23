namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
  [HttpGet]
  public async Task<ActionResult<List<Activity>>> GetActivities(CancellationToken token)
    => await Mediator.Send(new GetActivitiesList.Query(), token);

  [HttpGet("{id}")]
  public async Task<ActionResult<Activity>> GetActivityDetail(string id,
                                                              CancellationToken token)
    => HandleResult(await Mediator.Send(new GetActivitiesDetails.Query { Id = id },
                                        token));

  [HttpPost]
  public async Task<ActionResult<string>> CreateActivity(CreateActivityDto activityDto,
                                                         CancellationToken token)
    => HandleResult(await Mediator.Send(new CreateActivity.Command { ActivityDto = activityDto },
                                        token));

  [HttpPut]
  public async Task<ActionResult> EditActivity(Activity activity,
                                               CancellationToken token)
    => HandleResult(await Mediator.Send(new EditActivity.Command { Activity = activity },
                                        token));

  [HttpDelete("{id}")]
  public async Task<ActionResult> DeleteActivity(string id,
                                                 CancellationToken token)
    => HandleResult(await Mediator.Send(new DeleteActivity.Command { Id = id },
                                        token));
}
