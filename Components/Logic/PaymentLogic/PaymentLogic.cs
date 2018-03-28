using Components.Data;
using Components.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Components.Logic
{
    public class PaymentLogic
    {
        public List<TenantPayment> GetPayments()
        {
            var data = new PaymentData().GetPayments();

            var tenants = data.GroupBy(p => p.TenantId).ToList();
            var tenantPayments = new List<TenantPayment>();
            tenants.ForEach(t =>
            {
                var payments = t.ToList();
                var tenantPayment = new TenantPayment()
                {
                    Payment = new Payment() { Amount = 0, Balance = 0 },
                    Tenant = new Tenant()
                };
                payments.ForEach(p =>
                {
                    if (p.Payment == null)
                    {
                        p.Payment = new Payment() { Amount = 0 };
                    }

                    tenantPayment.Tenant = p.Tenant;
                    tenantPayment.Payment.Id = p.Payment.Id;
                    tenantPayment.Payment.Amount += p.Payment.Amount;
                });
                tenantPayments.Add(tenantPayment);
            });
            tenantPayments.ForEach(tp =>
            {
                tp.Payment.Balance = Convert.ToDecimal(tp.Tenant.Apartment.RentCost) - tp.Payment.Amount;
            });

            return tenantPayments;
        }

        public List<PaymentMethod> GetPaymentMethods()
        {
            return new PaymentData().GetPaymentMethods();
        }

        public List<TenantPayment> GetPaymentHistory(int id)
        {
            return new PaymentData().GetPaymentHistory(id);
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
