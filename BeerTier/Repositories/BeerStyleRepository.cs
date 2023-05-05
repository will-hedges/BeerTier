using BeerTier.Models;
using BeerTier.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace BeerTier.Repositories
{
    public class BeerStyleRepository : BaseRepository, IBeerStyleRepository
    {
        public BeerStyleRepository(IConfiguration configuration)
            : base(configuration) { }

        public void Add(BeerStyle beerStyle)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText =
                        @"
                        INSERT INTO BeerStyle (BeerId, StyleId)
                        OUTPUT INSERTED.ID
                        VALUES (@BeerId, @StyleId)
                    ";

                    DbUtils.AddParameter(cmd, "@BeerId", beerStyle.BeerId);
                    DbUtils.AddParameter(cmd, "@StyleId", beerStyle.StyleId);

                    beerStyle.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM BeerStyle WHERE BeerId = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
