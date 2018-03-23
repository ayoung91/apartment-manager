using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Components.Entities
{
    public partial class Person
    {
        public Person()
        {
            PersonContact = new PersonContact();
            Tenant = new HashSet<Tenant>();
        }

        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }

        public PersonContact PersonContact { get; set; }
        public ICollection<Tenant> Tenant { get; set; }
    }
}
