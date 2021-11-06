using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dbmusic.Models;

namespace dbmusic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class APIArtistsController : ControllerBase
    {
        private readonly dbmusicContext _context;

        public APIArtistsController(dbmusicContext context)
        {
            _context = context;
        }

        // GET: api/APIArtists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Artists>>> GetArtists()
        {
            return await _context.Artists.ToListAsync();
        }

        // GET: api/APIArtists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Artists>> GetArtists(int id)
        {
            var artists = await _context.Artists.FindAsync(id);

            if (artists == null)
            {
                return NotFound();
            }

            return artists;
        }

        // PUT: api/APIArtists/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArtists(int id, Artists artists)
        {
            if (id != artists.ArtistId)
            {
                return BadRequest();
            }

            _context.Entry(artists).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArtistsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/APIArtists
        [HttpPost]
        public async Task<ActionResult<Artists>> PostArtists(Artists artists)
        {
            _context.Artists.Add(artists);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetArtists", new { id = artists.ArtistId }, artists);
        }

        // DELETE: api/APIArtists/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Artists>> DeleteArtists(int id)
        {
            var artists = await _context.Artists.FindAsync(id);
            if (artists == null)
            {
                return NotFound();
            }

            _context.Artists.Remove(artists);
            await _context.SaveChangesAsync();

            return artists;
        }

        private bool ArtistsExists(int id)
        {
            return _context.Artists.Any(e => e.ArtistId == id);
        }
    }
}
