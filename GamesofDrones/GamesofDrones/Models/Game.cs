using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GamesofDrones.Models
{
    public class Game
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName ="varchar(20)")]
        public string Player1 { get; set; }

        [Required]
        [Column(TypeName = "varchar(20)")]
        public string Player2 { get; set; }

        public int Player1Score { get; set; } = 0;

        public int Player2Score { get; set; } = 0;

        [Column(TypeName = "varchar(20)")]
        public string Result { get; set; }
    }
}
