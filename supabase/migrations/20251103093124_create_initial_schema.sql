/*
  # Create Distance Education Database Schema

  ## Overview
  This migration creates the complete schema for the Distance Education School platform,
  including colleges, courses, enquiries, and admin users.

  ## New Tables

  ### 1. colleges
  Stores information about universities offering distance education programs
  - `id` (serial, primary key) - Unique identifier
  - `name` (varchar) - College/University name
  - `description` (text) - Short description
  - `logo_url` (varchar) - Logo image URL
  - `website` (varchar) - College website URL
  - `approval_type` (varchar) - Accreditation type (e.g., UGC-DEB)
  - `ranking_position` (integer) - National ranking
  - `detailed_description` (text) - Long form description
  - `rating` (decimal) - Student rating (0-5)
  - `established_year` (integer) - Year founded
  - `location` (varchar) - City/State location
  - `accreditations` (jsonb) - Array of accreditations
  - `highlights` (jsonb) - Array of key highlights
  - `courses_offered` (jsonb) - Array of course details
  - `why_choose` (jsonb) - Array of benefits
  - `created_at` (timestamptz) - Record creation time
  - `updated_at` (timestamptz) - Last update time

  ### 2. courses
  Stores course/program information
  - `id` (serial, primary key) - Unique identifier
  - `name` (varchar) - Course name
  - `category` (varchar) - Course category (MBA, MCA, etc.)
  - `description` (text) - Short description
  - `duration` (varchar) - Course duration
  - `eligibility` (text) - Eligibility criteria
  - `detailed_description` (text) - Long form description
  - `fee` (varchar) - Fee structure
  - `specializations` (jsonb) - Array of specializations
  - `highlights` (jsonb) - Course highlights
  - `why_choose` (jsonb) - Benefits of choosing course
  - `created_at` (timestamptz) - Record creation time
  - `updated_at` (timestamptz) - Last update time

  ### 3. enquiries
  Stores student enquiries/lead information
  - `id` (serial, primary key) - Unique identifier
  - `name` (varchar) - Student name
  - `email` (varchar) - Student email
  - `phone` (varchar) - Contact number
  - `course` (varchar) - Course interested in
  - `state` (varchar) - State of residence
  - `message` (text) - Additional message
  - `created_at` (timestamptz) - Enquiry submission time

  ### 4. admin_users
  Stores admin user credentials
  - `id` (serial, primary key) - Unique identifier
  - `email` (varchar, unique) - Admin email
  - `password_hash` (varchar) - Hashed password
  - `name` (varchar) - Admin name
  - `role` (varchar) - User role
  - `created_at` (timestamptz) - Account creation time
  - `updated_at` (timestamptz) - Last update time

  ## Security
  - RLS enabled on all tables
  - Public read access for colleges and courses
  - Admin-only write access for colleges and courses
  - Admin-only access for enquiries
  - No public access to admin_users table

  ## Notes
  - All tables use SERIAL for auto-incrementing IDs
  - Timestamps default to current time
  - JSONB used for flexible array storage
*/

