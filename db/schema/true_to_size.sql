CREATE TABLE true_to_size (
  id SERIAL PRIMARY KEY,
  shoe_id integer REFERENCES shoe (id) NOT NULL,
  value integer NOT NULL,
  CHECK (value > 0 AND value < 6)
);

GRANT ALL PRIVILEGES ON TABLE true_to_size TO postgres;
GRANT USAGE, SELECT ON SEQUENCE true_to_size_id_seq TO postgres;
