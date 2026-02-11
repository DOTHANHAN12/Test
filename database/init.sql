-- ════════════════════════════════════════════════════════════════
--  SLife Demo – khởi tạo DB và seed dữ liệu mẫu
--  Chạy file này trong DBeaver hoặc MySQL Workbench
-- ════════════════════════════════════════════════════════════════

-- 1. Tạo database (nếu chưa có)
CREATE DATABASE IF NOT EXISTS slife_demo
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE slife_demo;

-- 2. Tạo bảng users
--    (Spring Boot sẽ tự tạo nếu ddl-auto=update,
--     nhưng chạy tay ở đây để chắc chắn)
CREATE TABLE IF NOT EXISTS users (
  user_id          BIGINT        NOT NULL AUTO_INCREMENT,
  email            VARCHAR(255)  NOT NULL UNIQUE,
  full_name        VARCHAR(255)  NOT NULL,
  phone_number     VARCHAR(20)   NULL,
  role             VARCHAR(20)   NOT NULL DEFAULT 'USER',
  status           VARCHAR(20)   NOT NULL DEFAULT 'ACTIVE',
  reputation_score FLOAT         NOT NULL DEFAULT 5.0,
  PRIMARY KEY (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Seed 4 dòng dữ liệu mẫu
INSERT INTO users (email, full_name, phone_number, role, status, reputation_score) VALUES
  ('an.nguyen@fpt.edu.vn',   'Nguyễn Văn An',    '0901234567', 'USER',  'ACTIVE',     4.8),
  ('binh.le@fpt.edu.vn',     'Lê Thị Bình',      '0912345678', 'USER',  'ACTIVE',     4.5),
  ('cuong.tran@fpt.edu.vn',  'Trần Minh Cường',  '0923456789', 'USER',  'RESTRICTED', 3.2),
  ('admin@slife.vn',         'SLife Admin',       NULL,         'ADMIN', 'ACTIVE',     5.0);

-- 4. Kiểm tra kết quả
SELECT * FROM users;
