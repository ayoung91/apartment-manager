using System.Collections.Generic;

namespace Components.Entities
{
    public partial class Apartment
    {
        public Apartment()
        {
            Tenant = new HashSet<Tenant>();
        }

        public int Id { get; set; }
        public int? AddressId { get; set; }
        public decimal? RentCost { get; set; }
        public decimal? SecurityDeposit { get; set; }
        public string RoomNumber { get; set; }
        public bool Available { get; set; }
        public bool Active { get; set; }

        public Address Address { get; set; }
        public ICollection<Tenant> Tenant { get; set; }
    }
}
