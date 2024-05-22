using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EcomerceApp.Migrations
{
    /// <inheritdoc />
    public partial class addNoteOrders : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "note",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "note",
                table: "Orders");
        }
    }
}
