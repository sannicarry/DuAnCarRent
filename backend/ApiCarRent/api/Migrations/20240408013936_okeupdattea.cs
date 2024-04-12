using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class okeupdattea : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2229ef4b-1871-4d8e-8bb2-4345541222e6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7a8fb2c5-d9b0-4162-a7f2-4430d20b0073");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a001beb8-e444-4ef6-8250-a94334862061", null, "User", "USER" },
                    { "d24f4aaa-bdd5-4ff3-be16-69c6c2429e95", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a001beb8-e444-4ef6-8250-a94334862061");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d24f4aaa-bdd5-4ff3-be16-69c6c2429e95");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2229ef4b-1871-4d8e-8bb2-4345541222e6", null, "Admin", "ADMIN" },
                    { "7a8fb2c5-d9b0-4162-a7f2-4430d20b0073", null, "User", "USER" }
                });
        }
    }
}
