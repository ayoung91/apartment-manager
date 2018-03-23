using Components.Data.DataContext;
using Components.Entities;

namespace Components.Data
{
    public class AddressData
    {
        public int AddAddress(Address address)
        {
            using (var db = new ApartmentManagerContext())
            {
                var record = db.Address.Add(address);
                db.SaveChanges();
                return record.Entity.Id;
            }
        }
    }
}
