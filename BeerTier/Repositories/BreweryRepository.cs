using BeerTier.Models;
using BeerTier.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace BeerTier.Repositories
{
    public class BreweryRepository : BaseRepository, IBreweryRepository
    {
        public BreweryRepository(IConfiguration configuration)
            : base(configuration) { }

        public List<Brewery> GetAll()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText =
                        @"
                        SELECT Id, [Name], Address, ImageLocation, UserProfileId, CreateDateTime 
                        FROM Brewery
                        ORDER BY [Name]";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Brewery> breweries = new List<Brewery>();
                        while (reader.Read())
                        {
                            breweries.Add(
                                new Brewery()
                                {
                                    Id = DbUtils.GetInt(reader, "Id"),
                                    Name = DbUtils.GetString(reader, "Name"),
                                    Address = DbUtils.GetString(reader, "Address"),
                                    ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                                    UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                    CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime")
                                }
                            );
                        }
                        return breweries;
                    }
                }
            }
        }

        public Brewery GetById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText =
                        @"
                        SELECT [Name], Address, ImageLocation, UserProfileId, CreateDateTime 
                        FROM Brewery
                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        Brewery brewery = null;
                        if (reader.Read())
                        {
                            brewery = new Brewery()
                            {
                                Id = id,
                                Name = DbUtils.GetString(reader, "Name"),
                                Address = DbUtils.GetString(reader, "Address"),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime")
                            };
                        }
                        return brewery;
                    }
                }
            }
        }

        public void Add(Brewery brewery)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText =
                        @"
                        INSERT INTO Brewery
                            ([Name], Address, ImageLocation, UserProfileId, CreateDateTime)
                        OUTPUT INSERTED.ID
                        VALUES
                            (@Name, @Address, @ImageLocation, @UserProfileId, @CreateDateTime)
                        ";

                    DbUtils.AddParameter(cmd, "@Name", brewery.Name);
                    DbUtils.AddParameter(cmd, "@Address", brewery.Address);
                    DbUtils.AddParameter(cmd, "@ImageLocation", brewery.ImageLocation);
                    DbUtils.AddParameter(cmd, "@UserProfileId", brewery.UserProfileId);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", brewery.CreateDateTime);

                    brewery.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Brewery brewery)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText =
                        @"
                        UPDATE Brewery
                        SET
                            Name = @Name
                            Address = @Address,
                            ImageLocation = @ImageLocation
                        WHERE
                            Id = @Id
                        ";

                    DbUtils.AddParameter(cmd, "@Id", brewery.Id);
                    DbUtils.AddParameter(cmd, "@Name", brewery.Name);
                    DbUtils.AddParameter(cmd, "@Address", brewery.Address);
                    DbUtils.AddParameter(cmd, "@ImageLocation", brewery.ImageLocation);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(Brewery brewery)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Brewery WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", brewery.Id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
