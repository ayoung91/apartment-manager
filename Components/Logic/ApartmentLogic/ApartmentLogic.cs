using Components.Data;
using Components.Entities;
using System.Collections.Generic;

namespace Components.Logic
{
    public class ApartmentLogic
    {
        public List<Apartment> GetApartments()
        {
            return new ApartmentData().GetApartments();
        }

        public void AddApartment(Apartment apartment)
        {
            apartment.Available = true;
            apartment.Active = true;
            new ApartmentData().AddApartment(apartment);
        }

        public void UpdateApartment(Apartment apartment)
        {
            apartment.Available = true;
            apartment.Active = true;
            new ApartmentData().UpdateApartment(apartment);
        }

        public void DeleteApartment(Apartment apartment)
        {
            apartment.Active = false;
            apartment.Available = false;
            new ApartmentData().UpdateApartment(apartment);
        }
    }
}
