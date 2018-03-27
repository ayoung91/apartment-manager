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
                    .Include(p => p.Payment)
                    .ToList();

                return payments;
            }
        }
    }
}
