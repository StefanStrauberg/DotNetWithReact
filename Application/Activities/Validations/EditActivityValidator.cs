
namespace Application.Activities.Validations;

public class EditActivityValidator
    : BaseActivityValidator<EditActivity.Command, EdtiActivityDto>
{
    public EditActivityValidator() 
        : base(x => x.ActivityDto)
    {
        RuleFor(x => x.ActivityDto.Id).NotEmpty()
                                      .WithMessage("{PropertyName} is required");
    }
}
