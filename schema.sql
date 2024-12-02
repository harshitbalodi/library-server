-- Users Table
CREATE TABLE users (
    id CHAR(36) PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255),
    auth_provider ENUM('local', 'google', 'github') DEFAULT 'local',
    external_id VARCHAR(255),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Hall Administrators Table
CREATE TABLE hall_administrators (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    hall_id INT NOT NULL,
    role ENUM('ADMIN', 'MANAGER', 'VIEWER') DEFAULT 'VIEWER',
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (hall_id) REFERENCES halls(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_hall (user_id, hall_id)
);

-- Halls Table
CREATE TABLE halls (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Shifts Table
CREATE TABLE shifts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hall_id INT,
    name VARCHAR(50) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    fee DECIMAL(10, 2) NOT NULL,
    capacity INT NOT NULL,
    FOREIGN KEY (hall_id) REFERENCES halls(id) ON DELETE SET NULL
);

-- Desks Table
CREATE TABLE desks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    shift_id INT,
    seat_no INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    is_vacant BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (shift_id) REFERENCES shifts(id) ON DELETE SET NULL
);

-- Students Table
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    desk_id INT,
    name VARCHAR(100) NOT NULL,
    image VARCHAR(255),
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    mobile_no VARCHAR(20) NOT NULL,
    is_expired BOOLEAN DEFAULT FALSE,
    valid_upto DATE NOT NULL,
    FOREIGN KEY (desk_id) REFERENCES desks(id) ON DELETE SET NULL
);

-- Payments Table
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fee DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    paid_for_month DATE NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- Indexes for performance optimization
CREATE INDEX idx_students_desk ON students(desk_id);
CREATE INDEX idx_payments_student ON payments(student_id);
CREATE INDEX idx_shifts_hall ON shifts(hall_id);