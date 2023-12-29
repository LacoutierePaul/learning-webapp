-- DROP ROLE IF EXISTS "learningDbUser";
-- CREATE ROLE "learningDbUser" WITH
--   LOGIN
--   SUPERUSER
--   INHERIT
--   CREATEDB
--   CREATEROLE
--   REPLICATION
--   ENCRYPTED PASSWORD 'SCRAM-SHA-256$4096:JIQYyWlr2/HWQK7pUR4hfg==$R22LhBX9TnDFve9NWIzvK7US8jndEgqk0pvGXSST8y0=:vu8kOXoK6U/Hu9m1yJmxAllwQLn4Nissbo7WRKpJQsY=';

-- DROP DATABASE IF EXISTS "LearningDb";

-- CREATE DATABASE "LearningDb"
--     WITH
--     OWNER = "learningDbUser"
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'French_France.1252'
--     LC_CTYPE = 'French_France.1252'
--     TABLESPACE = pg_default
--     CONNECTION LIMIT = -1
--     IS_TEMPLATE = False;
	
	
DROP TABLE IF EXISTS public."LearningPackage" CASCADE;

DROP SEQUENCE IF EXISTS "LearningPackage_packageId_seq";
CREATE SEQUENCE IF NOT EXISTS "LearningPackage_packageId_seq";

-- Create the table with the correct reference to the sequence
CREATE TABLE IF NOT EXISTS public."LearningPackage"
(
    "packageId" integer NOT NULL DEFAULT nextval('"LearningPackage_packageId_seq"'::regclass),
    "packageName" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "packageDescription" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "packageProgress" integer NOT NULL,
    "packageDifficulty" integer NOT NULL,
    "packageFavorite" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "LearningPackage_pkey" PRIMARY KEY ("packageId")
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."LearningPackage"
    OWNER to "learningDbUser";
	
	
	
DROP TABLE IF EXISTS public."LearningFact";

DROP SEQUENCE IF EXISTS "LearningFact_factId_seq";
CREATE SEQUENCE IF NOT EXISTS "LearningFact_factId_seq";

CREATE TABLE IF NOT EXISTS public."LearningFact"
(
    "factId" integer NOT NULL DEFAULT nextval('"LearningFact_factId_seq"'::regclass),
    "packageId" integer NOT NULL,
    "factQuestion" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "factAnswer" character varying(255) COLLATE pg_catalog."default",
    "factTimesReviewed" integer NOT NULL,
    "factLastReviewedDate" timestamp with time zone NOT NULL,
    "factNextReviewDate" timestamp with time zone NOT NULL,
    "confidenceLevel" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "LearningFact_pkey" PRIMARY KEY ("factId"),
    CONSTRAINT "LearningFact_packageId_fkey" FOREIGN KEY ("packageId")
        REFERENCES public."LearningPackage" ("packageId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."LearningFact"
    OWNER to "learningDbUser";
	

DROP TABLE IF EXISTS public."Statistics";

DROP SEQUENCE IF EXISTS "Statistics_statId_seq";
CREATE SEQUENCE IF NOT EXISTS "Statistics_statId_seq";

CREATE TABLE IF NOT EXISTS public."Statistics"
(
    "statId" integer NOT NULL DEFAULT nextval('"Statistics_statId_seq"'::regclass),
    "packageId" integer NOT NULL,
    "lowConfidenceCount" integer NOT NULL,
    "mediumConfidenceCount" integer NOT NULL,
    "highConfidenceCount" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Statistics_pkey" PRIMARY KEY ("statId", "packageId"),
    CONSTRAINT "Statistics_packageId_fkey" FOREIGN KEY ("packageId")
        REFERENCES public."LearningPackage" ("packageId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Statistics"
    OWNER to "learningDbUser";


DROP TABLE IF EXISTS public."TimeHistory";

DROP SEQUENCE IF EXISTS "TimeHistory_historyId_seq";
CREATE SEQUENCE IF NOT EXISTS "TimeHistory_historyId_seq";

CREATE TABLE IF NOT EXISTS public."TimeHistory"
(
    "historyId" integer NOT NULL DEFAULT nextval('"TimeHistory_historyId_seq"'::regclass),
    "packageId" integer NOT NULL,
    "timeSpent" integer NOT NULL,
    "historyDate" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "TimeHistory_pkey" PRIMARY KEY ("historyId", "packageId"),
    CONSTRAINT "TimeHistory_packageId_fkey" FOREIGN KEY ("packageId")
        REFERENCES public."LearningPackage" ("packageId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."TimeHistory"
    OWNER to "learningDbUser";
	
	
	
INSERT INTO public."LearningPackage" ("packageName", "packageDescription", "packageProgress", "packageDifficulty", "packageFavorite", "createdAt", "updatedAt")
VALUES
  ('Mathematics 101', 'Introduction to basic math concepts', 0, 2, false, NOW(), NOW()),
  ('History 101', 'Overview of world history', 0, 3, false, NOW(), NOW()),
  ('Programming Fundamentals', 'Introduction to coding', 0, 4, false, NOW(), NOW());



INSERT INTO public."LearningFact" ("packageId", "factQuestion", "factAnswer", "factTimesReviewed", "factLastReviewedDate", "factNextReviewDate", "confidenceLevel", "createdAt", "updatedAt")
VALUES
  (1, 'What is 2 + 2?', '4', 0, NOW(), NOW(), 1, NOW(), NOW()),
  (1, 'Solve for x: 3x - 7 = 14', 'x = 7', 0, NOW(), NOW(), 1, NOW(), NOW()),
  (1, 'What is the square root of 16?', '4', 0, NOW(), NOW(), 1, NOW(), NOW()),
  (1, 'Solve for y: 2y + 5 = 11', 'y = 3', 0, NOW(), NOW(), 1, NOW(), NOW()),
  (1, 'How many sides does a triangle have?', '3', 0, NOW(), NOW(), 1, NOW(), NOW()),
  (2, 'What event marked the beginning of World War I?', 'Assassination of Archduke Franz Ferdinand', 0, NOW(), NOW(), 1, NOW(), NOW()),
  (2, 'Who painted the Mona Lisa?', 'Leonardo da Vinci', 0, NOW(), NOW(), 1, NOW(), NOW()),
  (2, 'What is the largest ocean on Earth?', 'Pacific Ocean', 0, NOW(), NOW(), 1, NOW(), NOW()),
  (2, 'Who developed the theory of relativity?', 'Albert Einstein', 0, NOW(), NOW(), 1, NOW(), NOW()),
  (3, 'What is a variable in programming?', 'A container for storing data', 0, NOW(), NOW(), 1, NOW(), NOW()),
  (3, 'What does HTML stand for?', 'Hypertext Markup Language', 0, NOW(), NOW(), 1, NOW(), NOW()),
  (3, 'Who is known as the father of modern computer science?', 'Alan Turing', 0, NOW(), NOW(), 1, NOW(), NOW()),
  (3, 'What is the purpose of a loop in programming?', 'Repeated execution of a set of statements', 0, NOW(), NOW(), 1, NOW(), NOW());
  

INSERT INTO public."Statistics" ("packageId", "lowConfidenceCount", "mediumConfidenceCount", "highConfidenceCount", "createdAt", "updatedAt")
VALUES
  (1, 0, 0, 0, NOW(), NOW()),
  (2, 0, 0, 0, NOW(), NOW()),
  (3, 0, 0, 0, NOW(), NOW());