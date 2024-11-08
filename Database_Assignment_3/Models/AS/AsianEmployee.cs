using Database_Assignment_3.Models.Shared.Base;

namespace Database_Assignment_3.Models.AS
{
    public class AsianEmployee : BaseEmployee
    {
        public string ASEmploymentPolicy { get; set; }
        public string ASEmploymentContractType { get; set; }
        public string VisaType { get; set; }
    }
}
