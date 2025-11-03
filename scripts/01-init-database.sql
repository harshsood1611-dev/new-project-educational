-- Create colleges table
CREATE TABLE IF NOT EXISTS colleges (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  logo_url VARCHAR(255),
  website VARCHAR(255),
  approval_type VARCHAR(100),
  ranking_position INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  duration VARCHAR(50),
  eligibility TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create college_courses junction table
CREATE TABLE IF NOT EXISTS college_courses (
  id SERIAL PRIMARY KEY,
  college_id INT NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
  course_id INT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  specializations TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(college_id, course_id)
);

-- Create enquiries table
CREATE TABLE IF NOT EXISTS enquiries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  course_id INT REFERENCES courses(id),
  state VARCHAR(100),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO colleges (name, description, logo_url, approval_type, ranking_position) VALUES
('LPU Online', 'Lovely Professional University - Online & Distance Education', '/placeholder.svg?height=100&width=100', 'UGC-DEB Approved', 1),
('JAIN Online', 'JAIN University - Distance Education Programs', '/placeholder.svg?height=100&width=100', 'UGC-DEB Approved', 2),
('Manipal Online', 'Manipal Academy of Higher Education - Online Programs', '/placeholder.svg?height=100&width=100', 'UGC-DEB Approved', 3),
('Uttaranchal University', 'Uttaranchal University - Distance Education', '/placeholder.svg?height=100&width=100', 'UGC-DEB Approved', 4);

INSERT INTO courses (name, category, description, duration, eligibility) VALUES
('MBA (General Management)', 'MBA', 'Master of Business Administration with focus on General Management', '2 years', 'Bachelor''s Degree'),
('MBA (Finance)', 'MBA', 'Specialized MBA in Finance and Financial Management', '2 years', 'Bachelor''s Degree'),
('MBA (Marketing)', 'MBA', 'MBA specialization in Marketing and Brand Management', '2 years', 'Bachelor''s Degree'),
('MBA (HR Management)', 'MBA', 'Human Resource Management specialization', '2 years', 'Bachelor''s Degree'),
('MCA', 'MCA', 'Master of Computer Applications', '2 years', 'Bachelor''s in Science/IT'),
('BCA', 'BCA', 'Bachelor of Computer Applications', '3 years', '12th Pass'),
('B.Com', 'B.Com', 'Bachelor of Commerce', '3 years', '12th Pass'),
('M.Com', 'M.Com', 'Master of Commerce', '2 years', 'Bachelor''s in Commerce'),
('MA', 'MA', 'Master of Arts', '2 years', 'Bachelor''s Degree'),
('MSC', 'MSC', 'Master of Science', '2 years', 'Bachelor''s in Science'),
('Diploma', 'Diploma', 'Professional Diploma Programs', '1 year', '12th Pass'),
('Certificate', 'Certificate', 'Professional Certificate Programs', '6 months', 'Any'),
('LLM', 'LLM', 'Master of Laws', '2 years', 'Bachelor of Laws'),
('EMBA', 'EMBA', 'Executive MBA for Professionals', '2 years', 'Bachelor''s + 5 years experience');
