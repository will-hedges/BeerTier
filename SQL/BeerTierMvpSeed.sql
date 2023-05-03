USE [BeerTier];
GO

--Seed data for Style table
INSERT INTO [Style] ([Name]) 
VALUES 
    ('Ale'),
    ('Lager'),
    ('Pilsner'),
    ('Stout'),
    ('IPA'),
    ('Wheat'),
    ('Porter'),
    ('Sour'),
    ('Belgian'),
    ('Brown Ale'),
    ('Pale Ale');

--Seed data for Brewery table
INSERT INTO [Brewery] ([Name], [Address], [ImageLocation], [UserProfileId], [CreateDateTime]) 
VALUES 
    ('Strange Brewing', '123 Main St, Anytown USA', 'https://example.com/brewerya.jpg', 1, '2023-05-01 10:00:00'),
    ('Brass Cannon Brewery', '456 Oak St, Anytown USA', 'https://example.com/breweryb.jpg', 1, '2023-05-01 10:00:00'),
    ('Mad Malts Brewing Co.', '789 Pine St, Anytown USA', 'https://example.com/breweryc.jpg', 2, '2023-05-01 10:00:00'),
    ('Hare and Turtle Brewing', '101 Elm St, Anytown USA', 'https://example.com/breweryd.jpg', 3, '2023-05-01 10:00:00');

--Seed data for UserProfile table
INSERT INTO [UserProfile] ([IsAdmin], [FirebaseUserId], [FirstName], [LastName], [Email], [DisplayName], [ImageLocation], [CreateDateTime]) 
VALUES 
    (1, '123abc', 'John', 'Doe', 'johndoe@example.com', 'JohnDoe', 'https://example.com/johndoe.jpg', '2023-05-01 10:00:00'),
    (0, '456def', 'Jane', 'Smith', 'janesmith@example.com', 'JaneSmith', 'https://example.com/janesmith.jpg', '2023-05-01 10:00:00'),
    (0, '789ghi', 'Bob', 'Jones', 'bobjones@example.com', 'BobJones', 'https://example.com/bobjones.jpg', '2023-05-01 10:00:00'),
    (0, '101jkl', 'Emily', 'Brown', 'emilybrown@example.com', 'EmilyBrown', 'https://example.com/emilybrown.jpg', '2023-05-01 10:00:00');

--Seed data for Beer table
INSERT INTO [Beer] ([Name], [Content], [ImageLocation], [BreweryId], [CreateDateTime], [UserProfileId])
VALUES
    ('Hoppy IPA', 'Furthermore, a Strohs ceases to exist, and the black velvet inside a tornado brew shares a shower with another miller. Now and then, the fashionable bullfrog brew eagerly steals women from a loyal bar stool. Another drunk rattlesnake requires assistance from the Pilsner inside the Full Sail IPA. A milwakees best meditates, because a tipsy Lone Star finds lice on a corona light behind some Dixie Beer.', 'https://example.com/hoppy_ipa.jpg', 1, '2022-04-22 10:34:09', 1),
    ('Belgian Dubbel', 'Sometimes a loose Luna Sea ESB hibernates, but another burly keg always steals women from the chain saw about some Budweiser! An air hocky table related to the Labatts goes deep sea fishing with a satellite brewery. A hops trades baseball cards with the miller light over a miller light. Any pool table can barely make love to a scooby snack, but it takes a real bottle of beer to secretly derive perverse satisfaction from a Sierra Nevada toward an Avery IPA. For example, an Octoberfest indicates that the often pissed Home brew caricatures the polar bear beer.', 'https://example.com/belgian_dubbel.jpg', 2, '2022-04-23 11:23:15', 2),
    ('Stout', 'The familiar Corona Extra secretly writes a love letter to an Amarillo Pale Ale, and a wavy keg reaches an understanding with a radioactive lager. The flatulent Honey Brown makes a pact with a Guiness.', 'https://example.com/stout.jpg', 3, '2022-04-25 09:15:27', 3),
    ('Amazing Pilsner', 'Sometimes the loose shot flies into a rage, but an Imperial Stout always shares a shower with a hairy bud dry! Now and then, a jersey cow pours freezing cold booze on a Hazed and Infused defined by the Full Sail IPA. Indeed, a Kashmir IPA befriends a self-actualized corona light. A polka-dotted spudgun feels nagging remorse, and a polar bear beer beams with joy; however, a mitochondrial Ellis Island IPA accidentally plays pinochle with the slow change. Sometimes a scooby snack panics, but a false Amarillo Pale Ale always lazily secretly admires the Keystone light!', 'https://example.com/amazing_pilsner', 4, '2022-05-03 11:13:59', 1);

--Seed data for BeerStyle table
INSERT INTO [BeerStyle] ([BeerId], [StyleId])
VALUES
    (1, 1),
    (1, 2),
    (2, 3),
    (3, 4),
    (3, 5),
    (4, 1),
    (4, 2),
    (4, 3);

--Seed data for Comment table
INSERT INTO [Comment] ([BeerId], [Content], [UserProfileId], [CreateDateTime])
VALUES
    (1, 'This IPA is amazing!', 2, '2022-04-24 14:27:45'),
    (1, 'Too hoppy for my taste.', 3, '2022-04-25 09:42:12'),
    (1, 'This beer has a great balance of bitterness and flavor. I could drink this all day!', 3, '2021-06-01 10:15:00'),
    (1, 'This is definitely one of my go-to beers. It has a nice crisp flavor and goes down smooth.', 4, '2021-06-05 19:15:00'),
    (1, 'This beer is perfect for a summer day. It has a light and refreshing taste that is very enjoyable.', 1, '2021-06-09 03:15:00'),
    (2, 'The Belgian Dubbel has a great flavor profile.', 1, '2022-04-26 10:11:39'),
    (2, 'Not my favorite beer, but still pretty good. Would recommend to others.', 2, '2021-06-02 12:30:00'),
    (2, 'I love the smoothness of this beer. It goes well with almost any food!', 2, '2021-06-06 21:30:00'),
    (2, 'This beer has a unique flavor that sets it apart from other beers. It might not be for everyone, but I really enjoy it!', 1, '2021-06-10 05:30:00'),
    (3, 'The stout is the perfect beer for a cold winter night.', 2, '2022-04-28 16:39:55'),
    (3, 'The aroma of this beer is amazing! It has a really unique flavor too.', 1, '2021-06-03 15:45:00'),
    (3, 'This beer has a great balance of sweetness and bitterness. Definitely worth trying!', 2, '2021-06-07 23:45:00'),
    (3, 'This beer has a really interesting mix of flavors. I would definitely recommend it to anyone looking to try something new.', 4, '2021-06-11 07:45:00'),
    (4, 'This beer is a little too hoppy for my taste, but it might be perfect for someone who loves IPAs.', 1, '2021-06-04 17:00:00'),
    (4, 'I would definitely recommend this beer to anyone who loves a good IPA. The hoppy flavor is fantastic!', 3, '2021-06-08 01:00:00'),
    (4, 'I usually prefer lighter beers, but this IPA is really well-made. The bitterness is just right!', 2, '2021-06-12 09:00:00');


