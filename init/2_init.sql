INSERT INTO Departments (name) VALUES 
('AD'),
('AJ'),
('EK'),
('EF'),
('ES'),
('EC'),
('EJ'),
('EH'),
('FI'),
('FA'),
('FR'),
('NC'),
('NM'),
('NE'),
('RB'),
('RE'),
('RD'),
('RU'),
('RM'),
('RG');

INSERT INTO Users (username, email, password, role, created_at, updated_at) VALUES 
('alice', 'alice@example.com', '$2a$08$JrcCSVJnlaqq6OlEltOmcuzidpWteU3sUgv8oWPXsM4.bRfcFCUBK', 'student', NOW(), NOW()),
('bob', 'bob@example.com', '$2a$08$XyBWFqEBvT5RkKjcKqmoveiIF0iL1MrHu6mnuPwim7lDDWapCMtje', 'admin', NOW(), NOW()),
('carol', 'carol@example.com', '$2a$08$TWtqSEj3u6BkzAVQcqwoW.lsiyflwAJo2OyGf7T59TYgzXpHdk3ga', 'student', NOW(), NOW()),
('david', 'david@example.com', '$2a$08$M5nkMhCQ.u.jojYr/xJ28.UT9pEjn.2eycBFvWt/e/7n11O4n3zXq', 'student', NOW(), NOW()),
('eve', 'eve@example.com', '$2a$08$oXgk8AVjdwMhDWu.YhivDen1jt9fqB0JorGixg0T5NP.C6KZAudbi', 'admin', NOW(), NOW()),
('frank', 'frank@example.com', '$2a$08$BnDsiFPRgMCHFEfUQWRApeewReD/s772KozZf5wH3MEQ8/0alLF9C', 'student', NOW(), NOW()),
('grace', 'grace@example.com', '$2a$08$.GAYTPFpM/HIR6bjeFlkt.0VlO2I5i761VuH/u4aWVdHHmbsmrCPG', 'student', NOW(), NOW()),
('henry', 'henry@example.com', '$2a$08$S.59tlLTT8fEx2cm5xm3ZuufLhQmz9CZo8yHoZIP/a5AwXcdW8z0.', 'admin', NOW(), NOW()),
('isabel', 'isabel@example.com', '$2a$08$89qHdRhl9doV2Tm2i/qyzuzcCO2BEWsxFX0yrrzV1ZL5hU7zrHPOy', 'student', NOW(), NOW()),
('jack', 'jack@example.com', '$2a$08$j/vlnh6fU2ucByKRjj5OWeFxCk.LZUU2zSAkECNdCE.LXJQJzSsR6', 'admin', NOW(), NOW());

INSERT INTO Posts (user_id, department_id, created_at, updated_at, title, description, academic_year, grade, related_period) VALUES
(1, (SELECT department_id FROM Departments WHERE name = 'AD'), NOW(), NOW(), 'Introduction to Computer Science', 'Basics of computer science', 2024, 1, '前期'),
(2, (SELECT department_id FROM Departments WHERE name = 'FI'), NOW(), NOW(), 'Advanced Mathematics', 'Topics in advanced mathematics', 2024, 2, '後期'),
(3, (SELECT department_id FROM Departments WHERE name = 'AD'), NOW(), NOW(), 'Data Structures and Algorithms', 'Fundamental data structures and algorithms', 2024, 2, '前期'),
(4, (SELECT department_id FROM Departments WHERE name = 'AD'), NOW(), NOW(), 'Database Management Systems', 'Introduction to DBMS', 2024, 3, '後期'),
(5, (SELECT department_id FROM Departments WHERE name = 'AD'), NOW(), NOW(), 'Machine Learning Basics', 'Introduction to machine learning concepts', 2024, 4, '前期'),
(6, (SELECT department_id FROM Departments WHERE name = 'AD'), NOW(), NOW(), 'Web Development Fundamentals', 'HTML, CSS, and JavaScript basics', 2024, 2, '前期'),
(7, (SELECT department_id FROM Departments WHERE name = 'AD'), NOW(), NOW(), 'Operating Systems', 'Principles of operating systems', 2024, 3, '後期'),
(8, (SELECT department_id FROM Departments WHERE name = 'AD'), NOW(), NOW(), 'Computer Networks', 'Fundamentals of computer networking', 2024, 3, '前期'),
(9, (SELECT department_id FROM Departments WHERE name = 'AD'), NOW(), NOW(), 'Software Engineering', 'Software development lifecycle and methodologies', 2024, 4, '後期'),
(10, (SELECT department_id FROM Departments WHERE name = 'AD'), NOW(), NOW(), 'Artificial Intelligence', 'Introduction to AI concepts and applications', 2024, 4, '前期'),
(1, (SELECT department_id FROM Departments WHERE name = 'FI'), NOW(), NOW(), 'alice投稿複数てすと', 'aliceの複数投稿テストです', 2022, 2, '前期');

