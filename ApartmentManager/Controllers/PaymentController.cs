using Components.Entities;
using Components.Logic;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace ApartmentManagement.Controllers
{
    [Route("api/[controller]")]
    public class PaymentController : Controller
    {
        [HttpGet("[action]")]
        public List<TenantPayment> GetPayments()
        {
            return new PaymentLogic().GetPayments();
        }
    }
}
