using Components.Data.DataContext;
using Components.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Components.Data
{
    public class PaymentData
    {
        public List<TenantPayment> GetPayments(int billingCycleId)
        {
            using (var db = new ApartmentManagerContext())
            {
                var payments = db.TenantPayment
                    .Include(t => t.Tenant)
                        .ThenInclude(pe => pe.Person)
                    .Include(t => t.Tenant)
                        .ThenInclude(a => a.Apartment)
                        .ThenInclude(ad => ad.Address)
                    .Include(p => p.Payment)
                        .Where(w => w.Tenant.EndBillingCycle.Id >= billingCycleId &&
                            w.Tenant.StartBillingCycle.Id <= billingCycleId &&
                            w.Tenant.Active == true)
                    .OrderBy(o => o.Tenant.Person.LastName)
                    .ThenBy(o => o.Tenant.Person.FirstName)
                    .ThenBy(o => o.Tenant.Apartment.Address.StreetAddress)
                    .ThenBy(o => o.Tenant.Apartment.RoomNumber)
                    .ToList();

                return payments;
            }
        }
        public List<PaymentMethod> GetPaymentMethods()
        {
            using (var db = new ApartmentManagerContext())
            {
                var paymentMethods = db.PaymentMethod
                    .ToList();

                return paymentMethods;
            }
        }

        public List<TenantPayment> GetPaymentHistory(int id)
        {
            using (var db = new ApartmentManagerContext())
            {
                var payments = db.TenantPayment
                    .Include(tp => tp.Payment)
                        .ThenInclude(pm => pm.PaymentMethod)
                    .Where(w => w.TenantId == id && w.Payment != null)
                    .ToList();

                return payments;
            }
        }

        public void AddPayment(TenantPayment payment)
        {
            using (var db = new ApartmentManagerContext())
            {
                payment.Tenant.Apartment.Address = db.Address.Find(payment.Tenant.Apartment.Address.Id);
                payment.Tenant.Apartment = db.Apartment.Find(payment.Tenant.Apartment.Id);
                payment.Tenant = db.Tenant.Find(payment.Tenant.Id);
                payment.Payment.PaymentMethod = db.PaymentMethod.Find(payment.Payment.PaymentMethod.Id);

                db.Payment.Add(payment.Payment);
                db.TenantPayment.Update(payment);
                db.SaveChanges();

            }
        }

        public void UpdatePayment(TenantPayment payment)
        {
            using (var db = new ApartmentManagerContext())
            {
                db.Payment.Update(payment.Payment);
                db.SaveChanges();
            }
        }
    }
}
