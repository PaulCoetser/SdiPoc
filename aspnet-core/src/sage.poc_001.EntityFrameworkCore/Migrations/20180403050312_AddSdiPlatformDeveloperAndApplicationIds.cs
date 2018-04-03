using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace sage.poc_001.Migrations
{
    public partial class AddSdiPlatformDeveloperAndApplicationIds : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DeveloperIdFromSdiPlatform",
                table: "SDIDevelopers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ApplicationIdFromSdiPlatform",
                table: "SDIApplications",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeveloperIdFromSdiPlatform",
                table: "SDIDevelopers");

            migrationBuilder.DropColumn(
                name: "ApplicationIdFromSdiPlatform",
                table: "SDIApplications");
        }
    }
}
