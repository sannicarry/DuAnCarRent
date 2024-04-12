using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class update555 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a0e4b98a-3837-46b8-831f-9516a503f3cb");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b4976633-0e1f-427b-a51d-753b963afc49");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1f8faa00-86fc-41a0-80ad-fb17c3eb3a45", null, "Admin", "ADMIN" },
                    { "ff76beb1-6d60-4bae-9b54-8473a0cd2776", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                    { "a0e4b98a-3837-46b8-831f-9516a503f3cb", null, "User", "USER" },
                    { "b4976633-0e1f-427b-a51d-753b963afc49", null, "Admin", "ADMIN" }
                });
        }
    }
}
