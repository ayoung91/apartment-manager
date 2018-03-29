using System.Collections.Generic;

namespace Components.Entities
{
    public partial class BillingCycle
    {
        public BillingCycle()
        {
            Payment = new HashSet<Payment>();
            StartTenant = new HashSet<Tenant>();
            EndTenant = new HashSet<Tenant>();
        }
        public int Id { get; set; }
        public string BillingMonth { get; set; }
        public int BillingYear { get; set; }

        public ICollection<Payment> Payment { get; set; }
        public ICollection<Tenant> StartTenant { get; set; }
        public ICollection<Tenant> EndTenant { get; set; }
    }
}
