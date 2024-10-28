-- Users
INSERT INTO Users (username, email, password, role) VALUES 
('alice', 'alice@example.com', 'password123', 'student'),
('bob', 'bob@example.com', 'securepass', 'admin'),
('carol', 'carol@example.com', 'mysecret', 'student');

-- Posts
INSERT INTO Posts (user_id, created_at, updated_at, title, description, academic_year, department, grade, related_period) VALUES
(1, NOW(), NOW(), 'Introduction to Computer Science', 'Basics of computer science', 2024, 'AD', 1, '前期'),
(2, NOW(), NOW(), 'Advanced Mathematics', 'Topics in advanced mathematics', 2024, 'FI', 2, '後期');

-- Comments
INSERT INTO Comments (user_id, content) VALUES
(1, 'This post is really helpful!'),
(2, 'Thanks for sharing this information.'),
(3, 'Could you explain more about the theory?');

-- CommentThreads
INSERT INTO CommentThreads (post_id, comment_id) VALUES
(1, 1),
(1, 2),
(2, 3);

-- Replies
INSERT INTO Replies (user_id, content) VALUES
(1, 'Sure, let me know which part you need help with.'),
(2, 'Happy to help!');

-- Threads
INSERT INTO Threads (comment_id, reply_id) VALUES
(1, 1),
(3, 2);

-- SharedURLs
INSERT INTO SharedURLs (post_id, link) VALUES
(1, 'https://example.com/cs-basics'),
(2, 'https://example.com/adv-math');

-- Bookmarks
INSERT INTO Bookmarks (post_id, user_id) VALUES
(1, 1),
(2, 2),
(1, 3);