using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class _10h09052025 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "194648cd-11e2-4d72-9e54-050678e56854");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5339d954-e8c0-4e07-be9a-3f4a7be50651");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "41319c5d-d16a-457b-96d8-df159c32fef1", null, "Admin", "ADMIN" },
                    { "ed3099ee-47e2-4ed6-b516-b2983b4c7517", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "41319c5d-d16a-457b-96d8-df159c32fef1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ed3099ee-47e2-4ed6-b516-b2983b4c7517");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "194648cd-11e2-4d72-9e54-050678e56854", null, "User", "USER" },
                    { "5339d954-e8c0-4e07-be9a-3f4a7be50651", null, "Admin", "ADMIN" }
                });
        }
    }
}
