using Components.Data;
using Components.Entities;
using System.Collections.Generic;

namespace Components.Logic
{
    public class PaymentLogic
    {
        public List<TenantPayment> GetPayments()
        {
            return new PaymentData().GetPayments();
        }
    }
}
