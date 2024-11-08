using Database_Assignment_3.Models.Shared.Base;

namespace Database_Assignment_3.Models.EU
{
    public class EuropeanEmployee : BaseEmployee
    {
        public string EUEmploymentPolicy { get; set; }
        public string EUEmploymentContractType { get; set; }
    }
}
