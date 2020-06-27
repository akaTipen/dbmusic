using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

namespace dbmusic.Models
{
    public partial class dbmusicContext : DbContext
    {
        public dbmusicContext()
        {
        }

        public dbmusicContext(DbContextOptions<dbmusicContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Artists> Artists { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile("appsettings.json")
                .Build();

                optionsBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Artists>(entity =>
            {
                entity.HasKey(e => e.ArtistId);

                entity.Property(e => e.ArtistId).HasColumnName("ArtistID");

                entity.Property(e => e.AlbumName)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.ArtistName)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.ImageUrl)
                    .HasColumnName("ImageURL")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Price).HasColumnType("numeric(10, 2)");

                entity.Property(e => e.ReleaseDate).HasColumnType("date");

                entity.Property(e => e.SampleUrl)
                    .HasColumnName("SampleURL")
                    .HasMaxLength(200)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
