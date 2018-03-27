using Components.Data;
using Components.Entities;
using System;
using System.Collections.Generic;

namespace Components.Logic
{
    public class PaymentLogic
    {
        public List<TenantPayment> GetPayments()
        {
            var data = new PaymentData().GetPayments();
            data.ForEach(record =>
            {
                if (record.Payment == null)
                    record.Payment = new Payment();

                record.Payment.Balance = Convert.ToDecimal(record.Tenant.Apartment.RentCost) - Convert.ToDecimal(record.Payment.Amount);
            });

            return data;
        }
        public void AddPayment(TenantPayment payment)
        {
            new PaymentData().AddPayment(payment);
        }

        public void UpdatePayment(TenantPayment payment)
        {
            new PaymentData().UpdatePayment(payment);
        }
    }
}
