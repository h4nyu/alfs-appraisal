CREATE TABLE workspaces ( 
    id text NOT NULL PRIMARY KEY,
    name text NOT NULL,
    created_at timestamp NOT NULL
);

CREATE TABLE images ( 
    id text NOT NULL,
    name text NOT NULL,
    workspace_id text,
    parent_id text,
    file_id text,
    created_at timestamp NOT NULL
);

CREATE TABLE boxes ( 
    id text NOT NULL,
    x0 double precision NOT NULL,
    y0 double precision NOT NULL,
    x1 double precision NOT NULL,
    y1 double precision NOT NULL,
    file_id text,
    image_id text,
    tag_id text,
    is_reference boolean
);

CREATE TABLE points ( 
    id text NOT NULL,
    x double precision NOT NULL,
    y double precision NOT NULL,
    position_id text, 
    box_id text
);

CREATE TABLE tags ( 
    id text NOT NULL PRIMARY KEY,
    name text NOT NULL,
    workspace_id text,
    reference_box_id text
);

CREATE TABLE files ( 
    id text NOT NULL PRIMARY KEY,
    data bytea,
    created_at timestamp NOT NULL
);

CREATE TABLE lines ( 
    id text NOT NULL PRIMARY KEY,
    box_id  text,
    start_x double precision NOT NULL,
    start_y double precision NOT NULL,
    end_x double precision NOT NULL,
    end_y double precision NOT NULL
);
