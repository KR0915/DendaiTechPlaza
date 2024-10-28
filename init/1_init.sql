-- Users table
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20)
);

-- Posts table
CREATE TABLE Posts (
    post_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    title VARCHAR(100),
    description TEXT,
    academic_year INT,
    department VARCHAR(50),
    grade INT,
    related_period VARCHAR(50)
);

-- Comments table
CREATE TABLE Comments (
    comment_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CommentThreads table
CREATE TABLE CommentThreads (
    thread_id SERIAL PRIMARY KEY,
    post_id INT REFERENCES Posts(post_id),
    comment_id INT REFERENCES Comments(comment_id)
);

-- Replies table
CREATE TABLE Replies (
    reply_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Threads table
CREATE TABLE Threads (
    thread_id SERIAL PRIMARY KEY,
    comment_id INT REFERENCES Comments(comment_id),
    reply_id INT REFERENCES Replies(reply_id)
);

-- SharedURLs table
CREATE TABLE SharedURLs (
    shared_url_id SERIAL PRIMARY KEY,
    post_id INT REFERENCES Posts(post_id),
    link VARCHAR(255)
);

-- Bookmarks table
CREATE TABLE Bookmarks (
    bookmark_id SERIAL PRIMARY KEY,
    post_id INT REFERENCES Posts(post_id),
    user_id INT REFERENCES Users(user_id)
);
