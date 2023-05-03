USE [BeerTier];
GO

--Seed data for Style table
INSERT INTO [Style] ([Name]) VALUES ('Ale');
INSERT INTO [Style] ([Name]) VALUES ('Lager');
INSERT INTO [Style] ([Name]) VALUES ('Pilsner');
INSERT INTO [Style] ([Name]) VALUES ('Stout');
INSERT INTO [Style] ([Name]) VALUES ('IPA');
INSERT INTO [Style] ([Name]) VALUES ('Wheat');
INSERT INTO [Style] ([Name]) VALUES ('Porter');
INSERT INTO [Style] ([Name]) VALUES ('Sour');
INSERT INTO [Style] ([Name]) VALUES ('Belgian');
INSERT INTO [Style] ([Name]) VALUES ('Brown Ale');
INSERT INTO [Style] ([Name]) VALUES ('Pale Ale');

--Seed data for Brewery table
INSERT INTO [Brewery] ([Name], [Address], [ImageLocation], [UserProfileId], [CreateDateTime]) VALUES ('Brewery A', '123 Main St, Anytown USA', 'https://example.com/brewerya.jpg', 1, '2023-05-01 10:00:00');
INSERT INTO [Brewery] ([Name], [Address], [ImageLocation], [UserProfileId], [CreateDateTime]) VALUES ('Brewery B', '456 Oak St, Anytown USA', 'https://example.com/breweryb.jpg', 1, '2023-05-01 10:00:00');
INSERT INTO [Brewery] ([Name], [Address], [ImageLocation], [UserProfileId], [CreateDateTime]) VALUES ('Brewery C', '789 Pine St, Anytown USA', 'https://example.com/breweryc.jpg', 2, '2023-05-01 10:00:00');
INSERT INTO [Brewery] ([Name], [Address], [ImageLocation], [UserProfileId], [CreateDateTime]) VALUES ('Brewery D', '101 Elm St, Anytown USA', 'https://example.com/breweryd.jpg', 3, '2023-05-01 10:00:00');

--Seed data for UserProfile table
INSERT INTO [UserProfile] ([IsAdmin], [FirebaseUserId], [FirstName], [LastName], [Email], [DisplayName], [ImageLocation], [CreateDateTime]) VALUES (1, '123abc', 'John', 'Doe', 'johndoe@example.com', 'JohnDoe', 'https://example.com/johndoe.jpg', '2023-05-01 10:00:00');
INSERT INTO [UserProfile] ([IsAdmin], [FirebaseUserId], [FirstName], [LastName], [Email], [DisplayName], [ImageLocation], [CreateDateTime]) VALUES (0, '456def', 'Jane', 'Smith', 'janesmith@example.com', 'JaneSmith', 'https://example.com/janesmith.jpg', '2023-05-01 10:00:00');
INSERT INTO [UserProfile] ([IsAdmin], [FirebaseUserId], [FirstName], [LastName], [Email], [DisplayName], [ImageLocation], [CreateDateTime]) VALUES (0, '789ghi', 'Bob', 'Jones', 'bobjones@example.com', 'BobJones', 'https://example.com/bobjones.jpg', '2023-05-01 10:00:00');
INSERT INTO [UserProfile] ([IsAdmin], [FirebaseUserId], [FirstName], [LastName], [Email], [DisplayName], [ImageLocation], [CreateDateTime]) VALUES (0, '101jkl', 'Emily', 'Brown', 'emilybrown@example.com', 'EmilyBrown', 'https://example.com/emilybrown.jpg', '2023-05-01 10:00:00');

--Seed data for Beer table
INSERT INTO [Beer] ([Name], [Content], [ImageLocation], [BreweryId], [CreateDateTime], [UserProfileId])
VALUES
    ('Hoppy IPA', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra ut felis vel tincidunt. Curabitur vitae odio at mauris tincidunt tincidunt. Ut tristique mauris ut venenatis congue. Sed quis sagittis eros. Fusce a tellus non leo tincidunt mollis.', 'https://example.com/hoppy_ipa.jpg', 1, '2022-04-22 10:34:09', 1),
    ('Belgian Dubbel', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra ut felis vel tincidunt. Curabitur vitae odio at mauris tincidunt tincidunt. Ut tristique mauris ut venenatis congue. Sed quis sagittis eros. Fusce a tellus non leo tincidunt mollis.', 'https://example.com/belgian_dubbel.jpg', 2, '2022-04-23 11:23:15', 2),
    ('Stout', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra ut felis vel tincidunt. Curabitur vitae odio at mauris tincidunt tincidunt. Ut tristique mauris ut venenatis congue. Sed quis sagittis eros. Fusce a tellus non leo tincidunt mollis.', 'https://example.com/stout.jpg', 3, '2022-04-25 09:15:27', 3);

--Seed data for BeerStyle table
INSERT INTO [BeerStyle] ([BeerId], [StyleId])
VALUES
    (1, 1),
    (1, 2),
    (2, 3),
    (3, 4),
    (3, 5);

--Seed data for Comment table
INSERT INTO [Comment] ([BeerId], [Content], [UserProfileId], [CreateDateTime])
VALUES
    (1, 'This IPA is amazing!', 2, '2022-04-24 14:27:45'),
    (1, 'Too hoppy for my taste.', 3, '2022-04-25 09:42:12'),
    (2, 'The Belgian Dubbel has a great flavor profile.', 1, '2022-04-26 10:11:39'),
    (3, 'The stout is the perfect beer for a cold winter night.', 2, '2022-04-28 16:39:55');
