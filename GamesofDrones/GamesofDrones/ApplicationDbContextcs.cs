using GamesofDrones.Models;
using Microsoft.EntityFrameworkCore;

namespace GamesofDrones
{
    public class ApplicationDbContextcs: DbContext
    {
        public ApplicationDbContextcs(DbContextOptions<ApplicationDbContextcs> options): base(options) { }

        public DbSet<Game>Games { get; set; }
    }
}
