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

        [HttpPost("[action]")]
        public void AddPayment([FromBody]TenantPayment payment)
        {
            new PaymentLogic().AddPayment(payment);
        }

        [HttpPost("[action]")]
        public void UpdatePayment([FromBody]TenantPayment payment)
        {
            new PaymentLogic().UpdatePayment(payment);
        }
    }
}
