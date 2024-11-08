using Database_Assignment_3.Models.Shared;
using Database_Assignment_3.Models.US;
using Microsoft.EntityFrameworkCore;

namespace Database_Assignment_3.Data
{
    public class USDbContext(DbContextOptions<USDbContext> options) : DbContext(options)
    {
        public DbSet<UnitedStatesSerie> UnitedStatesSeries { get; set; }
        public DbSet<InternationalSerie> InternationalSeries { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<UnitedStatesEmployee> UnitedStatesEmployees { get; set; }
    }
}
