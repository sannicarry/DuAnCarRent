using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class updatelaiaokelakl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                    { "2fa35c7c-bd01-48c5-9108-ba4923da1fcb", null, "User", "USER" },
                    { "33c0fe0b-9789-4fd7-989e-6a0e2886246e", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2fa35c7c-bd01-48c5-9108-ba4923da1fcb");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "33c0fe0b-9789-4fd7-989e-6a0e2886246e");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "d219044d-3919-420e-8e0c-278ebbdf0570", null, "Admin", "ADMIN" },
                    { "deda1875-8610-455f-acc8-8098f2464c5f", null, "User", "USER" }
                });
        }
    }
}
