USE [master]

IF db_id('BeerTier') IS NULL
    CREATE DATABASE [BeerTier]
GO

USE [BeerTier]
GO

CREATE TABLE [Beer] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] varchar(55) NOT NULL,
  [Content] varchar NOT NULL,
  [ImageLocation] nvarchar(255),
  [BreweryId] int,
  [CategoryId] int,
  [CreateDateTime] datetime NOT NULL,
  [UserProfileId] int NOT NULL
)
GO

CREATE TABLE [BeerStyle] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [BeerId] int NOT NULL,
  [StyleId] int NOT NULL
)
GO

CREATE TABLE [Brewery] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] varchar(55) NOT NULL,
  [Address] varchar(255) NOT NULL,
  [ImageLocation] varchar(255),
  [UserProfileId] int NOT NULL,
  [CreateDateTime] datetime NOT NULL
)
GO

CREATE TABLE [Category] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] varchar(25) NOT NULL
)
GO

CREATE TABLE [Comment] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [BeerId] int NOT NULL,
  [Content] varchar NOT NULL,
  [UserProfileId] int NOT NULL,
  [CreateDateTime] datetime NOT NULL
)
GO

CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [IsAdmin] bit NOT NULL,
  [FirebaseUserId] nvarchar(255) NOT NULL,
  [FirstName] varchar(25) NOT NULL,
  [LastName] varchar(25) NOT NULL,
  [Email] varchar(255) NOT NULL,
  [DisplayName] varchar(25) NOT NULL,
  [ImageLocation] varchar(255),
  [CreateDateTime] datetime NOT NULL
)
GO

CREATE TABLE [Style] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] varchar(55) NOT NULL
)
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = '
    1: Craft
    2: Traditional
    3: Domestic
  ',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Category',
@level2type = N'Column', @level2name = 'Name';
GO

ALTER TABLE [BeerStyle] ADD FOREIGN KEY ([BeerId]) REFERENCES [Beer] ([Id])
GO

ALTER TABLE [BeerStyle] ADD FOREIGN KEY ([StyleId]) REFERENCES [Style] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Beer] ADD FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id]) ON DELETE SET NULL
GO

ALTER TABLE [Beer] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Beer] ADD FOREIGN KEY ([BreweryId]) REFERENCES [Brewery] ([Id]) ON DELETE SET NULL
GO

ALTER TABLE [Comment] ADD FOREIGN KEY ([BeerId]) REFERENCES [Beer] ([Id]) ON DELETE CASCADE
GO
