﻿using BeerTier.Models;
using BeerTier.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace BeerTier.Repositories
{
    public class BeerRepository : BaseRepository, IBeerRepository
    {
        public BeerRepository(IConfiguration configuration)
            : base(configuration) { }

        public List<Beer> GetAll()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText =
                        @"
                        SELECT b.Id, b.[Name] AS BeerName, b.Content, b.ImageLocation, b.CreateDateTime,
	                        br.[Name] AS BreweryName, br.[Address],
	                        up.DisplayName,
	                        c.[Name] AS CategoryName,
	                        s.[Name] AS StyleName
                        FROM Beer b
	                        JOIN Brewery br ON br.Id = b.BreweryId
	                        LEFT JOIN UserProfile up ON up.Id = b.UserProfileId
	                        LEFT JOIN Category c ON c.Id = b.CategoryId
	                        LEFT JOIN BeerStyle bs ON bs.BeerId = b.Id
	                        LEFT JOIN Style s ON s.Id = bs.StyleId
                        ";

                    List<Beer> beers = new List<Beer>();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Beer beer = new Beer()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "BeerName"),
                                Content = DbUtils.GetString(reader, "Content"),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                                Brewery = new Brewery()
                                {
                                    Name = DbUtils.GetString(reader, "BreweryName"),
                                    Address = DbUtils.GetString(reader, "Address")
                                },
                                UserProfile = new UserProfile()
                                {
                                    DisplayName = DbUtils.GetString(reader, "DisplayName")
                                },
                                Category = new Category()
                                {
                                    Name = DbUtils.GetString(reader, "CategoryName")
                                },
                                Style = new Style()
                                {
                                    Name = DbUtils.GetString(reader, "StyleName")
                                }
                            };
                            beers.Add(beer);
                        }
                    }
                    return beers;
                }
            }
        }
    }
}
