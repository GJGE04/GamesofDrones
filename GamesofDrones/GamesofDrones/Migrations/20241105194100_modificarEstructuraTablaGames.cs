using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GamesofDrones.Migrations
{
    /// <inheritdoc />
    public partial class modificarEstructuraTablaGames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Player1Choice",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "Player2Choice",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "Round",
                table: "Games");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Player1Choice",
                table: "Games",
                type: "varchar(20)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Player2Choice",
                table: "Games",
                type: "varchar(20)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Round",
                table: "Games",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
