DROP TABLE IF EXISTS userSystemLinks;

CREATE TABLE userSystemLinks (
  id SERIAL PRIMARY KEY NOT NULL,
  userSystemLinks_uid UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  user_uid UUID NOT NULL,
  system_uid UUID NOT NULL,
  system_role role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY ("user_uid") REFERENCES users ("user_uid"),
  FOREIGN KEY ("system_uid") REFERENCES systems ("system_uid")
);