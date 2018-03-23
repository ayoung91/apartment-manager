using Components.Data.DataContext;
using Components.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Components.Data
{
    public class ApartmentData
    {
        public List<Apartment> GetApartments()
        {
            using (var db = new ApartmentManagerContext())
            {
                var apartments = db.Apartment
                    .Where(w => w.Active == true)
                    .Include(a => a.Address)
                    .ToList();

                return apartments;
            }
        }

        public void AddApartment(Apartment apartment)
        {
            using (var db = new ApartmentManagerContext())
            {
                var record = db.Apartment.Add(apartment);
                db.SaveChanges();
            }
        }

        public void UpdateApartment(Apartment apartment)
        {
            using (var db = new ApartmentManagerContext())
            {
                var record = db.Apartment.Update(apartment);
                db.SaveChanges();
            }
        }
    }
}
