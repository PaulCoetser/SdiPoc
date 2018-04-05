using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace sage.poc_001.Migrations
{
    public partial class Add_SDI_User : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SDIUser",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ApplicationIdFromSdiPlatform = table.Column<string>(maxLength: 32, nullable: false),
                    Expires = table.Column<DateTimeOffset>(nullable: false),
                    Passcode = table.Column<string>(maxLength: 10, nullable: false),
                    SDI_ApplicationId = table.Column<int>(nullable: false),
                    UserId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SDIUser", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SDIUser_SDIApplications_SDI_ApplicationId",
                        column: x => x.SDI_ApplicationId,
                        principalTable: "SDIApplications",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SDIUser_AbpUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SDIUser_SDI_ApplicationId",
                table: "SDIUser",
                column: "SDI_ApplicationId");

            migrationBuilder.CreateIndex(
                name: "IX_SDIUser_UserId",
                table: "SDIUser",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_SDIUser_ApplicationIdFromSdiPlatform_UserId",
                table: "SDIUser",
                columns: new[] { "ApplicationIdFromSdiPlatform", "UserId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SDIUser");
        }
    }
}
