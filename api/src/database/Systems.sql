CREATE TYPE status AS ENUM ('on', 'off');

DROP TABLE IF EXISTS systems;

CREATE TABLE systems (
  id SERIAL PRIMARY KEY NOT NULL,
  system_uid UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR(250) NOT NULL UNIQUE,
  placed VARCHAR(300) NOT NULL,
  user_uid UUID NOT NULL,
  status status NOT NULL,
  image_uri VARCHAR(300),
  status status NOT NULL,
  aplication_id VARCHAR(300) UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY ("user_uid") REFERENCES "users" (user_uid)
);