\connect local_db

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE scan(
    id int generated always as identity primary key,
    repository_name text,
    status text,
    queued_at timestamp default current_timestamp,
    started_at timestamp,
    finished_at timestamp,
    created_at timestamp default current_timestamp
);
    create index scan_queued on scan(queued_at);
    create index scan_start on scan(started_at);
    create index finished_at on scan(finished_at);

CREATE TABLE result(
    id int generated always as identity primary key,
    scan_id int,
    findings jsonb,
    FOREIGN KEY(scan_id) references scan(id)
);