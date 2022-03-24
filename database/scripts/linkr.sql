CREATE TABLE "users" (
	"id" SERIAL NOT NULL,
	"email" VARCHAR(160) NOT NULL UNIQUE,
	"username" VARCHAR(80) NOT NULL UNIQUE,
	"password" VARCHAR(80) NOT NULL,
	"picture" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "sessions" (
	"id" SERIAL NOT NULL,
	"userId" INTEGER NOT NULL,
	"token" UUID NOT NULL,
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "posts" (
	"id" SERIAL NOT NULL,
	"userId" INTEGER NOT NULL,
	"linkId" INTEGER NOT NULL,
	"message" TEXT,
	"createDate" TIMESTAMP NOT NULL DEFAULT NOW(),
	CONSTRAINT "posts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "hashtags" (
	"id" SERIAL NOT NULL,
	"name" TEXT NOT NULL UNIQUE,
	CONSTRAINT "hashtags_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "hashtagsPosts" (
	"id" SERIAL NOT NULL,
	"postId" INTEGER NOT NULL,
	"hashtagId" INTEGER NOT NULL,
	CONSTRAINT "hashtagsPosts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "likes" (
	"id" SERIAL NOT NULL,
	"userId" INTEGER NOT NULL,
	"postId" INTEGER NOT NULL,
	CONSTRAINT "likes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "links" (
	"id" SERIAL NOT NULL,
	"url" TEXT NOT NULL,
	"title" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	"image" TEXT NOT NULL,
	CONSTRAINT "links_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "posts" ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");
ALTER TABLE "posts" ADD CONSTRAINT "posts_fk1" FOREIGN KEY ("linkId") REFERENCES "links"("id");


ALTER TABLE "hashtagsPosts" ADD CONSTRAINT "hashtagsPosts_fk0" FOREIGN KEY ("postId") REFERENCES "posts"("id");
ALTER TABLE "hashtagsPosts" ADD CONSTRAINT "hashtagsPosts_fk1" FOREIGN KEY ("hashtagId") REFERENCES "hashtags"("id");

ALTER TABLE "likes" ADD CONSTRAINT "likes_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");
ALTER TABLE "likes" ADD CONSTRAINT "likes_fk1" FOREIGN KEY ("postId") REFERENCES "posts"("id");








