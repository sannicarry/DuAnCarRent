using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class llll : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4354b965-e62b-4d01-9c4b-181b5fea52fc");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "90e83caa-9cc9-4ae0-ae61-bbb7b2faf1ee");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "43a5d5bb-6a8e-4739-8e49-7f33fd577d52", null, "Admin", "ADMIN" },
                    { "ec4008d6-c997-4b83-83ce-585f3009d870", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_CarModel_BrandId",
                table: "CarModel",
                column: "BrandId");

            migrationBuilder.AddForeignKey(
                name: "FK_CarModel_Brand_BrandId",
                table: "CarModel",
                column: "BrandId",
                principalTable: "Brand",
                principalColumn: "BrandId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CarModel_Brand_BrandId",
                table: "CarModel");

            migrationBuilder.DropIndex(
                name: "IX_CarModel_BrandId",
                table: "CarModel");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "43a5d5bb-6a8e-4739-8e49-7f33fd577d52");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ec4008d6-c997-4b83-83ce-585f3009d870");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4354b965-e62b-4d01-9c4b-181b5fea52fc", null, "User", "USER" },
                    { "90e83caa-9cc9-4ae0-ae61-bbb7b2faf1ee", null, "Admin", "ADMIN" }
                });
        }
    }
}
