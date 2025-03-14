namespace Application.Activities.Validations;

public class CreateActivityValidator : AbstractValidator<CreateActivity.Command>
{
    public CreateActivityValidator()
    {
        RuleFor(x => x.ActivityDto
                      .Title).NotEmpty()
                             .WithMessage("Title is required");
        RuleFor(x => x.ActivityDto
                      .Description).NotEmpty()
                                   .WithMessage("Description is required");
    }
}
