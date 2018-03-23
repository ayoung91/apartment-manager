using Components.Data.DataContext;
using Components.Entities;

namespace Components.Data
{
    public class PersonContactData
    {
        public int AddPersonContact(PersonContact personContact)
        {
            using (var db = new ApartmentManagerContext())
            {
                var record = db.PersonContact.Add(personContact);
                db.SaveChanges();
                return record.Entity.Id;
            }
        }
    }
}
