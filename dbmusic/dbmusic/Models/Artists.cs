using System;
using System.Collections.Generic;

namespace dbmusic.Models
{
    public partial class Artists
    {
        public int ArtistId { get; set; }
        public string ArtistName { get; set; }
        public string AlbumName { get; set; }
        public string ImageUrl { get; set; }
        public DateTime ReleaseDate { get; set; }
        public decimal Price { get; set; }
        public string SampleUrl { get; set; }
    }
}
