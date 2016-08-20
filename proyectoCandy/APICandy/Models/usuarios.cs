namespace APICandy.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class usuarios
    {
        public int Id { get; set; }

        [Required]
        [StringLength(250)]
        public string usuario { get; set; }

        [StringLength(50)]
        public string password { get; set; }
    }
}
