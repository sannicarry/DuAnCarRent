using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class update224 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5dfe2860-0af0-46f6-833c-1059358a6dcd");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "94b6235a-1615-48c6-8599-5d947c0126a4");

            migrationBuilder.RenameColumn(
                name: "rating",
                table: "Review",
                newName: "Rating");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "34ebe316-0105-4a2a-a68d-12f10859c0f6", null, "User", "USER" },
                    { "688b68c2-d1bd-4052-907c-b2c321bf19a9", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "34ebe316-0105-4a2a-a68d-12f10859c0f6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "688b68c2-d1bd-4052-907c-b2c321bf19a9");

            migrationBuilder.RenameColumn(
                name: "Rating",
                table: "Review",
                newName: "rating");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5dfe2860-0af0-46f6-833c-1059358a6dcd", null, "User", "USER" },
                    { "94b6235a-1615-48c6-8599-5d947c0126a4", null, "Admin", "ADMIN" }
                });
        }
    }
}
