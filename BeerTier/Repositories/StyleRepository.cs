using BeerTier.Models;
using BeerTier.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace BeerTier.Repositories
{
    public class StyleRepository : BaseRepository, IStyleRepository
    {
        public StyleRepository(IConfiguration configuration)
            : base(configuration) { }

        public List<Style> GetAll()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, [Name] FROM Style";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Style> styles = new List<Style>();
                        while (reader.Read())
                        {
                            styles.Add(
                                new Style()
                                {
                                    Id = DbUtils.GetInt(reader, "Id"),
                                    Name = DbUtils.GetString(reader, "Name")
                                }
                            );
                        }
                        return styles;
                    }
                }
            }
        }

        public Style GetById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT [Name] FROM Style WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        Style style = null;
                        if (reader.Read())
                        {
                            style = new Style()
                            {
                                Id = id,
                                Name = DbUtils.GetString(reader, "Name")
                            };
                        }
                        return style;
                    }
                }
            }
        }

        public void Add(Style style)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText =
                        @"
                        INSERT INTO Style ([Name])
                        OUTPUT INSERTED.ID
                        VALUES (@Name)
                        ";
                    DbUtils.AddParameter(cmd, "@Name", style.Name);
                    style.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Style style)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText =
                        @"
                        UPDATE Style
                        SET [Name] = @Name
                        WHERE Id = @Id
                        ";
                    DbUtils.AddParameter(cmd, "@Id", style.Id);
                    DbUtils.AddParameter(cmd, "@Name", style.Name);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(Style style)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Style WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", style.Id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
