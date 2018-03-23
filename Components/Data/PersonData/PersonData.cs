using Components.Data.DataContext;
using Components.Entities;

namespace Components.Data
{
    public class PersonData
    {
        public int AddPerson(Person person)
        {
            using (var db = new ApartmentManagerContext())
            {
                var record = db.Person.Add(person);
                db.SaveChanges();
                return record.Entity.Id;
            }
        }
    }
}
