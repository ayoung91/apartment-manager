using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Components.Entities
{
    public partial class Address
    {
        public Address()
        {
            Apartment = new HashSet<Apartment>();
        }

        public int Id { get; set; }
        [Required]
        public string StreetAddress { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string State { get; set; }
        [Required]
        public string ZipCode { get; set; }

        public ICollection<Apartment> Apartment { get; set; }
    }
}
