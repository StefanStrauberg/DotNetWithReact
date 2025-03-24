namespace Application.Activities.Validations;

public class CreateActivityValidator : AbstractValidator<CreateActivity.Command>
{
    public CreateActivityValidator()
    {
        RuleFor(x => x.ActivityDto
                      .Title).NotEmpty()
                             .WithMessage("{PropertyName} is required")
                             .MaximumLength(100)
                             .WithMessage("{PropertyName} must not exceed 100 charachters");
        RuleFor(x => x.ActivityDto
                      .Description).NotEmpty()
                                   .WithMessage("{PropertyName} is required");
        RuleFor(x => x.ActivityDto
                      .Date).NotEmpty()
                            .GreaterThan(DateTime.Now)
                            .WithMessage("{PropertyName} must be in the future");
        RuleFor(x => x.ActivityDto
                      .Category).NotEmpty()
                                .WithMessage("{PropertyName} is required");
        RuleFor(x => x.ActivityDto
                      .City).NotEmpty()
                            .WithMessage("{PropertyName} is required");
        RuleFor(x => x.ActivityDto
                      .Venue).NotEmpty()
                             .WithMessage("{PropertyName} is required");
        RuleFor(x => x.ActivityDto
                      .Latitude).NotEmpty()
                                .WithMessage("{PropertyName} is required")
                                .InclusiveBetween(-90, 90)
                                .WithMessage("{PropertyName} must be between -90 and 90");
        RuleFor(x => x.ActivityDto
                      .Longitude).NotEmpty()
                                 .WithMessage("{PropertyName} is required")
                                 .InclusiveBetween(-180, 180)
                                 .WithMessage("{PropertyName} must be between -180 and 180");
    }
}
