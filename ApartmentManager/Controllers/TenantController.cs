using Components.Entities;
using Components.Logic;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace ApartmentManagement.Controllers
{
    [Route("api/[controller]")]
    public class TenantController : Controller
    {
        [HttpGet("[action]")]
        public List<Tenant> GetTenants()
        {
            return new TenantLogic().GetTenants();
        }

        [HttpPost("[action]")]
        public void AddTenant([FromBody] Tenant tenant)
        {
            new TenantLogic().AddTenant(tenant);
        }

        [HttpPost("[action]")]
        public void UpdateTenant([FromBody] Tenant tenant)
        {
            new TenantLogic().UpdateTenant(tenant);
        }

        [HttpPost("[action]")]
        public void DeleteTenant([FromBody] Tenant tenant)
        {
            new TenantLogic().DeleteTenant(tenant);
        }
    }
}
