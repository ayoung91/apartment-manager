using System.ComponentModel.DataAnnotations;

namespace Components.Entities
{
    public partial class Tenant
    {
        public int Id { get; set; }
        public int? PersonId { get; set; }
        public int? ApartmentId { get; set; }
        [Required]
        public bool Active { get; set; }
        [Required]
        public Apartment Apartment { get; set; }
        [Required]
        public Person Person { get; set; }
    }
}
