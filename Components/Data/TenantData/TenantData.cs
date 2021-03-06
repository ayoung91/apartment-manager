﻿using Components.Data.DataContext;
using Components.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Components.Data
{
    public class TenantData
    {
        public List<Tenant> GetTenants()
        {
            using (var db = new ApartmentManagerContext())
            {
                var tenants = db.Tenant
                    .Where(w => w.Active == true)
                    .Include(p => p.Person)
                        .ThenInclude(pc => pc.PersonContact)
                    .Include(a => a.Apartment)
                        .ThenInclude(ad => ad.Address)
                    .Include(bc => bc.StartBillingCycle)
                    .Include(bc => bc.EndBillingCycle)
                    .OrderBy(o => o.Person.LastName)
                    .ToList();

                return tenants;
            }
        }

        public void AddTenant(Tenant tenant)
        {
            using (var db = new ApartmentManagerContext())
            {
                tenant.Apartment.Address = db.Address.Find(tenant.Apartment.Address.Id);
                tenant.Apartment = db.Apartment.Find(tenant.Apartment.Id);
                tenant.StartBillingCycle = db.BillingCycle.Find(tenant.StartBillingCycleId);
                tenant.EndBillingCycle = db.BillingCycle.Find(tenant.EndBillingCycleId);
                tenant.Apartment.Available = false;
                db.Tenant.Add(tenant);

                var tenantPayment = new TenantPayment() { TenantId = tenant.Id };
                db.TenantPayment.Add(tenantPayment);
                db.SaveChanges();
            }
        }

        public void UpdateTenant(Tenant tenant)
        {
            using (var db = new ApartmentManagerContext())
            {
                tenant.StartBillingCycle = db.BillingCycle.Find(tenant.StartBillingCycleId);
                tenant.EndBillingCycle = db.BillingCycle.Find(tenant.EndBillingCycleId);
                db.Tenant.Update(tenant);
                db.SaveChanges();
            }
        }
    }
}
