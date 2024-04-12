using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class updateBrand : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a001beb8-e444-4ef6-8250-a94334862061");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d24f4aaa-bdd5-4ff3-be16-69c6c2429e95");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Brand",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Brand",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "061f01e4-5b85-4b2a-8d71-ca2e22d7d569", null, "User", "USER" },
                    { "2d1a8c2c-f30e-45f3-908f-564e0dfc3e0d", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "061f01e4-5b85-4b2a-8d71-ca2e22d7d569");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2d1a8c2c-f30e-45f3-908f-564e0dfc3e0d");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Brand");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Brand");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a001beb8-e444-4ef6-8250-a94334862061", null, "User", "USER" },
                    { "d24f4aaa-bdd5-4ff3-be16-69c6c2429e95", null, "Admin", "ADMIN" }
                });
        }
    }
}
