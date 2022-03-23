CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"email" VARCHAR(160) NOT NULL UNIQUE,
	"username" VARCHAR(80) NOT NULL UNIQUE,
	"password" VARCHAR(80) NOT NULL,
	"picture" TEXT NOT NULL
);

CREATE TABLE "sessions" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"userId" INTEGER NOT NULL REFERENCES "users"("id"),
	"token" TEXT NOT NULL
);

CREATE TABLE "posts" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"userId" INTEGER NOT NULL REFERENCES users("id"),
	"link" TEXT NOT NULL,
	"message" TEXT,
	"createDate" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "hashtags" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"name" TEXT NOT NULL UNIQUE
);

CREATE TABLE "hashtagsPosts" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"postId" INTEGER NOT NULL REFERENCES "posts"("id"),
	"hashtagId" INTEGER NOT NULL REFERENCES "hashtags"("id")
);

CREATE TABLE "likes" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"userId" INTEGER NOT NULL REFERENCES "users"("id"),
	"postId" INTEGER NOT NULL REFERENCES "posts"("id")
);
