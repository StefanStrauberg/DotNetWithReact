namespace Application.Activities.Validations;

public class BaseActivityValidator<T, TDto> 
    : AbstractValidator<T> where TDto : BaseActivityDto
{
    public BaseActivityValidator(Func<T, TDto> selector)
    {
        RuleFor(x => selector(x).Title).NotEmpty()
                                       .WithMessage("{PropertyName} is required")
                                       .MaximumLength(100)
                                       .WithMessage("{PropertyName} must not exceed 100 charachters");
        RuleFor(x => selector(x).Description).NotEmpty()
                                             .WithMessage("{PropertyName} is required");
        RuleFor(x => selector(x).Date).NotEmpty()
                                      .GreaterThan(DateTime.Now)
                                      .WithMessage("{PropertyName} must be in the future");
        RuleFor(x => selector(x).Category).NotEmpty()
                                          .WithMessage("{PropertyName} is required");
        RuleFor(x => selector(x).City).NotEmpty()
                                      .WithMessage("{PropertyName} is required");
        RuleFor(x => selector(x).Venue).NotEmpty()
                                       .WithMessage("{PropertyName} is required");
        RuleFor(x => selector(x).Latitude).NotEmpty()
                                          .WithMessage("{PropertyName} is required")
                                          .InclusiveBetween(-90, 90)
                                          .WithMessage("{PropertyName} must be between -90 and 90");
        RuleFor(x => selector(x).Longitude).NotEmpty()
                                           .WithMessage("{PropertyName} is required")
                                           .InclusiveBetween(-180, 180)
                                           .WithMessage("{PropertyName} must be between -180 and 180");
    }
}
