using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GamesofDrones;
using GamesofDrones.Models;

namespace GamesofDrones.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GamesController : ControllerBase
    {
        private readonly ApplicationDbContextcs _context;

        private static Game currentGame = new Game();

        public GamesController(ApplicationDbContextcs context)
        {
            _context = context;
        }
        
        [HttpPost("insertIntoDB")]
        public async Task<ActionResult<Game>> PostGame(Game game)
        {
          if (_context.Games == null)
          {
              return Problem("Entity set 'ApplicationDbContextcs.Games'  is null.");
          }
            _context.Games.Add(game);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGame", new { id = game.Id }, game);
        }
    }
}
