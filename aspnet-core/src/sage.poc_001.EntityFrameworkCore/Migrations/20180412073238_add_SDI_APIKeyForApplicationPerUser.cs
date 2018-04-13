using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace sage.poc_001.Migrations
{
    public partial class add_SDI_APIKeyForApplicationPerUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApiKeySdi",
                table: "SDIApplications");

            migrationBuilder.AddColumn<string>(
                name: "ApiKeySdi",
                table: "SDIUser",
                maxLength: 32,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApiKeySdi",
                table: "SDIUser");

            migrationBuilder.AddColumn<string>(
                name: "ApiKeySdi",
                table: "SDIApplications",
                maxLength: 32,
                nullable: true);
        }
    }
}
