using System.Collections.Generic;

namespace Components.Entities
{
    public partial class Tenant
    {
        public Tenant()
        {
            TenantPayment = new HashSet<TenantPayment>();
        }

        public int Id { get; set; }
        public int? PersonId { get; set; }
        public int? ApartmentId { get; set; }
        public bool? Active { get; set; }

        public Apartment Apartment { get; set; }
        public Person Person { get; set; }
        public ICollection<TenantPayment> TenantPayment { get; set; }
    }
}
