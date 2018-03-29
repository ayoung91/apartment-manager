using Components.Entities;
using Components.Logic;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace ApartmentManager.Controllers
{
    [Route("api/[controller]")]
    public class BillingCycleController : Controller
    {
        [HttpGet("[action]")]
        public List<BillingCycle> GetBillingCycles()
        {
            return new BillingCycleLogic().GetBillingCycles();
        }
    }
}
