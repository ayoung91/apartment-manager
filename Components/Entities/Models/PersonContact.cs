using System.ComponentModel.DataAnnotations;

namespace Components.Entities
{
    public partial class PersonContact
    {
        public int Id { get; set; }
        public int? PersonId { get; set; }
        [Required]
        [MinLength(5)]
        public string PhoneNumber { get; set; }
        public Person Person { get; set; }
    }
}
