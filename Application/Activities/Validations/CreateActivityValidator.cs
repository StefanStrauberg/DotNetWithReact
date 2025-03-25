namespace Application.Activities.Validations;

public class CreateActivityValidator 
    : BaseActivityValidator<CreateActivity.Command, CreateActivityDto>
{
    public CreateActivityValidator() : base(x => x.ActivityDto)
    {
    }
}
