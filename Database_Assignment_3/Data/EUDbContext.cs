using Database_Assignment_3.Models.EU;
using Database_Assignment_3.Models.Shared;
using Microsoft.EntityFrameworkCore;

namespace Database_Assignment_3.Data
{
    public class EUDbContext(DbContextOptions<EUDbContext> options) : DbContext(options) 
    {
        public DbSet<EuropeanSerie> EuropeanSeries { get; set; }
        public DbSet<InternationalSerie> InternationalSeries { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<EuropeanEmployee> EuropeanEmployees { get; set; }
    }
}
