using System.Collections.Generic;

namespace Components.Entities
{
    public partial class Person
    {
        public Person()
        {
            Tenant = new HashSet<Tenant>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public PersonContact PersonContact { get; set; }
        public ICollection<Tenant> Tenant { get; set; }
    }
}
