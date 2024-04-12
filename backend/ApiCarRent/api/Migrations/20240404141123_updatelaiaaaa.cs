using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class updatelaiaaaa : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "af9aec08-666c-4a5a-81f8-36dd6f489e50");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e1351a85-d062-4af7-8133-8f3d58c72830");

            migrationBuilder.AddColumn<string>(
                name: "Transmission",
                table: "Car",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2229ef4b-1871-4d8e-8bb2-4345541222e6", null, "Admin", "ADMIN" },
                    { "7a8fb2c5-d9b0-4162-a7f2-4430d20b0073", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2229ef4b-1871-4d8e-8bb2-4345541222e6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7a8fb2c5-d9b0-4162-a7f2-4430d20b0073");

            migrationBuilder.DropColumn(
                name: "Transmission",
                table: "Car");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "af9aec08-666c-4a5a-81f8-36dd6f489e50", null, "User", "USER" },
                    { "e1351a85-d062-4af7-8133-8f3d58c72830", null, "Admin", "ADMIN" }
                });
        }
    }
}
