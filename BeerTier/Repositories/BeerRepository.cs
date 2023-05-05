﻿using BeerTier.Models;
using BeerTier.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;

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
                                b.BreweryId, b.UserProfileId,
	                        br.[Name] AS BreweryName, br.[Address],
	                        up.DisplayName, up.IsAdmin,
	                        bs.Id AS BeerStyleId, bs.BeerId,
	                        s.Id AS StyleId, s.[Name] AS StyleName
                        FROM Beer b
	                        JOIN Brewery br ON br.Id = b.BreweryId
	                        LEFT JOIN UserProfile up ON up.Id = b.UserProfileId
	                        LEFT JOIN BeerStyle bs ON bs.BeerId = b.Id
	                        LEFT JOIN Style s ON s.Id = bs.StyleId
                        ORDER BY b.CreateDateTime DESC
                        ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Beer> beers = new List<Beer>();
                        while (reader.Read())
                        {
                            // don't want to make a new Beer obj for every "style" attached to a beer
                            //  just add the style to the list
                            int beerId = DbUtils.GetInt(reader, "BeerId");
                            Beer beer = beers.FirstOrDefault(b => b.Id == beerId);
                            if (beer == null)
                            {
                                beer = new Beer()
                                {
                                    Id = DbUtils.GetInt(reader, "Id"),
                                    Name = DbUtils.GetString(reader, "BeerName"),
                                    Content = DbUtils.GetNullableString(reader, "Content"),
                                    ImageLocation = DbUtils.GetNullableString(
                                        reader,
                                        "ImageLocation"
                                    ),
                                    CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                                    Brewery = new Brewery()
                                    {
                                        Id = DbUtils.GetInt(reader, "BreweryId"),
                                        Name = DbUtils.GetString(reader, "BreweryName"),
                                        Address = DbUtils.GetString(reader, "Address")
                                    },
                                    UserProfile = new UserProfile()
                                    {
                                        Id = DbUtils.GetInt(reader, "UserProfileId"),
                                        IsAdmin = DbUtils.GetBool(reader, "IsAdmin"),
                                        DisplayName = DbUtils.GetString(reader, "DisplayName")
                                    },
                                    Styles = new List<Style>()
                                };
                                beers.Add(beer);
                            }

                            if (DbUtils.IsNotDbNull(reader, "BeerStyleId"))
                            {
                                beer.Styles.Add(
                                    new Style()
                                    {
                                        Id = DbUtils.GetInt(reader, "StyleId"),
                                        Name = DbUtils.GetString(reader, "StyleName")
                                    }
                                );
                            }
                        }
                        return beers;
                    }
                }
            }
        }

        public Beer GetById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText =
                        @"
                        SELECT b.[Name] AS BeerName, b.BreweryId, b.Content AS BeerContent, b.ImageLocation, 
                                b.CreateDateTime AS BeerCreateDateTime, b.UserProfileId AS BeerUserId,
		                    br.[Name] AS BreweryName,
		                    bup.IsAdmin AS BeerUserIsAdmin, bup.DisplayName AS BeerUserDisplayName,
                            bs.Id AS BeerStyleId, bs.BeerId,
	                        s.Id AS StyleId, s.[Name] AS StyleName,
		                    com.UserProfileId AS CommenterId, com.Id AS CommentId, com.Content AS CommentContent, 
                                com.CreateDateTime AS CommentCreateDateTime,
		                    cup.IsAdmin AS CommenterIsAdmin, cup.DisplayName AS CommenterDisplayName
                        FROM Beer b
	                        JOIN Brewery br ON br.Id = b.BreweryId
	                        LEFT JOIN UserProfile bup ON bup.Id = b.UserProfileId
                            LEFT JOIN BeerStyle bs ON bs.BeerId = b.Id
	                        LEFT JOIN Style s ON s.Id = bs.StyleId
	                        LEFT JOIN Comment com ON com.BeerId = b.Id
	                        LEFT JOIN UserProfile cup ON cup.Id = com.UserProfileId
                        WHERE b.Id = @id
                        ";
                    DbUtils.AddParameter(cmd, "@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        Beer beer = null;
                        while (reader.Read())
                        {
                            // don't re-create the beer for multiple comments, styles
                            // just add them to their list
                            if (beer == null)
                            {
                                beer = new Beer()
                                {
                                    Id = id,
                                    Name = DbUtils.GetString(reader, "BeerName"),
                                    Content = DbUtils.GetNullableString(reader, "BeerContent"),
                                    ImageLocation = DbUtils.GetNullableString(
                                        reader,
                                        "ImageLocation"
                                    ),
                                    CreateDateTime = DbUtils.GetDateTime(
                                        reader,
                                        "BeerCreateDateTime"
                                    ),
                                    Brewery = new Brewery()
                                    {
                                        Id = DbUtils.GetInt(reader, "BreweryId"),
                                        Name = DbUtils.GetString(reader, "BreweryName")
                                    },
                                    UserProfile = new UserProfile()
                                    {
                                        Id = DbUtils.GetInt(reader, "BeerUserId"),
                                        IsAdmin = DbUtils.GetBool(reader, "BeerUserIsAdmin"),
                                        DisplayName = DbUtils.GetString(
                                            reader,
                                            "BeerUserDisplayName"
                                        )
                                    },
                                    Styles = new List<Style>(),
                                    Comments = new List<Comment>()
                                };
                            }

                            // don't want to make a new style obj for every style attached to a beer
                            // just add the style to the list
                            int styleId = DbUtils.GetInt(reader, "StyleId");
                            {
                                Style style = beer.Styles.FirstOrDefault(s => s.Id == styleId);
                                if (style == null)
                                {
                                    beer.Styles.Add(
                                        new Style
                                        {
                                            Id = DbUtils.GetInt(reader, "StyleId"),
                                            Name = DbUtils.GetString(reader, "StyleName")
                                        }
                                    );
                                }
                            }

                            // same with comments
                            // NOTE on new Beer classes, no Comments will exist
                            //  so we will handle NULL column values for CommentId here
                            int? commentId = DbUtils.GetNullableInt(reader, "CommentId");

                            if (commentId != null)
                            {
                                Comment comment = beer.Comments.FirstOrDefault(
                                    c => c.Id == commentId
                                );
                                if (comment == null)
                                {
                                    beer.Comments.Add(
                                        new Comment()
                                        {
                                            Id = DbUtils.GetInt(reader, "CommentId"),
                                            Content = DbUtils.GetString(reader, "CommentContent"),
                                            CreateDateTime = DbUtils.GetDateTime(
                                                reader,
                                                "CommentCreateDateTime"
                                            ),
                                            UserProfile = new UserProfile()
                                            {
                                                Id = DbUtils.GetInt(reader, "CommenterId"),
                                                IsAdmin = DbUtils.GetBool(
                                                    reader,
                                                    "CommenterIsAdmin"
                                                ),
                                                DisplayName = DbUtils.GetString(
                                                    reader,
                                                    "CommenterDisplayName"
                                                )
                                            }
                                        }
                                    );
                                }
                            }
                        }
                        return beer;
                    }
                }
            }
        }

        public void Add(Beer beer)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText =
                        @"
                        INSERT INTO Beer ([Name], Content, ImageLocation, BreweryId, CreateDateTime, UserProfileId)
                        OUTPUT INSERTED.ID
                        VALUES
                            (@Name, @Content, @ImageLocation, @BreweryId, @CreateDateTime, @UserProfileId)
                        ";

                    DbUtils.AddParameter(cmd, "@Name", beer.Name);
                    DbUtils.AddParameter(cmd, "@Content", beer.Content);
                    DbUtils.AddParameter(cmd, "@ImageLocation", beer.ImageLocation);
                    DbUtils.AddParameter(cmd, "@BreweryId", beer.BreweryId);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", beer.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@UserProfileId", beer.UserProfileId);

                    beer.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Beer beer)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText =
                        @"
                        UPDATE Beer
                        SET 
                            [Name] = @Name,
                            Content = @Content,
                            ImageLocation = @ImageLocation,
                            BreweryId = @BreweryId
                        WHERE Id = @Id
                        ";

                    DbUtils.AddParameter(cmd, "@Id", beer.Id);
                    DbUtils.AddParameter(cmd, "@Name", beer.Name);
                    DbUtils.AddParameter(cmd, "@Content", beer.Content);
                    DbUtils.AddParameter(cmd, "@ImageLocation", beer.ImageLocation);
                    DbUtils.AddParameter(cmd, "@BreweryId", beer.BreweryId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(Beer beer)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Beer WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", beer.Id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
