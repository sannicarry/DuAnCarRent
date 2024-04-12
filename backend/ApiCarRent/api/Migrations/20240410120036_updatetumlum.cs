using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class updatetumlum : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "061f01e4-5b85-4b2a-8d71-ca2e22d7d569");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2d1a8c2c-f30e-45f3-908f-564e0dfc3e0d");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "d219044d-3919-420e-8e0c-278ebbdf0570", null, "Admin", "ADMIN" },
                    { "deda1875-8610-455f-acc8-8098f2464c5f", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d219044d-3919-420e-8e0c-278ebbdf0570");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "deda1875-8610-455f-acc8-8098f2464c5f");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "061f01e4-5b85-4b2a-8d71-ca2e22d7d569", null, "User", "USER" },
                    { "2d1a8c2c-f30e-45f3-908f-564e0dfc3e0d", null, "Admin", "ADMIN" }
                });
        }
    }
}
