using Database_Assignment_3.Models.AS;
using Database_Assignment_3.Models.Shared;
using Microsoft.EntityFrameworkCore;


namespace Database_Assignment_3.Data
{
    public class ASDbContext(DbContextOptions<ASDbContext> options) : DbContext(options)
    {
        public DbSet<AsianSerie> AsianSeries { get; set; }
        public DbSet<InternationalSerie> InternationalSeries { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<AsianEmployee> AsianEmployees { get; set; }
    }
}
