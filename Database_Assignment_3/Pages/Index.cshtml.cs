using Database_Assignment_3.Data;
using Database_Assignment_3.Models.AS;
using Database_Assignment_3.Models.EU;
using Database_Assignment_3.Models.Shared;
using Database_Assignment_3.Models.US;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Database_Assignment_3.Pages
{
    public class IndexModel(USDbContext contextUS, EUDbContext contextEU, ASDbContext contextAS) : PageModel
    {
        private readonly USDbContext _contextUS = contextUS;
        private readonly EUDbContext _contextEU = contextEU;
        private readonly ASDbContext _contextAS = contextAS;

        [BindProperty]
        public string SelectedRegion { get; set; }

        [BindProperty]
        public string SelectedData { get; set; }

        public List<Movie> Movies { get; set; }
        public List<Genre> Genres { get; set; }
        public List<InternationalSerie> InternationalSeries { get; set; }
        public List<EuropeanEmployee> EuropeanEmployees { get; set; }
        public List<UnitedStatesEmployee> UnitedStatesEmployees { get; set; }
        public List<AsianEmployee> AsianEmployees { get; set; }
        public List<EuropeanSerie> EuropeanSeries { get; set; }
        public List<UnitedStatesSerie> UnitedStatesSeries { get; set; }
        public List<AsianSerie> AsianSeries { get; set; }

        public void OnGet()
        {

        }

        public void OnPost()
        {
            if (!string.IsNullOrEmpty(SelectedRegion))
            {
                switch (SelectedRegion)
                {
                    case "Europe":
                        LoadEuropeData();
                        break;
                    case "United States":
                        LoadUnitedStatesData();
                        break;
                    case "Asia":
                        LoadAsiaData();
                        break;
                    default:
                        break;
                }
            }
        }

        private void LoadEuropeData()
        {
            Movies = _contextEU.Set<Movie>().ToList();
            Genres = _contextEU.Set<Genre>().ToList();
            InternationalSeries = _contextEU.Set<InternationalSerie>().ToList();
            EuropeanEmployees = _contextEU.Set<EuropeanEmployee>().ToList();
            EuropeanSeries = _contextEU.Set<EuropeanSerie>().ToList();
        }

        private void LoadUnitedStatesData()
        {
            Movies = _contextUS.Set<Movie>().ToList();
            Genres = _contextUS.Set<Genre>().ToList();
            InternationalSeries = _contextUS.Set<InternationalSerie>().ToList();
            UnitedStatesEmployees = _contextUS.Set<UnitedStatesEmployee>().ToList();
            UnitedStatesSeries = _contextUS.Set<UnitedStatesSerie>().ToList();
        }

        private void LoadAsiaData()
        {
            Movies = _contextAS.Set<Movie>().ToList();
            Genres = _contextAS.Set<Genre>().ToList();
            InternationalSeries = _contextAS.Set<InternationalSerie>().ToList();
            AsianEmployees = _contextAS.Set<AsianEmployee>().ToList();
            AsianSeries = _contextAS.Set<AsianSerie>().ToList();
        }
    }
}
