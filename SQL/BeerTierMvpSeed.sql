USE [master]

USE [BeerTier]
GO

-- Seed data for Category table
INSERT INTO [Category] ([Name])
VALUES ('Craft'), ('Domestic'), ('Traditional')

-- Seed data for Style table
INSERT INTO [Style] ([Name])
VALUES ('IPA'), ('Lager'), ('Stout'), ('Porter'), ('Belgian'), ('Wheat'), ('Sour'), ('West Coast IPA'), ('Hazy IPA'), ('Festbier'), ('Pilsner')

-- Seed data for UserProfile table
INSERT INTO [UserProfile] ([IsAdmin], [FirebaseUserId], [FirstName], [LastName], [Email], [DisplayName], [CreateDateTime])
VALUES (1, 'firebase_user_id_1', 'John', 'Doe', 'johndoe@example.com', 'John Doe', GETDATE()),
       (0, 'firebase_user_id_2', 'Jane', 'Doe', 'janedoe@example.com', 'Jane Doe', GETDATE()),
       (0, 'firebase_user_id_3', 'Bob', 'Smith', 'bobsmith@example.com', 'Bob Smith', GETDATE())

-- Seed data for Brewery table
INSERT INTO [Brewery] ([Name], [Address], [ImageLocation], [UserProfileId], [CreateDateTime])
VALUES ('Sierra Nevada', 'Chico, CA', 'https://example.com/sierra_nevada.jpg', 1, GETDATE()),
       ('Stone Brewing', 'Escondido, CA', 'https://example.com/stone_brewing.jpg', 1, GETDATE()),
       ('Russian River', 'Santa Rosa, CA', 'https://example.com/russian_river.jpg', 2, GETDATE())

-- Seed data for Beer table
INSERT INTO [Beer] ([Name], [Content], [ImageLocation], [BreweryId], [CategoryId], [CreateDateTime], [UserProfileId])
VALUES ('Sierra Nevada Pale Ale', 'The nearest Hefeweizen learns a hard lesson from the pin ball machine related to the Honey Brown. Most people believe that a dude over a bottle hesitantly cooks cheese grits for the shot, but they need to remember how lazily the razor blade beer laughs out loud. The mysterious PBR, a booze of another milwakees best, and a mug are what made America great! A Heineken around an Octoberfest sanitizes the Coors about the Long Trail Ale. If another booze reaches an understanding with a polar bear beer toward a rattlesnake, then a Keystone dies. ', 'https://example.com/sierra_nevada_pale_ale.jpg', 1, 1, GETDATE(), 1),
       ('Stone IPA', 'An eagerly mean-spirited miller light greedily dances with a blue moon. If another Strohs inside the Sam Adams graduates from the pissed pit viper, then the beer related to the Kashmir IPA laughs out loud. Sometimes a bill meditates, but the lover always caricatures the bill! Indeed, a bottle of beer around a pin ball machine befriends an Imperial Stout. Now and then, an infected Sierra Nevada Pale Ale assimilates a crank case. ', 'https://example.com/stone_ipa.jpg', 2, 1, GETDATE(), 1),
       ('Russian River Pliny the Elder', 'A grizzly beer related to the Avery IPA reads a magazine, and the Budweiser Select behind the Hefeweizen hides; however, the Hoptoberfest avoids contact with some rattlesnake. The Lone Star finds lice on an obsequious Amarillo Pale Ale. When a stein around a porter is whacked, a Home brew for a bud light barely sells an ice house to a miller near a Guiness. A Heineken near a hops ceases to exist, and an Ellis Island IPA near a Home brew takes a coffee break; however, the Home brew barely buys an expensive drink for the Pilsner. A satellite brewery assimilates the fashionable Pilsner, but a jersey cow laughs and drinks all night with the Heineken near the Mango Beer. ', 'https://example.com/pliny_the_elder.jpg', 3, 1, GETDATE(), 2)

-- Seed data for BeerStyle table
INSERT INTO [BeerStyle] ([BeerId], [StyleId])
VALUES (1, 1), (2, 1), (3, 1), (1, 8), (2, 9), (3, 10)

-- Seed data for Comment table
INSERT INTO [Comment] ([BeerId], [Content], [UserProfileId], [CreateDateTime])
VALUES (1, 'This is a great beer!', 2, GETDATE()),
       (1, 'Not my favorite, but still good.', 3, GETDATE()),
       (3, 'I can''t get enough of Pliny!', 1, GETDATE())
