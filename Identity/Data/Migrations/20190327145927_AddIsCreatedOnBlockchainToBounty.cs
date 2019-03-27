using Microsoft.EntityFrameworkCore.Migrations;

namespace Identity.Data.Migrations
{
    public partial class AddIsCreatedOnBlockchainToBounty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsCreatedOnBlockchain",
                table: "Bounties",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsCreatedOnBlockchain",
                table: "Bounties");
        }
    }
}
