using Components.Entities;
using Microsoft.EntityFrameworkCore;

namespace Components.Data.DataContext
{
    public class ApartmentManagerContext : DbContext
    {
        public virtual DbSet<Address> Address { get; set; }
        public virtual DbSet<Apartment> Apartment { get; set; }
        public virtual DbSet<Payment> Payment { get; set; }
        public virtual DbSet<Person> Person { get; set; }
        public virtual DbSet<PersonContact> PersonContact { get; set; }
        public virtual DbSet<Tenant> Tenant { get; set; }
        public virtual DbSet<TenantPayment> TenantPayment { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=MCX-YOUNGA;Database=ApartmentManager;Trusted_Connection=True;");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Address>(entity =>
            {
                entity.Property(e => e.City)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.State)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.StreetAddress)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ZipCode)
                    .HasMaxLength(5)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Apartment>(entity =>
            {
                entity.Property(e => e.RentCost).HasColumnType("decimal(6, 2)");

                entity.Property(e => e.SecurityDeposit).HasColumnType("decimal(6, 2)");

                entity.HasOne(d => d.Address)
                    .WithMany(p => p.Apartment)
                    .HasForeignKey(d => d.AddressId);
            });

            modelBuilder.Entity<Payment>(entity =>
            {
                entity.Property(e => e.Amount).HasColumnType("decimal(6, 2)");

                entity.Property(e => e.Date).HasColumnType("datetime");
            });

            modelBuilder.Entity<Person>(entity =>
            {
                entity.Property(e => e.FirstName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<PersonContact>(entity =>
            {
                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.HasOne(d => d.Person)
                    .WithOne(p => p.PersonContact);
            });

            modelBuilder.Entity<Tenant>(entity =>
            {
                entity.HasOne(d => d.Apartment)
                    .WithMany(p => p.Tenant)
                    .HasForeignKey(d => d.ApartmentId);

                entity.HasOne(d => d.Person)
                    .WithMany(p => p.Tenant)
                    .HasForeignKey(d => d.PersonId);
            });

            modelBuilder.Entity<TenantPayment>(entity =>
            {
                entity.HasOne(d => d.Payment)
                    .WithMany(p => p.TenantPayment)
                    .HasForeignKey(d => d.PaymentId);

                entity.HasOne(d => d.Tenant)
                    .WithMany(p => p.TenantPayment)
                    .HasForeignKey(d => d.TenantId);
            });
        }
    }
}
