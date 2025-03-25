using Application.Activities.DTOs;

namespace Application.Core;

public class MappingProfiles : Profile
{
  public MappingProfiles()
  {
    CreateMap<CreateActivityDto, Activity>();
    CreateMap<EdtiActivityDto, Activity>();
  }
}
