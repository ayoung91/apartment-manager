using System;
using System.Collections.Generic;

namespace Components.Entities
{
    public partial class Payment
    {
        public Payment()
        {
            TenantPayment = new HashSet<TenantPayment>();
        }

        public int Id { get; set; }
        public DateTime? Date { get; set; }
        public decimal? Amount { get; set; }
        public decimal? Balance { get; set; }

        public ICollection<TenantPayment> TenantPayment { get; set; }
    }
}
