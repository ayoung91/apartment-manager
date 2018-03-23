using Components.Data;
using Components.Entities;
using System.Collections.Generic;

namespace Components.Logic
{
    public class TenantLogic
    {
        public List<Tenant> GetTenants()
        {
            return new TenantData().GetTenants();
        }

        public void AddTenant(Tenant tenant)
        {
            tenant.Active = true;
            new TenantData().AddTenant(tenant);
        }

        public void UpdateTenant(Tenant tenant)
        {
            tenant.Active = true;
            new TenantData().UpdateTenant(tenant);
        }

        public void DeleteTenant(Tenant tenant)
        {
            tenant.Active = false;
            tenant.Apartment = null;
            tenant.ApartmentId = null;
            new TenantData().UpdateTenant(tenant);
        }
    }
}
