using Database_Assignment_3.Models.Shared.Base;

namespace Database_Assignment_3.Models.US
{
    public class UnitedStatesEmployee : BaseEmployee
    {
        public string State { get; set; }
        public string USEmploymentPolicy { get; set; }
        public string USEmploymentContractType { get; set; }
    }
}
