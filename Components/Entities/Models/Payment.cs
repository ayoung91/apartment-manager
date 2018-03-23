using System;

namespace Components.Entities
{
    public partial class Payment
    {
        public int Id { get; set; }
        public int? ApartmentId { get; set; }
        public DateTime? Date { get; set; }
        public decimal? Amount { get; set; }

        public Apartment Apartment { get; set; }
    }
}