INSERT INTO Comments (post_id, user_id, content, created_at, updated_at) VALUES
(1, 1, 'This post is really helpful!', NOW(), NOW()),
(1, 2, 'Thanks for sharing this information.', NOW(), NOW()),
(2, 3, 'Could you explain more about the theory?', NOW(), NOW()),
(3, 4, 'Great explanation of the concepts.', NOW(), NOW()),
(4, 5, 'I found this very informative.', NOW(), NOW()),
(5, 6, 'Can you provide more examples?', NOW(), NOW()),
(6, 7, 'This helped me understand the topic better.', NOW(), NOW()),
(7, 8, 'Excellent resource for beginners.', NOW(), NOW()),
(8, 9, 'I have a question about the third point.', NOW(), NOW()),
(9, 10, 'Looking forward to more posts like this.', NOW(), NOW());


INSERT INTO Replies (parent_comment_id, user_id, content, created_at, updated_at) VALUES
(1, 1, E'Sure, let me know which part you need help with.', NOW(), NOW()),
(3, 2, E'Happy to help!', NOW(), NOW()),
(4, 3, E'I can clarify that point for you.', NOW(), NOW()),
(5, 4, E'Here\'s an additional explanation...', NOW(), NOW()),
(6, 5, E'I\'m glad you found it useful.', NOW(), NOW()),
(7, 6, E'Certainly, I\'ll post more examples soon.', NOW(), NOW()),
(8, 7, E'Feel free to ask if you have more questions.', NOW(), NOW()),
(9, 8, E'Thanks for your feedback!', NOW(), NOW()),
(10, 9, E'I\'ll address your question in a follow-up post.', NOW(), NOW()),
(2, 10, E'Thank you for your interest in the topic.', NOW(), NOW());


INSERT INTO shared_urls (post_id, link, created_at, updated_at) VALUES
(1, 'https://example.com/cs-basics', NOW(), NOW()),
(2, 'https://example.com/adv-math', NOW(), NOW()),
(2, 'https://example.com/data-structures', NOW(), NOW()),
(3, 'https://example.com/data-structures', NOW(), NOW()),
(4, 'https://example.com/dbms-intro', NOW(), NOW()),
(5, 'https://example.com/ml-basics', NOW(), NOW()),
(6, 'https://example.com/web-dev-fundamentals', NOW(), NOW()),
(7, 'https://example.com/operating-systems', NOW(), NOW()),
(8, 'https://example.com/computer-networks', NOW(), NOW()),
(9, 'https://example.com/software-engineering', NOW(), NOW()),
(10, 'https://example.com/ai-intro', NOW(), NOW());


INSERT INTO Bookmarks (post_id, user_id, created_at) VALUES
(1, 1, NOW()),
(2, 2, NOW()),
(1, 3, NOW()),
(3, 4, NOW()),
(4, 5, NOW()),
(5, 6, NOW()),
(6, 7, NOW()),
(7, 8, NOW()),
(8, 9, NOW()),
(9, 10, NOW()),
(10, 1, NOW()),
(2, 3, NOW()),
(3, 5, NOW()),
(4, 7, NOW()),
(5, 9, NOW());