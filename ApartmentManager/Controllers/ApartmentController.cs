using Components.Entities;
using Components.Logic;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace ApartmentManager.Controllers
{
    [Route("api/[controller]")]
    public class ApartmentController : Controller
    {
        [HttpGet("[action]")]
        public List<Apartment> GetApartments()
        {
            return new ApartmentLogic().GetApartments();
        }

        [HttpPost("[action]")]
        public void AddApartment([FromBody] Apartment apartment)
        {
            new ApartmentLogic().AddApartment(apartment);
        }

        [HttpPost("[action]")]
        public void UpdateApartment([FromBody] Apartment apartment)
        {
            new ApartmentLogic().UpdateApartment(apartment);
        }

        [HttpPost("[action]")]
        public void DeleteApartment([FromBody] Apartment apartment)
        {
            new ApartmentLogic().DeleteApartment(apartment);
        }
    }
}