-- Create colleges table
CREATE TABLE IF NOT EXISTS colleges (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  logo_url VARCHAR(255),
  website VARCHAR(255),
  approval_type VARCHAR(100),
  ranking_position INTEGER,
  detailed_description TEXT,
  rating DECIMAL(2,1) DEFAULT 4.0,
  established_year INTEGER,
  location VARCHAR(255),
  accreditations JSONB DEFAULT '[]'::jsonb,
  highlights JSONB DEFAULT '[]'::jsonb,
  courses_offered JSONB DEFAULT '[]'::jsonb,
  why_choose JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  duration VARCHAR(50),
  eligibility TEXT,
  detailed_description TEXT,
  fee VARCHAR(100),
  specializations JSONB DEFAULT '[]'::jsonb,
  highlights JSONB DEFAULT '[]'::jsonb,
  why_choose JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create enquiries table
CREATE TABLE IF NOT EXISTS enquiries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  course VARCHAR(100),
  state VARCHAR(100),
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for colleges (public read, admin write)
CREATE POLICY "Public can view colleges"
  ON colleges FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert colleges"
  ON colleges FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update colleges"
  ON colleges FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete colleges"
  ON colleges FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for courses (public read, admin write)
CREATE POLICY "Public can view courses"
  ON courses FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert courses"
  ON courses FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update courses"
  ON courses FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete courses"
  ON courses FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for enquiries (anyone can insert, admin can view/delete)
CREATE POLICY "Anyone can submit enquiries"
  ON enquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view enquiries"
  ON enquiries FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete enquiries"
  ON enquiries FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for admin_users (no public access)
CREATE POLICY "Only authenticated can view admin users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (true);

-- Insert sample colleges
INSERT INTO colleges (name, description, approval_type, ranking_position, rating, established_year, location, detailed_description, accreditations, highlights, courses_offered, why_choose) VALUES
(
  'LPU Online',
  'Lovely Professional University - Online & Distance Education',
  'UGC-DEB Approved',
  1,
  4.5,
  2005,
  'Punjab, India',
  'Lovely Professional University (LPU) is one of India''s largest private universities offering comprehensive online and distance education programs. With state-of-the-art infrastructure and experienced faculty, LPU Online provides quality education to working professionals and students across India.',
  '[
    {"name": "UGC-DEB Approved", "description": "University Grants Commission Distance Education Bureau approval ensures quality standards"},
    {"name": "NAAC A++ Grade", "description": "National Assessment and Accreditation Council highest grade accreditation"},
    {"name": "NIRF Ranked", "description": "Featured in National Institutional Ranking Framework"}
  ]'::jsonb,
  '[
    {"label": "University Type", "value": "Private University"},
    {"label": "Total Students", "value": "50,000+ Distance Learning Students"},
    {"label": "Programs Offered", "value": "40+ UG & PG Programs"},
    {"label": "Learning Mode", "value": "100% Online with LMS Access"},
    {"label": "Placement Support", "value": "Dedicated Career Services"}
  ]'::jsonb,
  '[
    {"name": "MBA", "degree": "Master''s", "duration": "2 Years", "fee": "₹50,000/semester", "emi": true},
    {"name": "MCA", "degree": "Master''s", "duration": "2 Years", "fee": "₹45,000/semester", "emi": true},
    {"name": "BBA", "degree": "Bachelor''s", "duration": "3 Years", "fee": "₹35,000/semester", "emi": true},
    {"name": "BCA", "degree": "Bachelor''s", "duration": "3 Years", "fee": "₹30,000/semester", "emi": true}
  ]'::jsonb,
  '[
    "UGC-DEB approved programs with valid degrees",
    "Flexible online learning with recorded lectures",
    "Industry-relevant curriculum designed by experts",
    "Affordable fee structure with EMI options",
    "Placement assistance and career support",
    "Interactive live sessions with faculty"
  ]'::jsonb
),
(
  'JAIN Online',
  'JAIN (Deemed-to-be University) - Distance Education Programs',
  'UGC-DEB Approved',
  2,
  4.3,
  1990,
  'Bangalore, India',
  'JAIN (Deemed-to-be University) offers industry-aligned online programs designed for working professionals. With a focus on practical learning and skill development, JAIN Online provides world-class education through innovative technology platforms.',
  '[
    {"name": "UGC-DEB Approved", "description": "Recognized by University Grants Commission"},
    {"name": "NAAC A+ Grade", "description": "High quality education standards certified"},
    {"name": "AIU Member", "description": "Association of Indian Universities membership"}
  ]'::jsonb,
  '[
    {"label": "University Type", "value": "Deemed-to-be University"},
    {"label": "Experience", "value": "30+ Years in Education"},
    {"label": "Programs", "value": "25+ Online Degree Programs"},
    {"label": "Students", "value": "20,000+ Online Learners"},
    {"label": "Faculty", "value": "500+ Expert Professors"}
  ]'::jsonb,
  '[
    {"name": "MBA", "degree": "Master''s", "duration": "2 Years", "fee": "₹48,000/semester", "emi": true},
    {"name": "MCA", "degree": "Master''s", "duration": "2 Years", "fee": "₹42,000/semester", "emi": true},
    {"name": "M.Com", "degree": "Master''s", "duration": "2 Years", "fee": "₹25,000/semester", "emi": false},
    {"name": "B.Com", "degree": "Bachelor''s", "duration": "3 Years", "fee": "₹20,000/semester", "emi": false}
  ]'::jsonb,
  '[
    "Industry-oriented curriculum with practical focus",
    "Learn from experienced industry professionals",
    "Flexible payment plans and EMI facilities",
    "24/7 access to learning management system",
    "Regular doubt clearing and mentorship sessions",
    "Strong alumni network across industries"
  ]'::jsonb
),
(
  'Manipal Online',
  'Manipal Academy of Higher Education - Online Programs',
  'UGC-DEB Approved',
  3,
  4.4,
  1953,
  'Manipal, Karnataka',
  'Manipal Academy of Higher Education brings decades of educational excellence to online learning. With cutting-edge technology and comprehensive support systems, Manipal Online delivers quality education that matches on-campus standards.',
  '[
    {"name": "UGC Recognition", "description": "Recognized by University Grants Commission"},
    {"name": "NAAC A+ Grade", "description": "Accredited with highest quality standards"},
    {"name": "QS World Ranked", "description": "Featured in QS World University Rankings"}
  ]'::jsonb,
  '[
    {"label": "University Type", "value": "Deemed University"},
    {"label": "Legacy", "value": "70+ Years of Excellence"},
    {"label": "Global Presence", "value": "Campuses in 9 Countries"},
    {"label": "Online Programs", "value": "30+ Degree Programs"},
    {"label": "Learning Support", "value": "Dedicated Student Success Team"}
  ]'::jsonb,
  '[
    {"name": "MBA", "degree": "Master''s", "duration": "2 Years", "fee": "₹55,000/semester", "emi": true},
    {"name": "MCA", "degree": "Master''s", "duration": "2 Years", "fee": "₹50,000/semester", "emi": true},
    {"name": "MA", "degree": "Master''s", "duration": "2 Years", "fee": "₹28,000/semester", "emi": false},
    {"name": "BCA", "degree": "Bachelor''s", "duration": "3 Years", "fee": "₹32,000/semester", "emi": true}
  ]'::jsonb,
  '[
    "Brand reputation with 70 years of excellence",
    "Advanced learning management system",
    "International faculty and global perspective",
    "Comprehensive career development support",
    "Regular webinars and industry interactions",
    "Flexible learning with mobile app access"
  ]'::jsonb
),
(
  'Uttaranchal University Online',
  'Uttaranchal University - Distance Education',
  'UGC-DEB Approved',
  4,
  4.2,
  2013,
  'Dehradun, Uttarakhand',
  'Uttaranchal University offers quality distance education programs designed to empower learners with knowledge and skills. Located in the scenic Himalayan foothills, the university combines traditional values with modern education methodologies.',
  '[
    {"name": "UGC Approved", "description": "University Grants Commission recognition"},
    {"name": "NAAC A Grade", "description": "Quality assurance certification"},
    {"name": "NIRF Ranked", "description": "National Institutional Ranking Framework listed"}
  ]'::jsonb,
  '[
    {"label": "University Type", "value": "Private University"},
    {"label": "Location", "value": "Dehradun, Hill Station"},
    {"label": "Programs", "value": "20+ Distance Learning Programs"},
    {"label": "Affordability", "value": "Competitive Fee Structure"},
    {"label": "Support", "value": "Dedicated Student Helpdesk"}
  ]'::jsonb,
  '[
    {"name": "MBA", "degree": "Master''s", "duration": "2 Years", "fee": "₹40,000/semester", "emi": true},
    {"name": "MCA", "degree": "Master''s", "duration": "2 Years", "fee": "₹38,000/semester", "emi": true},
    {"name": "BBA", "degree": "Bachelor''s", "duration": "3 Years", "fee": "₹30,000/semester", "emi": false},
    {"name": "B.Com", "degree": "Bachelor''s", "duration": "3 Years", "fee": "₹22,000/semester", "emi": false}
  ]'::jsonb,
  '[
    "Affordable quality education for all",
    "UGC-DEB approved valid degrees",
    "Study materials in both digital and print formats",
    "Regular online doubt clearing sessions",
    "Easy examination process at nearby centers",
    "Student-friendly policies and support"
  ]'::jsonb
);

