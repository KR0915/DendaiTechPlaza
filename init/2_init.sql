-- Users
INSERT INTO Users (username, email, password, role) VALUES 
('alice', 'alice@example.com', '$2a$08$JrcCSVJnlaqq6OlEltOmcuzidpWteU3sUgv8oWPXsM4.bRfcFCUBK', 'student'),
('bob', 'bob@example.com', '$2a$08$XyBWFqEBvT5RkKjcKqmoveiIF0iL1MrHu6mnuPwim7lDDWapCMtje', 'admin'),
('carol', 'carol@example.com', '$2a$08$TWtqSEj3u6BkzAVQcqwoW.lsiyflwAJo2OyGf7T59TYgzXpHdk3ga', 'student'),
('david', 'david@example.com', '$2a$08$M5nkMhCQ.u.jojYr/xJ28.UT9pEjn.2eycBFvWt/e/7n11O4n3zXq', 'student'),
('eve', 'eve@example.com', '$2a$08$oXgk8AVjdwMhDWu.YhivDen1jt9fqB0JorGixg0T5NP.C6KZAudbi', 'admin'),
('frank', 'frank@example.com', '$2a$08$BnDsiFPRgMCHFEfUQWRApeewReD/s772KozZf5wH3MEQ8/0alLF9C', 'student'),
('grace', 'grace@example.com', '$2a$08$.GAYTPFpM/HIR6bjeFlkt.0VlO2I5i761VuH/u4aWVdHHmbsmrCPG', 'student'),
('henry', 'henry@example.com', '$2a$08$S.59tlLTT8fEx2cm5xm3ZuufLhQmz9CZo8yHoZIP/a5AwXcdW8z0.', 'admin'),
('isabel', 'isabel@example.com', '$2a$08$89qHdRhl9doV2Tm2i/qyzuzcCO2BEWsxFX0yrrzV1ZL5hU7zrHPOy', 'student'),
('jack', 'jack@example.com', '$2a$08$j/vlnh6fU2ucByKRjj5OWeFxCk.LZUU2zSAkECNdCE.LXJQJzSsR6', 'admin');

-- Posts
INSERT INTO Posts (user_id, created_at, updated_at, title, description, academic_year, department, grade, related_period) VALUES
(1, NOW(), NOW(), 'Introduction to Computer Science', 'Basics of computer science', 2024, 'AD', 1, '前期'),
(2, NOW(), NOW(), 'Advanced Mathematics', 'Topics in advanced mathematics', 2024, 'FI', 2, '後期'),
(3, NOW(), NOW(), 'Data Structures and Algorithms', 'Fundamental data structures and algorithms', 2024, 'AD', 2, '前期'),
(4, NOW(), NOW(), 'Database Management Systems', 'Introduction to DBMS', 2024, 'AD', 3, '後期'),
(5, NOW(), NOW(), 'Machine Learning Basics', 'Introduction to machine learning concepts', 2024, 'AD', 4, '前期'),
(6, NOW(), NOW(), 'Web Development Fundamentals', 'HTML, CSS, and JavaScript basics', 2024, 'AD', 2, '前期'),
(7, NOW(), NOW(), 'Operating Systems', 'Principles of operating systems', 2024, 'AD', 3, '後期'),
(8, NOW(), NOW(), 'Computer Networks', 'Fundamentals of computer networking', 2024, 'AD', 3, '前期'),
(9, NOW(), NOW(), 'Software Engineering', 'Software development lifecycle and methodologies', 2024, 'AD', 4, '後期'),
(10, NOW(), NOW(), 'Artificial Intelligence', 'Introduction to AI concepts and applications', 2024, 'AD', 4, '前期'),
(1, NOW(), NOW(), 'alice投稿複数てすと', 'aliceの複数投稿テストです', 2022, 'FI', 2, '前期');

-- Comments
INSERT INTO Comments (user_id, content) VALUES
(1, 'This post is really helpful!'),
(2, 'Thanks for sharing this information.'),
(3, 'Could you explain more about the theory?'),
(4, 'Great explanation of the concepts.'),
(5, 'I found this very informative.'),
(6, 'Can you provide more examples?'),
(7, 'This helped me understand the topic better.'),
(8, 'Excellent resource for beginners.'),
(9, 'I have a question about the third point.'),
(10, 'Looking forward to more posts like this.');

-- CommentThreads
INSERT INTO CommentThreads (post_id, comment_id) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 4),
(4, 5),
(5, 6),
(6, 7),
(7, 8),
(8, 9),
(9, 10);

-- Replies
INSERT INTO Replies (user_id, content) VALUES
(1, E'Sure, let me know which part you need help with.'),
(2, E'Happy to help!'),
(3, E'I can clarify that point for you.'),
(4, E'Here\'s an additional explanation...'),
(5, E'I\'m glad you found it useful.'),
(6, E'Certainly, I\'ll post more examples soon.'),
(7, E'Feel free to ask if you have more questions.'),
(8, E'Thanks for your feedback!'),
(9, E'I\'ll address your question in a follow-up post.'),
(10, E'Thank you for your interest in the topic.');


-- Threads
INSERT INTO Threads (comment_id, reply_id) VALUES
(1, 1),
(3, 2),
(4, 3),
(5, 4),
(6, 5),
(7, 6),
(8, 7),
(9, 8),
(10, 9),
(2, 10);

-- SharedURLs
INSERT INTO SharedURLs (post_id, link) VALUES
(1, 'https://example.com/cs-basics'),
(2, 'https://example.com/adv-math'),
(2, 'https://example.com/data-structures'),
(3, 'https://example.com/data-structures'),
(4, 'https://example.com/dbms-intro'),
(5, 'https://example.com/ml-basics'),
(6, 'https://example.com/web-dev-fundamentals'),
(7, 'https://example.com/operating-systems'),
(8, 'https://example.com/computer-networks'),
(9, 'https://example.com/software-engineering'),
(10, 'https://example.com/ai-intro');

-- Bookmarks
INSERT INTO Bookmarks (post_id, user_id) VALUES
(1, 1),
(2, 2),
(1, 3),
(3, 4),
(4, 5),
(5, 6),
(6, 7),
(7, 8),
(8, 9),
(9, 10),
(10, 1),
(2, 3),
(3, 5),
(4, 7),
(5, 9);