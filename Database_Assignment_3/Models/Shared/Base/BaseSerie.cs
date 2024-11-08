namespace Database_Assignment_3.Models.Shared.Base
{
    public abstract class BaseSerie
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int NumberOfSeasons { get; set; }
        public int NumberOfEpisodes { get; set; }
        public string Country { get; set; }
        public string Language { get; set; }
    }
}
