using Components.Data.DataContext;
using Components.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Components.Data
{
    public class PaymentData
    {
        public List<TenantPayment> GetPayments()
        {
            using (var db = new ApartmentManagerContext())
            {
                var payments = db.TenantPayment
                    .Include(t => t.Tenant)
                        .ThenInclude(pe => pe.Person)
                    .Include(t => t.Tenant)
                        .ThenInclude(a => a.Apartment)
                        .ThenInclude(ad => ad.Address)
                        .Where(t => t.Tenant.Active == true)
                    .Include(p => p.Payment)
                    .OrderBy(o => o.Tenant.Person.LastName)
                    .ThenBy(o => o.Tenant.Person.FirstName)
                    .ThenBy(o => o.Tenant.Apartment.Address.StreetAddress)
                    .ThenBy(o => o.Tenant.Apartment.RoomNumber)
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
