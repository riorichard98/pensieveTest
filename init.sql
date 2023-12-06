-- i need to migrate the table first so the db doesn't empty
CREATE TABLE gps (
  id serial PRIMARY KEY,
  device_id VARCHAR(255),
  device_type VARCHAR(255),
  timestamp timestamp,
  location VARCHAR(255)
);

CREATE TABLE users (
  user_id serial PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  login_token text
);

INSERT INTO gps (device_id, device_type, timestamp, location)
VALUES 
  ('D-1567', 'Aircraft', '2022-08-31 10:05:00', 'L1'),
  ('D-1567', 'Aircraft', '2022-08-31 10:10:00', 'L1'),
  ('D-1567', 'Aircraft', '2022-08-31 10:15:00', 'L1'),
  ('D-1567', 'Aircraft', '2022-08-31 10:20:00', 'L1'),
  ('D-1567', 'Aircraft', '2022-08-31 10:25:00', 'L2'),
  ('D-1568', 'Personal', '2022-08-31 10:05:00', 'L3'),
  ('D-1568', 'Personal', '2022-08-31 10:10:00', 'L3'),
  ('D-1568', 'Personal', '2022-08-31 10:15:00', 'L3'),
  ('D-1568', 'Personal', '2022-08-31 10:20:00', 'L3'),
  ('D-1568', 'Personal', '2022-08-31 10:25:00', 'L3'),
  ('D-1569', 'Asset', '2022-08-31 10:15:00', 'L4'),
  ('D-1569', 'Asset', '2022-08-31 10:20:00', 'L4'),
  ('D-1569', 'Asset', '2022-08-31 10:25:00', 'L1'),
  ('D-1569', 'Asset', '2022-08-31 10:30:00', 'L1'),
  ('D-1569', 'Asset', '2022-08-31 10:35:00', 'L2'),
  ('D-1570', 'Personal', '2022-08-31 10:35:00', 'L5'),
  ('D-1571', 'Asset', '2022-08-31 10:35:00', 'L6');

INSERT INTO users (name, email, password, login_token)
VALUES ('Rio Richard', 'riorichard12@gmail.com', '$2b$10$r/0AtQNsig1Kd6BqbbqYVONFZ6LLFc/x37CMJPSp/Teg1HK/hFoqO', 'YourLoginToken');
