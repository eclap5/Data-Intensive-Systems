namespace Database_Assignment_3.Models.Shared.Base
{
    public abstract class BaseEmployee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Position { get; set; }
        public string SalaryCurrency { get; set; }
        public int Salary { get; set; }
    }
}
