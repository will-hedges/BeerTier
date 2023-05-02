using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using BeerTier.Utils;
using BeerTier.Models;
using System;

namespace BeerTier.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration)
            : base(configuration) { }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText =
                        @"
                        SELECT Id, IsAdmin, FirebaseUserId, FirstName, LastName, Email, DisplayName, ImageLocation, CreateDateTime FROM UserProfile
                        WHERE FirebaseUserId = @firebaseUserId; 
                        ";

                    DbUtils.AddParameter(cmd, "@firebaseUserId", firebaseUserId);

                    UserProfile userProfile = null;

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            userProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                IsAdmin = DbUtils.GetBool(reader, "IsAdmin"),
                                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime")
                            };
                        }
                    }
                    return userProfile;
                }
            }
        }

        public void Add(UserProfile userProfile)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText =
                        @"
                        INSERT INTO UserProfile (IsAdmin, FirebaseUserId, FirstName, LastName, Email, DisplayName, ImageLocation, CreateDateTime)
                        OUTPUT INSERTED.ID
                        VALUES (@IsAdmin, @FirebaseUserId, @FirstName, @LastName, @Email, @DisplayName, @ImageLocation, @CreateDateTime)
                    ";

                    DbUtils.AddParameter(cmd, "@IsAdmin", userProfile.IsAdmin);
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@DisplayName", userProfile.DisplayName);
                    DbUtils.AddParameter(cmd, "@ImageLocation", userProfile.ImageLocation);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", userProfile.CreateDateTime);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
