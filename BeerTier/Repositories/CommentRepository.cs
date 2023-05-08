using BeerTier.Models;
using BeerTier.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace BeerTier.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration configuration)
            : base(configuration) { }

        public void Add(Comment comment)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.CommandText =
                        @"
                        INSERT INTO Comment (BeerId, Content, UserProfileId, CreateDateTime)
                        OUTPUT INSERTED.ID
                        VALUES (@BeerId, @Content, @UserProfileId, @CreateDateTime)
                        ";

                    DbUtils.AddParameter(cmd, "@BeerId", comment.BeerId);
                    DbUtils.AddParameter(cmd, "@Content", comment.Content);
                    DbUtils.AddParameter(cmd, "@UserProfileId", comment.UserProfileId);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", comment.CreateDateTime);

                    comment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Comment comment)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Comment SET Content = @Content WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", comment.Id);
                    DbUtils.AddParameter(cmd, "@Content", comment.Content);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(Comment comment)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Comment WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", comment.Id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
