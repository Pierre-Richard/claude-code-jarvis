using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentsIA.Application.Common;
using StudentsIA.Application.Missions;

namespace StudentsIA.Api.Controllers;

[ApiController]
[Route("api/missions")]
[Authorize]
public class MissionsController(IMissionService missions, ICurrentUser user) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<MissionDto>> Create([FromBody] CreateMissionRequest request, CancellationToken ct)
    {
        if (user.UserId is not { } uid) return Unauthorized();
        try
        {
            var dto = await missions.CreateAsync(uid, request, ct);
            return CreatedAtAction(nameof(GetById), new { id = dto.Id }, dto);
        }
        catch (InvalidOperationException e)
        {
            return BadRequest(new { error = e.Message });
        }
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<MissionDto>>> GetMine(CancellationToken ct)
    {
        if (user.UserId is not { } uid) return Unauthorized();
        return Ok(await missions.GetMineAsync(uid, ct));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<MissionDto>> GetById(Guid id, CancellationToken ct)
    {
        if (user.UserId is not { } uid) return Unauthorized();
        var dto = await missions.GetByIdAsync(uid, id, ct);
        return dto is null ? NotFound() : Ok(dto);
    }

    [HttpPost("{id:guid}/advance")]
    public async Task<ActionResult<MissionDto>> Advance(Guid id, CancellationToken ct)
    {
        if (user.UserId is not { } uid) return Unauthorized();
        var dto = await missions.AdvanceAsync(uid, id, ct);
        return dto is null ? NotFound() : Ok(dto);
    }
}
