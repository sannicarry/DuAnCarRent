using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class _592024 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ca986973-fcdd-43be-9c3b-e524469adb35");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "df112a5f-3848-4bad-9fc1-14fdc5d0f29c");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "194648cd-11e2-4d72-9e54-050678e56854", null, "User", "USER" },
                    { "5339d954-e8c0-4e07-be9a-3f4a7be50651", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                    { "ca986973-fcdd-43be-9c3b-e524469adb35", null, "Admin", "ADMIN" },
                    { "df112a5f-3848-4bad-9fc1-14fdc5d0f29c", null, "User", "USER" }
                });
        }
    }
}
