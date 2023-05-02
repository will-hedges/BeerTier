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
	                        br.[Name] AS BreweryName, br.[Address],
	                        up.DisplayName,
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
                        SELECT b.[Name], b.Content AS BeerContent, b.ImageLocation, b.CreateDateTime AS BeerCreateDateTime,
		                    br.[Name] AS BreweryName,
		                    cat.[Name] AS CategoryName,
		                    bup.DisplayName AS BeerUserProfileDisplayName,
		                    com.Id AS CommentId, com.Content AS CommentContent, com.CreateDateTime AS CommentCreateDateTime,
		                    cup.DisplayName AS CommentUserProfileDisplayName
                        FROM Beer b
	                        JOIN Brewery br ON br.Id = b.BreweryId
	                        LEFT JOIN Category cat on cat.Id = b.CategoryId
	                        LEFT JOIN UserProfile bup ON bup.Id = b.UserProfileId
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
                            // don't re-create the beer for multiple comments
                            // just add them to their list
                            if (beer == null)
                            {
                                beer = new Beer()
                                {
                                    Id = id,
                                    Content = DbUtils.GetString(reader, "BeerContent"),
                                    ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                                    CreateDateTime = DbUtils.GetDateTime(
                                        reader,
                                        "BeerCreateDateTime"
                                    ),
                                    Brewery = new Brewery()
                                    {
                                        Name = DbUtils.GetString(reader, "BreweryName")
                                    },
                                    Category = new Category()
                                    {
                                        Name = DbUtils.GetString(reader, "CategoryName")
                                    },
                                    UserProfile = new UserProfile()
                                    {
                                        DisplayName = DbUtils.GetString(
                                            reader,
                                            "BeerUserProfileDisplayName"
                                        )
                                    },
                                    Comments = new List<Comment>()
                                };
                            }
                            if (DbUtils.IsNotDbNull(reader, "CommentId"))
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
                                            DisplayName = DbUtils.GetString(
                                                reader,
                                                "CommentUserProfileDisplayName"
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
