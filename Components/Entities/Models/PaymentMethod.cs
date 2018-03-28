using System.Collections.Generic;

namespace Components.Entities
{
    public partial class PaymentMethod
    {
        public PaymentMethod()
        {
            Payment = new HashSet<Payment>();
        }
        public int Id { get; set; }
        public string Method { get; set; }

        public ICollection<Payment> Payment { get; set; }
    }
}
