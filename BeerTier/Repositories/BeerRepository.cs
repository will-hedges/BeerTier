using BeerTier.Models;
using BeerTier.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
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
	                        c.[Name] AS CategoryName,
	                        bs.Id AS BeerStyleId, bs.BeerId,
	                        s.Id AS StyleId, s.[Name] AS StyleName
                        FROM Beer b
	                        JOIN Brewery br ON br.Id = b.BreweryId
	                        LEFT JOIN UserProfile up ON up.Id = b.UserProfileId
	                        LEFT JOIN Category c ON c.Id = b.CategoryId
	                        LEFT JOIN BeerStyle bs ON bs.BeerId = b.Id
	                        LEFT JOIN Style s ON s.Id = bs.StyleId
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
                                    Content = DbUtils.GetString(reader, "Content"),
                                    ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
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
                                    Category = new Category()
                                    {
                                        Name = DbUtils.GetString(reader, "CategoryName")
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
                                    Content = DbUtils.GetString(reader, "BeerContent"),
                                    ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
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
                            //  just add the style to the list
                            int styleId = DbUtils.GetInt(reader, "StyleId");
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
                            // same with comments TODO FIXME this is not yet working!!!
                            int commentId = DbUtils.GetInt(reader, "CommentId");
                            Comment comment = beer.Comments.FirstOrDefault(c => c.Id == commentId);
                            if (comment == null)
                            {
                                beer.Comments.Add(
                                    new Comment()
                                    {
                                        Content = DbUtils.GetString(reader, "CommentContent"),
                                        CreateDateTime = DbUtils.GetDateTime(
                                            reader,
                                            "CommentCreateDateTime"
                                        ),
                                        UserProfile = new UserProfile()
                                        {
                                            Id = DbUtils.GetInt(reader, "CommenterId"),
                                            IsAdmin = DbUtils.GetBool(reader, "CommenterIsAdmin"),
                                            DisplayName = DbUtils.GetString(
                                                reader,
                                                "CommenterDisplayName"
                                            )
                                        }
                                    }
                                );
                            }
                        }
                        return beer;
                    }
                }
            }
        }
    }
}
