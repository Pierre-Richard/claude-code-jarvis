using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentsIA.Application.Common;
using StudentsIA.Application.Proposals;

namespace StudentsIA.Api.Controllers;

[ApiController]
[Route("api/proposals")]
[Authorize]
public class ProposalsController(IProposalService proposals, ICurrentUser user) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<ProposalDto>>> GetMine(CancellationToken ct)
    {
        if (user.UserId is not { } uid) return Unauthorized();
        return Ok(await proposals.GetForExpertAsync(uid, ct));
    }

    [HttpPost("{id:guid}/accept")]
    public async Task<IActionResult> Accept(Guid id, CancellationToken ct)
    {
        if (user.UserId is not { } uid) return Unauthorized();
        return await proposals.AcceptAsync(uid, id, ct) ? NoContent() : NotFound();
    }

    [HttpPost("{id:guid}/refuse")]
    public async Task<IActionResult> Refuse(Guid id, CancellationToken ct)
    {
        if (user.UserId is not { } uid) return Unauthorized();
        return await proposals.RefuseAsync(uid, id, ct) ? NoContent() : NotFound();
    }
}