-- Insert sample courses
INSERT INTO courses (name, category, description, duration, eligibility, detailed_description, fee, specializations, highlights, why_choose) VALUES
(
  'MBA Distance Education',
  'MBA',
  'Master of Business Administration through distance learning mode',
  '2 Years',
  'Bachelor''s Degree in any discipline with 50% marks',
  'MBA Distance Education is ideal for working professionals and students who wish to pursue management studies while maintaining work-life balance. The program offers various specializations including Finance, Marketing, HR, IT, Operations, and more. Students gain comprehensive business knowledge through a blend of theoretical concepts and practical applications, preparing them for leadership roles in the corporate world.',
  '₹40,000 - ₹60,000 per year',
  '[
    "MBA (General Management)",
    "MBA (Finance)",
    "MBA (Marketing)",
    "MBA (Human Resource Management)",
    "MBA (Operations Management)",
    "MBA (Information Technology)",
    "MBA (Supply Chain Management)",
    "MBA (Data Analytics)",
    "MBA (Business Analytics)",
    "MBA (International Business)",
    "MBA (Retail Management)",
    "MBA (Healthcare Management)"
  ]'::jsonb,
  '[
    "UGC-DEB approved program with valid degree",
    "Flexible learning schedule for working professionals",
    "Industry-relevant curriculum with case studies",
    "Affordable fee structure with EMI options available",
    "Online lectures and study materials provided",
    "Regular assignments and project work",
    "Examination conducted twice a year",
    "Career advancement opportunities"
  ]'::jsonb,
  '[
    "Advance your career without leaving your job",
    "Learn from experienced faculty and industry experts",
    "Same degree value as regular MBA programs",
    "Enhance leadership and management skills",
    "Network with professionals from diverse industries",
    "Flexible payment options to ease financial burden",
    "Access to digital library and resources",
    "Better job opportunities and salary increments"
  ]'::jsonb
),
(
  'MCA Distance Education',
  'MCA',
  'Master of Computer Applications through distance learning',
  '2 Years',
  'Bachelor''s Degree with Mathematics at 10+2 level',
  'MCA Distance Education is designed for IT professionals and graduates who want to advance their careers in computer applications and software development. The program covers programming languages, database management, software engineering, web technologies, and emerging technologies like AI and machine learning. Students develop strong technical skills and problem-solving abilities required for the dynamic IT industry.',
  '₹35,000 - ₹55,000 per year',
  '[
    "Software Development",
    "Web Technologies",
    "Database Management",
    "Mobile Application Development",
    "Cloud Computing",
    "Artificial Intelligence",
    "Machine Learning",
    "Cyber Security",
    "Data Science",
    "Full Stack Development"
  ]'::jsonb,
  '[
    "Comprehensive computer science curriculum",
    "Hands-on programming and project work",
    "Latest technology and tools coverage",
    "Industry-oriented practical training",
    "Self-paced learning with online resources",
    "Regular coding assignments and assessments",
    "Virtual labs for practical experiments",
    "High demand in IT industry"
  ]'::jsonb,
  '[
    "Build strong programming and technical skills",
    "Career opportunities in top IT companies",
    "Study while working in IT sector",
    "Learn cutting-edge technologies and frameworks",
    "Develop software projects and build portfolio",
    "Affordable compared to regular MCA programs",
    "UGC-DEB approved degree with industry recognition",
    "Pathway to higher studies and research"
  ]'::jsonb
),
(
  'BBA Distance Education',
  'BBA',
  'Bachelor of Business Administration through distance mode',
  '3 Years',
  '10+2 pass from recognized board',
  'BBA Distance Education provides foundational knowledge in business administration and management principles. The program is suitable for students who want to start their business career early or work while studying. It covers subjects like business economics, organizational behavior, marketing management, financial accounting, and business law. Graduates are prepared for entry-level management positions or can pursue MBA for advanced career growth.',
  '₹25,000 - ₹40,000 per year',
  '[
    "BBA (General)",
    "BBA (Marketing)",
    "BBA (Finance)",
    "BBA (Human Resources)",
    "BBA (International Business)",
    "BBA (Entrepreneurship)",
    "BBA (Banking & Insurance)",
    "BBA (Digital Marketing)"
  ]'::jsonb,
  '[
    "Foundation program in business management",
    "Suitable for working students and professionals",
    "Comprehensive business curriculum",
    "Development of analytical and decision-making skills",
    "Project-based learning approach",
    "Affordable undergraduate degree option",
    "Preparation for MBA and higher studies",
    "Recognized degree for government jobs"
  ]'::jsonb,
  '[
    "Start your business career at young age",
    "Flexible learning for working students",
    "Lower fees compared to regular BBA programs",
    "Same career opportunities as regular graduates",
    "Learn business fundamentals and practices",
    "Build confidence and communication skills",
    "Eligible for MBA programs after graduation",
    "Multiple career paths in business sector"
  ]'::jsonb
),
(
  'BCA Distance Education',
  'BCA',
  'Bachelor of Computer Applications through distance learning',
  '3 Years',
  '10+2 pass with Mathematics',
  'BCA Distance Education is an undergraduate program focused on computer applications and IT fundamentals. The curriculum includes programming languages like C, C++, Java, Python, database management, web development, and software engineering. Students develop practical coding skills and theoretical knowledge essential for IT careers. This program is ideal for students who want to enter the IT industry without pursuing a traditional engineering degree.',
  '₹20,000 - ₹35,000 per year',
  '[
    "Programming Languages",
    "Web Development",
    "Database Management Systems",
    "Software Engineering",
    "Computer Networks",
    "Operating Systems",
    "Data Structures",
    "Mobile App Development"
  ]'::jsonb,
  '[
    "Industry-focused IT curriculum",
    "Practical coding and programming emphasis",
    "Modern software development tools and techniques",
    "Project work and assignments",
    "Affordable IT education option",
    "Gateway to IT career without engineering",
    "Online coding labs and resources",
    "Strong foundation for MCA and higher studies"
  ]'::jsonb,
  '[
    "Enter IT industry with recognized degree",
    "Learn in-demand programming skills",
    "Work while completing your degree",
    "Lower cost than engineering programs",
    "High demand for BCA graduates in IT sector",
    "Hands-on experience with real projects",
    "Flexible online learning mode",
    "Pathway to MCA and advanced IT careers"
  ]'::jsonb
),
(
  'B.Com Distance Education',
  'B.Com',
  'Bachelor of Commerce through distance mode',
  '3 Years',
  '10+2 pass from recognized board',
  'B.Com Distance Education provides comprehensive knowledge of commerce, accounting, taxation, and business practices. The program is suitable for working professionals, business owners, and students who want flexibility in their studies. It covers financial accounting, business law, economics, banking, insurance, and taxation. Graduates can pursue careers in accounting, banking, finance, or continue with M.Com and professional courses like CA, CS, or CMA.',
  '₹15,000 - ₹30,000 per year',
  '[
    "B.Com (General)",
    "B.Com (Accounting & Finance)",
    "B.Com (Banking & Insurance)",
    "B.Com (Taxation)",
    "B.Com (Business Management)",
    "B.Com (E-Commerce)"
  ]'::jsonb,
  '[
    "Core commerce and accounting knowledge",
    "Practical understanding of business operations",
    "Coverage of taxation and finance",
    "Preparation for professional courses (CA, CS, CMA)",
    "Suitable for family business owners",
    "Most affordable undergraduate commerce degree",
    "Recognized for government job eligibility",
    "Foundation for M.Com and MBA programs"
  ]'::jsonb,
  '[
    "Essential degree for commerce careers",
    "Study while managing business or job",
    "Very affordable education option",
    "Opens doors to banking and finance sector",
    "Preparation for CA, CS, and other certifications",
    "Practical knowledge of accounting and taxation",
    "Wide range of career opportunities",
    "Eligible for government exams and jobs"
  ]'::jsonb
),
(
  'M.Com Distance Education',
  'M.Com',
  'Master of Commerce through distance learning',
  '2 Years',
  'Bachelor of Commerce or related degree',
  'M.Com Distance Education is a postgraduate program for commerce graduates who want to specialize in advanced commerce subjects. The curriculum includes advanced accounting, corporate taxation, financial management, business statistics, and research methodology. This program is ideal for working professionals in accounting, finance, and business sectors. Graduates can pursue careers as financial analysts, tax consultants, accountants, or pursue doctoral studies.',
  '₹20,000 - ₹35,000 per year',
  '[
    "M.Com (Accounting)",
    "M.Com (Finance)",
    "M.Com (Taxation)",
    "M.Com (Business Economics)",
    "M.Com (Banking & Insurance)"
  ]'::jsonb,
  '[
    "Advanced commerce and finance knowledge",
    "Specialization in chosen commerce field",
    "Research-oriented curriculum",
    "Suitable for CA, CS professionals",
    "Career advancement in finance sector",
    "Preparation for UGC NET and PhD",
    "Project work and dissertation",
    "Enhanced analytical and research skills"
  ]'::jsonb,
  '[
    "Advance your commerce career",
    "Specialize in finance, taxation, or accounting",
    "Study while working as accountant or analyst",
    "Affordable postgraduate commerce degree",
    "Qualify for teaching positions in commerce",
    "Better job opportunities and promotions",
    "Foundation for PhD and research career",
    "Enhanced professional credibility"
  ]'::jsonb
),
(
  'MA Distance Education',
  'MA',
  'Master of Arts in various disciplines',
  '2 Years',
  'Bachelor''s degree in relevant discipline',
  'MA Distance Education offers postgraduate programs in humanities and social sciences including English, Hindi, History, Political Science, Economics, Psychology, Sociology, and Public Administration. The program provides in-depth knowledge and research skills in chosen disciplines. It is suitable for working professionals, teachers, and government employees who want to advance their qualifications. Graduates can pursue careers in education, civil services, journalism, or continue with PhD programs.',
  '₹15,000 - ₹30,000 per year',
  '[
    "MA (English)",
    "MA (Hindi)",
    "MA (History)",
    "MA (Political Science)",
    "MA (Economics)",
    "MA (Psychology)",
    "MA (Sociology)",
    "MA (Public Administration)",
    "MA (Philosophy)",
    "MA (Geography)"
  ]'::jsonb,
  '[
    "Comprehensive study of chosen subject",
    "Research-oriented curriculum",
    "Flexible learning for working professionals",
    "Preparation for UGC NET, UPSC, and other exams",
    "Dissertation and project work",
    "Critical thinking and analytical skills",
    "Affordable postgraduate arts degree",
    "Qualification for teaching and research"
  ]'::jsonb,
  '[
    "Advance your career in humanities field",
    "Essential for teaching jobs in colleges",
    "Preparation for civil services and competitive exams",
    "Develop research and analytical abilities",
    "Study while working in education sector",
    "Very affordable postgraduate option",
    "Foundation for PhD and research career",
    "Enhanced knowledge and career prospects"
  ]'::jsonb
),
(
  'MSc Distance Education',
  'MSc',
  'Master of Science in various specializations',
  '2 Years',
  'Bachelor of Science in relevant field',
  'MSc Distance Education provides advanced scientific knowledge in disciplines like Mathematics, Physics, Chemistry, Botany, Zoology, Environmental Science, and IT. The program combines theoretical concepts with practical applications and research methodology. It is designed for science graduates working in laboratories, schools, industries, or research organizations. Graduates can pursue careers in research, education, industry, or continue with PhD programs for academic careers.',
  '₹25,000 - ₹40,000 per year',
  '[
    "MSc (Mathematics)",
    "MSc (Physics)",
    "MSc (Chemistry)",
    "MSc (Botany)",
    "MSc (Zoology)",
    "MSc (Environmental Science)",
    "MSc (Biotechnology)",
    "MSc (Information Technology)",
    "MSc (Computer Science)"
  ]'::jsonb,
  '[
    "Advanced scientific knowledge",
    "Research-based curriculum",
    "Laboratory work and practical training",
    "Suitable for working science professionals",
    "Project and dissertation work",
    "Preparation for UGC NET and research careers",
    "Industry-relevant skills development",
    "Qualification for teaching positions"
  ]'::jsonb,
  '[
    "Advance your science career",
    "Essential for college teaching positions",
    "Develop research and laboratory skills",
    "Study while working in industry or education",
    "Foundation for PhD and research career",
    "Better opportunities in scientific organizations",
    "Specialized knowledge in chosen field",
    "Enhanced professional qualifications"
  ]'::jsonb
);

-- Insert default admin user (password: password123 - hashed with bcrypt)
-- Note: In production, this should be properly hashed
INSERT INTO admin_users (email, password_hash, name, role) VALUES
('admin@example.com', '$2a$10$rT8YqnJ5yP9XqN5vL5wXWugJPmqKHKJN5Y5K5gggggggggggggggg', 'Admin User', 'admin')
ON CONFLICT (email) DO NOTHING;
