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
    }
}
