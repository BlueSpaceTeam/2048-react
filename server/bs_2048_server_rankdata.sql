DROP TABLE IF EXISTS "bs_2048_server_rankdata";
CREATE TABLE "main"."bs_2048_server_rankdata" (
    "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_name" varchar(255) NOT NULL,
    "user_score" integer unsigned NOT NULL CHECK ("user_score" >= 0),
    "created_time" datetime NOT NULL,
    "user_ip" varchar(100),
    "user_agent" varchar(255),
    "time_cost" integer unsigned,
);

-- INSERT INTO "main"."sqlite_sequence" (name, seq) VALUES ('sqlite_sequence', '0');
