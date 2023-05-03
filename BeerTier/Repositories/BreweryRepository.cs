using BeerTier.Models;
using BeerTier.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;

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
                    cmd.CommandText = "SELECT Id, [Name] FROM Brewery ORDER BY [Name]";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Brewery> breweries = new List<Brewery>();
                        while (reader.Read())
                        {
                            breweries.Add(
                                new Brewery()
                                {
                                    Id = DbUtils.GetInt(reader, "Id"),
                                    Name = DbUtils.GetString(reader, "Name")
                                }
                            );
                        }
                        return breweries;
                    }
                }
            }
        }
    }
}
