namespace Components.Entities
{
    public partial class TenantPayment
    {
        public int Id { get; set; }
        public int? TenantId { get; set; }
        public int? PaymentId { get; set; }

        public Payment Payment { get; set; }
        public Tenant Tenant { get; set; }
    }
}
