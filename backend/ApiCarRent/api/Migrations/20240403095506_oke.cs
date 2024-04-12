using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class oke : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1f8faa00-86fc-41a0-80ad-fb17c3eb3a45");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ff76beb1-6d60-4bae-9b54-8473a0cd2776");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5dbf001e-4655-4fc0-8a07-5eead56f42d8", null, "Admin", "ADMIN" },
                    { "c448aa09-6078-4e7a-83c3-2fdf9aaeaeee", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5dbf001e-4655-4fc0-8a07-5eead56f42d8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c448aa09-6078-4e7a-83c3-2fdf9aaeaeee");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1f8faa00-86fc-41a0-80ad-fb17c3eb3a45", null, "Admin", "ADMIN" },
                    { "ff76beb1-6d60-4bae-9b54-8473a0cd2776", null, "User", "USER" }
                });
        }
    }
}
