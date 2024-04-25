using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class update234 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "36ea73cf-c3d1-4a8d-b8e8-ba1fce0c5592");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a3a23c52-ac09-4f9f-80d2-e238b12ae637");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "ca986973-fcdd-43be-9c3b-e524469adb35", null, "Admin", "ADMIN" },
                    { "df112a5f-3848-4bad-9fc1-14fdc5d0f29c", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                    { "36ea73cf-c3d1-4a8d-b8e8-ba1fce0c5592", null, "Admin", "ADMIN" },
                    { "a3a23c52-ac09-4f9f-80d2-e238b12ae637", null, "User", "USER" }
                });
        }
    }
}
