USE [master]

IF db_id('BeerTier') IS NULl
  CREATE DATABASE [BeerTier]
GO

USE [BeerTier]
GO

CREATE TABLE [Beer] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] varchar(55) UNIQUE NOT NULL,
  [Content] text,
  [ImageLocation] nvarchar(255),
  [BreweryId] int,
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
  [Name] varchar(55) UNIQUE NOT NULL,
  [Address] varchar(255) NOT NULL,
  [ImageLocation] varchar(255),
  [UserProfileId] int NOT NULL,
  [CreateDateTime] datetime NOT NULL
)
GO

CREATE TABLE [Comment] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [BeerId] int NOT NULL,
  [Content] text NOT NULL,
  [UserProfileId] int NOT NULL,
  [CreateDateTime] datetime NOT NULL
)
GO

CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [IsAdmin] bit NOT NULL,
  [FirebaseUserId] nvarchar(255) UNIQUE NOT NULL,
  [FirstName] varchar(25) NOT NULL,
  [LastName] varchar(25) NOT NULL,
  [Email] varchar(255) NOT NULL,
  [DisplayName] varchar(25) UNIQUE NOT NULL,
  [ImageLocation] varchar(255),
  [CreateDateTime] datetime NOT NULL
)
GO

CREATE TABLE [Style] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] varchar(55) UNIQUE NOT NULL
)
GO

ALTER TABLE [BeerStyle] ADD FOREIGN KEY ([BeerId]) REFERENCES [Beer] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [BeerStyle] ADD FOREIGN KEY ([StyleId]) REFERENCES [Style] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Beer] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Beer] ADD FOREIGN KEY ([BreweryId]) REFERENCES [Brewery] ([Id]) ON DELETE SET NULL
GO

ALTER TABLE [Comment] ADD FOREIGN KEY ([BeerId]) REFERENCES [Beer] ([Id]) ON DELETE CASCADE
GO
