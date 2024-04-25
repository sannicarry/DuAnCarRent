using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class update22444 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_Car_CarId",
                table: "Order");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "688894bf-84d6-46a4-8e4f-75c28e6bc2b5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b6c9599f-4db1-48bb-b3a0-1bd7172073b6");

            migrationBuilder.AlterColumn<TimeSpan>(
                name: "TimeTo",
                table: "Order",
                type: "time",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<TimeSpan>(
                name: "TimeFrom",
                table: "Order",
                type: "time",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<int>(
                name: "CarId",
                table: "Order",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "36ea73cf-c3d1-4a8d-b8e8-ba1fce0c5592", null, "Admin", "ADMIN" },
                    { "a3a23c52-ac09-4f9f-80d2-e238b12ae637", null, "User", "USER" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Car_CarId",
                table: "Order",
                column: "CarId",
                principalTable: "Car",
                principalColumn: "CarId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_Car_CarId",
                table: "Order");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "36ea73cf-c3d1-4a8d-b8e8-ba1fce0c5592");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a3a23c52-ac09-4f9f-80d2-e238b12ae637");

            migrationBuilder.AlterColumn<DateTime>(
                name: "TimeTo",
                table: "Order",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(TimeSpan),
                oldType: "time");

            migrationBuilder.AlterColumn<DateTime>(
                name: "TimeFrom",
                table: "Order",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(TimeSpan),
                oldType: "time");

            migrationBuilder.AlterColumn<int>(
                name: "CarId",
                table: "Order",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "688894bf-84d6-46a4-8e4f-75c28e6bc2b5", null, "User", "USER" },
                    { "b6c9599f-4db1-48bb-b3a0-1bd7172073b6", null, "Admin", "ADMIN" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Car_CarId",
                table: "Order",
                column: "CarId",
                principalTable: "Car",
                principalColumn: "CarId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
