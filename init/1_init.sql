-- Users table
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- Departments table
CREATE TABLE Departments (
    department_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- Posts table
CREATE TABLE Posts (
    post_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    department_id INT REFERENCES Departments(department_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    title VARCHAR(100),
    description TEXT,
    academic_year INT,
    grade INT,
    related_period VARCHAR(50)
);

-- Comments table
CREATE TABLE Comments (
    comment_id SERIAL PRIMARY KEY,
    post_id INT REFERENCES Posts(post_id),
    user_id INT REFERENCES Users(user_id),
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- Replies table
CREATE TABLE Replies (
    reply_id SERIAL PRIMARY KEY,
    parent_comment_id INT REFERENCES Comments(comment_id),
    user_id INT REFERENCES Users(user_id),
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- SharedURLs table
CREATE TABLE shared_urls (
    shared_url_id SERIAL PRIMARY KEY,
    post_id INT REFERENCES Posts(post_id),
    link VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- Bookmarks table
CREATE TABLE Bookmarks (
    bookmark_id SERIAL PRIMARY KEY,
    post_id INT REFERENCES Posts(post_id),
    user_id INT REFERENCES Users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (post_id, user_id)
);

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
('alice', '20fi122@ms.dendai.ac.jp', '$2a$08$JrcCSVJnlaqq6OlEltOmcuzidpWteU3sUgv8oWPXsM4.bRfcFCUBK', 'student', NOW(), NOW()),
('bob', '19ad061@ms.dendai.ac.jp', '$2a$08$XyBWFqEBvT5RkKjcKqmoveiIF0iL1MrHu6mnuPwim7lDDWapCMtje', 'admin', NOW(), NOW()),
('carol', '24fi055@ms.dendai.ac.jp', '$2a$08$TWtqSEj3u6BkzAVQcqwoW.lsiyflwAJo2OyGf7T59TYgzXpHdk3ga', 'student', NOW(), NOW()),
('david', '21ec120@ems.dendai.ac.jp', '$2a$08$M5nkMhCQ.u.jojYr/xJ28.UT9pEjn.2eycBFvWt/e/7n11O4n3zXq', 'student', NOW(), NOW()),
('eve', '20ej110@ms.dendai.ac.jp', '$2a$08$oXgk8AVjdwMhDWu.YhivDen1jt9fqB0JorGixg0T5NP.C6KZAudbi', 'admin', NOW(), NOW()),
('frank', '18fr102@ms.dendai.ac.jp', '$2a$08$BnDsiFPRgMCHFEfUQWRApeewReD/s772KozZf5wH3MEQ8/0alLF9C', 'student', NOW(), NOW()),
('grace', '20nc120@ms.dendai.ac.jp', '$2a$08$.GAYTPFpM/HIR6bjeFlkt.0VlO2I5i761VuH/u4aWVdHHmbsmrCPG', 'student', NOW(), NOW()),
('henry', '20ne120@ms.dendai.ac.jp', '$2a$08$S.59tlLTT8fEx2cm5xm3ZuufLhQmz9CZo8yHoZIP/a5AwXcdW8z0.', 'admin', NOW(), NOW()),
('isabel', '19ad110@ms.dendai.ac.jp', '$2a$08$89qHdRhl9doV2Tm2i/qyzuzcCO2BEWsxFX0yrrzV1ZL5hU7zrHPOy', 'student', NOW(), NOW()),
('jack', '20es120@ms.dendai.ac.jp', '$2a$08$j/vlnh6fU2ucByKRjj5OWeFxCk.LZUU2zSAkECNdCE.LXJQJzSsR6', 'admin', NOW(), NOW());



-- 新しいサンプル投稿を日本語で追加
INSERT INTO Posts (user_id, department_id, created_at, updated_at, title, description, academic_year, grade, related_period) VALUES
(1, (SELECT department_id FROM Departments WHERE name = 'AD'), NOW(), NOW(), 'メタバース開発入門', 'バーチャル空間の設計と実装技術', 2024, 2, '前期'),
(2, (SELECT department_id FROM Departments WHERE name = 'FI'), NOW(), NOW(), 'ESG投資と技術革新', '持続可能な開発目標に基づく投資戦略', 2024, 3, '後期'),
(3, (SELECT department_id FROM Departments WHERE name = 'EK'), NOW(), NOW(), '量子センシング技術', '量子効果を利用した超高感度センサーの開発', 2024, 4, '前期'),
(4, (SELECT department_id FROM Departments WHERE name = 'EF'), NOW(), NOW(), 'ホログラフィック通信', '3D映像を用いた次世代通信システム', 2024, 3, '後期'),
(5, (SELECT department_id FROM Departments WHERE name = 'ES'), NOW(), NOW(), 'ソフトロボティクス', '柔軟な材料を用いたロボットの設計と制御', 2024, 2, '前期'),
(6, (SELECT department_id FROM Departments WHERE name = 'EC'), NOW(), NOW(), 'ニューラルネットワークアーキテクチャ', '効率的な深層学習モデルの設計手法', 2024, 4, '後期'),
(7, (SELECT department_id FROM Departments WHERE name = 'EJ'), NOW(), NOW(), 'コンピュータビジョンと医療診断', 'AIによる医用画像の解析と診断支援', 2024, 3, '前期'),
(8, (SELECT department_id FROM Departments WHERE name = 'EH'), NOW(), NOW(), 'ブレイン・マシン・インターフェース', '思考による機器制御システムの開発', 2024, 4, '後期'),
(9, (SELECT department_id FROM Departments WHERE name = 'FA'), NOW(), NOW(), 'バイオミメティクス工学', '生物の機能を模倣した新材料開発', 2024, 2, '前期'),
(10, (SELECT department_id FROM Departments WHERE name = 'FR'), NOW(), NOW(), 'スマートシティのセンサーネットワーク', '都市全体をカバーするIoTシステムの設計', 2024, 3, '後期'),
(1, (SELECT department_id FROM Departments WHERE name = 'NC'), NOW(), NOW(), 'エッジコンピューティングセキュリティ', 'エッジデバイスのためのサイバーセキュリティ対策', 2024, 4, '前期'),
(2, (SELECT department_id FROM Departments WHERE name = 'NM'), NOW(), NOW(), '次世代ディスプレイ技術', '折りたたみ可能なOLEDディスプレイの開発', 2024, 3, '後期'),
(3, (SELECT department_id FROM Departments WHERE name = 'NE'), NOW(), NOW(), 'サイバー・フィジカル・セキュリティ', '物理システムとデジタルシステムの統合的保護', 2024, 4, '前期'),
(4, (SELECT department_id FROM Departments WHERE name = 'RB'), NOW(), NOW(), 'オルガノイド工学', 'ミニ臓器の培養技術と医療応用', 2024, 3, '後期'),
(5, (SELECT department_id FROM Departments WHERE name = 'RE'), NOW(), NOW(), '核融合エネルギー工学', '持続可能な核融合炉の設計と課題', 2024, 4, '前期'),
(6, (SELECT department_id FROM Departments WHERE name = 'RD'), NOW(), NOW(), '自然言語処理と法律文書解析', 'AIによる法律文書の自動解析と要約', 2024, 3, '後期'),
(7, (SELECT department_id FROM Departments WHERE name = 'RU'), NOW(), NOW(), '垂直農業システム', '都市型の多層式農業施設の設計と管理', 2024, 2, '前期'),
(8, (SELECT department_id FROM Departments WHERE name = 'RM'), NOW(), NOW(), 'メタマテリアル設計', '特殊な光学特性を持つ人工材料の開発', 2024, 4, '後期'),
(9, (SELECT department_id FROM Departments WHERE name = 'RG'), NOW(), NOW(), 'AIゲームデザイン', '機械学習を用いた動的ゲームコンテンツ生成', 2024, 3, '前期'),
(10, (SELECT department_id FROM Departments WHERE name = 'AJ'), NOW(), NOW(), '計算言語学と方言解析', 'AIによる日本の方言の体系的研究', 2024, 2, '後期'),
(1, (SELECT department_id FROM Departments WHERE name = 'AD'), NOW(), NOW(), 'クォンタムソフトウェア工学', '量子コンピュータのためのソフトウェア開発手法', 2024, 4, '前期'),
(2, (SELECT department_id FROM Departments WHERE name = 'FI'), NOW(), NOW(), 'フィンテックと規制技術', '金融技術革新に対する効果的な規制手法', 2024, 3, '後期'),
(3, (SELECT department_id FROM Departments WHERE name = 'EK'), NOW(), NOW(), 'テラヘルツイメージング', 'テラヘルツ波を用いた非破壊検査技術', 2024, 4, '前期'),
(4, (SELECT department_id FROM Departments WHERE name = 'EF'), NOW(), NOW(), '衛星量子通信', '宇宙を利用した量子暗号通信システム', 2024, 3, '後期'),
(5, (SELECT department_id FROM Departments WHERE name = 'ES'), NOW(), NOW(), 'ハプティクス技術', '触覚フィードバックシステムの設計と応用', 2024, 2, '前期'),
(6, (SELECT department_id FROM Departments WHERE name = 'EC'), NOW(), NOW(), 'エクサスケールコンピューティング', '超大規模並列計算システムの設計と課題', 2024, 4, '後期'),
(7, (SELECT department_id FROM Departments WHERE name = 'EJ'), NOW(), NOW(), 'マルチエージェント強化学習', '複数AIエージェントの協調学習アルゴリズム', 2024, 3, '前期'),
(8, (SELECT department_id FROM Departments WHERE name = 'EH'), NOW(), NOW(), '感情コンピューティング', '人間の感情を理解し反応するAIシステム', 2024, 4, '後期'),
(9, (SELECT department_id FROM Departments WHERE name = 'FA'), NOW(), NOW(), '極限環境材料工学', '超高温・超高圧下で使用可能な新素材開発', 2024, 3, '前期'),
(10, (SELECT department_id FROM Departments WHERE name = 'FR'), NOW(), NOW(), '自己修復型ロボット', '損傷を自動修復できるロボットシステムの設計', 2024, 4, '後期'),
(1, (SELECT department_id FROM Departments WHERE name = 'AD'), NOW(), NOW(), 'エッジAIアプリケーション開発', 'モバイルデバイスでの効率的な機械学習モデルの実装と最適化', 2024, 3, '前期'),
(2, (SELECT department_id FROM Departments WHERE name = 'FI'), NOW(), NOW(), 'ブロックチェーンと金融革新', '分散型台帳技術による新しい金融サービスの創造', 2024, 4, '後期'),
(3, (SELECT department_id FROM Departments WHERE name = 'EK'), NOW(), NOW(), 'スマートグリッドとエネルギー管理', 'AIを活用した電力需給バランスの最適化', 2024, 3, '前期'),
(4, (SELECT department_id FROM Departments WHERE name = 'EF'), NOW(), NOW(), '次世代無線通信システム設計', '6Gに向けた高周波・大容量通信技術の研究', 2024, 4, '後期'),
(5, (SELECT department_id FROM Departments WHERE name = 'ES'), NOW(), NOW(), 'ウェアラブルヘルスケアデバイス', '生体センサーとAIによる健康モニタリングシステムの開発', 2024, 2, '前期'),
(6, (SELECT department_id FROM Departments WHERE name = 'EC'), NOW(), NOW(), '量子アルゴリズム設計', '量子コンピュータのための効率的なアルゴリズム開発', 2024, 4, '後期'),
(7, (SELECT department_id FROM Departments WHERE name = 'EJ'), NOW(), NOW(), '自然言語処理と機械翻訳', 'ディープラーニングによる多言語翻訳システムの構築', 2024, 3, '前期'),
(8, (SELECT department_id FROM Departments WHERE name = 'EH'), NOW(), NOW(), '脳型コンピューティング', 'ニューロモーフィックハードウェアの設計と応用', 2024, 4, '後期'),
(9, (SELECT department_id FROM Departments WHERE name = 'FA'), NOW(), NOW(), 'バイオインスパイアード材料', '生物の特性を模倣した新機能材料の開発', 2024, 3, '前期'),
(10, (SELECT department_id FROM Departments WHERE name = 'FR'), NOW(), NOW(), '自律型ドローンシステム', 'AIによる複数ドローンの協調制御と応用', 2024, 2, '後期'),
(1, (SELECT department_id FROM Departments WHERE name = 'NC'), NOW(), NOW(), 'サイバーフィジカルセキュリティ', 'IoTデバイスとクラウドシステムの統合的なセキュリティ対策', 2024, 4, '前期'),
(2, (SELECT department_id FROM Departments WHERE name = 'NM'), NOW(), NOW(), '拡張現実（AR）インターフェース設計', '直感的なユーザー体験を実現するARシステムの開発', 2024, 3, '後期'),
(3, (SELECT department_id FROM Departments WHERE name = 'NE'), NOW(), NOW(), 'エコフレンドリーネットワーク', 'エネルギー効率の高い通信インフラストラクチャの設計', 2024, 2, '前期'),
(4, (SELECT department_id FROM Departments WHERE name = 'RB'), NOW(), NOW(), 'ゲノム編集と再生医療', 'CRISPR技術を用いた遺伝子治療法の開発', 2024, 4, '後期'),
(5, (SELECT department_id FROM Departments WHERE name = 'RE'), NOW(), NOW(), '持続可能なエネルギーシステム', '再生可能エネルギーの統合と蓄電技術の革新', 2024, 3, '前期'),
(6, (SELECT department_id FROM Departments WHERE name = 'RD'), NOW(), NOW(), 'ビッグデータ解析と社会科学', '大規模データを用いた社会現象の定量的分析', 2024, 4, '後期'),
(7, (SELECT department_id FROM Departments WHERE name = 'RU'), NOW(), NOW(), 'スマートシティプランニング', 'IoTとAIを活用した都市設計と管理システムの構築', 2024, 3, '前期'),
(8, (SELECT department_id FROM Departments WHERE name = 'RM'), NOW(), NOW(), '先端複合材料工学', '高性能・軽量化を実現する新素材の開発と応用', 2024, 2, '後期'),
(9, (SELECT department_id FROM Departments WHERE name = 'RG'), NOW(), NOW(), 'AIゲームエージェント開発', '強化学習による高度なゲームAIの設計', 2024, 4, '前期'),
(10, (SELECT department_id FROM Departments WHERE name = 'AJ'), NOW(), NOW(), 'コンピュテーショナル言語学', '機械学習による言語構造と意味の分析', 2024, 3, '後期'),
(1, (SELECT department_id FROM Departments WHERE name = 'AD'), NOW(), NOW(), 'クラウドネイティブアーキテクチャ', 'マイクロサービスとコンテナ技術を用いたスケーラブルなシステム設計', 2024, 4, '前期'),
(2, (SELECT department_id FROM Departments WHERE name = 'FI'), NOW(), NOW(), 'AIトレーディングシステム', '機械学習を用いた金融市場分析と自動取引戦略', 2024, 3, '後期'),
(3, (SELECT department_id FROM Departments WHERE name = 'EK'), NOW(), NOW(), '次世代バッテリー技術', '高エネルギー密度と長寿命を実現する新型蓄電池の開発', 2024, 4, '前期'),
(4, (SELECT department_id FROM Departments WHERE name = 'EF'), NOW(), NOW(), '光量子通信', '量子暗号を用いた超安全な光通信システムの構築', 2024, 3, '後期'),
(5, (SELECT department_id FROM Departments WHERE name = 'ES'), NOW(), NOW(), 'ソフトロボティクスと生体工学', '柔軟な材料を用いた生体適合性の高いロボットの開発', 2024, 4, '前期'),
(6, (SELECT department_id FROM Departments WHERE name = 'EC'), NOW(), NOW(), '量子機械学習', '量子コンピュータを活用した機械学習アルゴリズムの研究', 2024, 3, '後期'),
(7, (SELECT department_id FROM Departments WHERE name = 'EJ'), NOW(), NOW(), 'マルチモーダルAI', '視覚・聴覚・触覚を統合した人工知能システムの開発', 2024, 4, '前期'),
(8, (SELECT department_id FROM Departments WHERE name = 'EH'), NOW(), NOW(), 'ニューラルインターフェース', '脳とコンピュータを直接接続する技術の研究と倫理的考察', 2024, 3, '後期'),
(9, (SELECT department_id FROM Departments WHERE name = 'FA'), NOW(), NOW(), '4Dプリンティング', '時間とともに形状が変化する材料と構造物の設計', 2024, 2, '前期'),
(10, (SELECT department_id FROM Departments WHERE name = 'FR'), NOW(), NOW(), 'バイオロボティクス', '生物の機能を模倣したロボットシステムの開発', 2024, 4, '後期'),
(1, (SELECT department_id FROM Departments WHERE name = 'AD'), NOW(), NOW(), '量子暗号化アルゴリズム', '量子コンピューティング時代のセキュアな通信プロトコル設計', 2024, 4, '前期'),
(2, (SELECT department_id FROM Departments WHERE name = 'FI'), NOW(), NOW(), 'デジタル通貨と国際金融', 'CBDCが世界経済に与える影響と課題の分析', 2024, 3, '後期'),
(3, (SELECT department_id FROM Departments WHERE name = 'EK'), NOW(), NOW(), '熱電変換材料工学', 'ナノ構造を用いた高効率熱電素子の開発', 2024, 4, '前期'),
(4, (SELECT department_id FROM Departments WHERE name = 'EF'), NOW(), NOW(), 'テラヘルツ波イメージング', '非破壊検査のための高分解能イメージング技術', 2024, 3, '後期'),
(5, (SELECT department_id FROM Departments WHERE name = 'ES'), NOW(), NOW(), 'バイオハイブリッドロボット', '生体組織と人工材料を融合したロボットシステム', 2024, 4, '前期'),
(6, (SELECT department_id FROM Departments WHERE name = 'EC'), NOW(), NOW(), 'ニューロモーフィックコンピューティング', '脳の構造を模倣した新しい計算アーキテクチャ', 2024, 3, '後期'),
(7, (SELECT department_id FROM Departments WHERE name = 'EJ'), NOW(), NOW(), '感情認識AI', '表情と音声から人間の感情を理解するシステム開発', 2024, 2, '前期'),
(8, (SELECT department_id FROM Departments WHERE name = 'EH'), NOW(), NOW(), '脳波制御インターフェース', '思考によるデバイス操作システムの設計と実装', 2024, 4, '後期'),
(9, (SELECT department_id FROM Departments WHERE name = 'FA'), NOW(), NOW(), 'メタマテリアル光学', '負の屈折率を持つ人工材料の設計と応用', 2024, 3, '前期'),
(10, (SELECT department_id FROM Departments WHERE name = 'FR'), NOW(), NOW(), 'スワームロボティクス', '群知能を用いた多数ロボットの協調制御', 2024, 4, '後期'),
(1, (SELECT department_id FROM Departments WHERE name = 'NC'), NOW(), NOW(), '量子ネットワークセキュリティ', '量子鍵配送を用いた次世代暗号通信システム', 2024, 3, '前期'),
(2, (SELECT department_id FROM Departments WHERE name = 'NM'), NOW(), NOW(), 'ホログラフィックディスプレイ', '空中映像投影技術の開発と応用', 2024, 2, '後期'),
(3, (SELECT department_id FROM Departments WHERE name = 'NE'), NOW(), NOW(), 'グリーンネットワーキング', 'エネルギー効率の高い通信プロトコルの設計', 2024, 4, '前期'),
(4, (SELECT department_id FROM Departments WHERE name = 'RB'), NOW(), NOW(), 'ナノバイオテクノロジー', '分子レベルでの生体機能制御技術の開発', 2024, 3, '後期'),
(5, (SELECT department_id FROM Departments WHERE name = 'RE'), NOW(), NOW(), '宇宙太陽光発電', '軌道上での太陽エネルギー収集と地上への伝送', 2024, 4, '前期'),
(6, (SELECT department_id FROM Departments WHERE name = 'RD'), NOW(), NOW(), '量子機械学習', '量子アルゴリズムを用いた機械学習の高速化', 2024, 3, '後期'),
(7, (SELECT department_id FROM Departments WHERE name = 'RU'), NOW(), NOW(), '自己修復インフラ', 'スマート材料を用いた自己修復型都市インフラの設計', 2024, 4, '前期'),
(8, (SELECT department_id FROM Departments WHERE name = 'RM'), NOW(), NOW(), '超伝導材料工学', '室温超伝導体の探索と応用可能性の研究', 2024, 3, '後期'),
(9, (SELECT department_id FROM Departments WHERE name = 'RG'), NOW(), NOW(), 'プロシージャル世界生成', 'AIを用いた動的ゲーム環境の自動生成', 2024, 2, '前期'),
(10, (SELECT department_id FROM Departments WHERE name = 'AJ'), NOW(), NOW(), '機械翻訳と文化適応', 'AIによる言語間の文化的ニュアンスの翻訳', 2024, 4, '後期'),
(1, (SELECT department_id FROM Departments WHERE name = 'AD'), NOW(), NOW(), 'エッジAIアーキテクチャ', 'IoTデバイスでの効率的な機械学習モデルの実装', 2024, 3, '前期'),
(2, (SELECT department_id FROM Departments WHERE name = 'FI'), NOW(), NOW(), 'クォンタムファイナンス', '量子コンピューティングによる金融リスク分析', 2024, 4, '後期'),
(3, (SELECT department_id FROM Departments WHERE name = 'EK'), NOW(), NOW(), 'プラズマ推進工学', '宇宙探査用の高効率イオンエンジンの開発', 2024, 3, '前期'),
(4, (SELECT department_id FROM Departments WHERE name = 'EF'), NOW(), NOW(), '光量子コンピューティング', '光子を用いた量子情報処理システムの構築', 2024, 4, '後期'),
(5, (SELECT department_id FROM Departments WHERE name = 'ES'), NOW(), NOW(), 'ナノロボット医療', '体内を巡回する微小ロボットによる診断と治療', 2024, 3, '前期'),
(6, (SELECT department_id FROM Departments WHERE name = 'EC'), NOW(), NOW(), 'DNA計算', 'DNAの分子構造を利用した並列計算手法', 2024, 4, '後期'),
(7, (SELECT department_id FROM Departments WHERE name = 'EJ'), NOW(), NOW(), '自然言語理解と常識推論', 'テキストからの文脈理解と推論を行うAI開発', 2024, 3, '前期'),
(8, (SELECT department_id FROM Departments WHERE name = 'EH'), NOW(), NOW(), '拡張知能インターフェース', '人間の認知能力を拡張するAIシステムの設計', 2024, 2, '後期'),
(9, (SELECT department_id FROM Departments WHERE name = 'FA'), NOW(), NOW(), 'バイオミメティック材料', '生物の特性を模倣した新機能材料の創製', 2024, 4, '前期'),
(10, (SELECT department_id FROM Departments WHERE name = 'FR'), NOW(), NOW(), '自己組織化ロボット', '環境に適応して形状を変化させるロボットの開発', 2024, 3, '後期'),
(1, (SELECT department_id FROM Departments WHERE name = 'AD'), NOW(), NOW(), '量子機械学習アルゴリズム', '量子コンピューティングを活用した新しい機械学習手法の開発', 2024, 4, '前期'),
(2, (SELECT department_id FROM Departments WHERE name = 'FI'), NOW(), NOW(), 'AIによる市場予測モデル', 'ディープラーニングを用いた高精度な金融市場予測システム', 2024, 3, '後期'),
(3, (SELECT department_id FROM Departments WHERE name = 'EK'), NOW(), NOW(), 'フレキシブル太陽電池', '曲げられる高効率太陽電池の設計と応用', 2024, 2, '前期'),
(4, (SELECT department_id FROM Departments WHERE name = 'EF'), NOW(), NOW(), 'ニューラルネットワーク通信', '人工神経網を模倣した新しい通信プロトコルの開発', 2024, 4, '後期'),
(5, (SELECT department_id FROM Departments WHERE name = 'ES'), NOW(), NOW(), 'バイオニック義肢制御', '脳信号による高度な義手・義足の制御システム', 2024, 3, '前期'),
(6, (SELECT department_id FROM Departments WHERE name = 'EC'), NOW(), NOW(), 'エッジAIプロセッサ設計', 'IoTデバイス向け低消費電力AI処理チップの開発', 2024, 4, '後期'),
(7, (SELECT department_id FROM Departments WHERE name = 'EJ'), NOW(), NOW(), '自然言語生成AI', 'コンテキストを理解し人間らしい文章を生成するAI', 2024, 3, '前期'),
(8, (SELECT department_id FROM Departments WHERE name = 'EH'), NOW(), NOW(), '脳波制御スマートホーム', '思考だけで家電を操作するシステムの実現', 2024, 2, '後期'),
(9, (SELECT department_id FROM Departments WHERE name = 'FA'), NOW(), NOW(), '自己修復材料工学', '傷を自動的に修復する新素材の開発と応用', 2024, 4, '前期'),
(10, (SELECT department_id FROM Departments WHERE name = 'FR'), NOW(), NOW(), 'マイクロ流体ロボット', '微小な液体環境で動作するロボットの設計', 2024, 3, '後期'),
(1, (SELECT department_id FROM Departments WHERE name = 'NC'), NOW(), NOW(), '量子暗号ネットワーク', '量子鍵配送を用いた超安全通信網の構築', 2024, 4, '前期'),
(2, (SELECT department_id FROM Departments WHERE name = 'NM'), NOW(), NOW(), '3D触覚ディスプレイ', '空中に触れる感覚を再現する新しいインターフェース', 2024, 3, '後期'),
(3, (SELECT department_id FROM Departments WHERE name = 'NE'), NOW(), NOW(), 'バイオハッキング防御', '生体認証システムへの攻撃対策技術', 2024, 2, '前期'),
(4, (SELECT department_id FROM Departments WHERE name = 'RB'), NOW(), NOW(), 'オルガノイドモデリング', 'ミニ臓器を用いた薬効評価システムの開発', 2024, 4, '後期'),
(5, (SELECT department_id FROM Departments WHERE name = 'RE'), NOW(), NOW(), '核融合炉材料工学', '極限環境に耐える核融合炉壁材料の研究', 2024, 3, '前期'),
(6, (SELECT department_id FROM Departments WHERE name = 'RD'), NOW(), NOW(), 'エクサスケールデータマイニング', '巨大データからの知識発見アルゴリズムの開発', 2024, 4, '後期'),
(7, (SELECT department_id FROM Departments WHERE name = 'RU'), NOW(), NOW(), 'バーチャル都市シミュレーション', 'デジタルツインを用いた都市計画最適化', 2024, 3, '前期'),
(8, (SELECT department_id FROM Departments WHERE name = 'RM'), NOW(), NOW(), 'プログラマブル物質', '外部信号で性質を変える新しい材料の創製', 2024, 2, '後期'),
(9, (SELECT department_id FROM Departments WHERE name = 'RG'), NOW(), NOW(), 'AIゲームマスター', 'プレイヤーに合わせて進化するゲームAIの開発', 2024, 4, '前期'),
(10, (SELECT department_id FROM Departments WHERE name = 'AJ'), NOW(), NOW(), '異文化AI通訳', '文化的背景を考慮した高度な機械翻訳システム', 2024, 3, '後期'),
(1, (SELECT department_id FROM Departments WHERE name = 'AD'), NOW(), NOW(), 'クォンタムクラウドコンピューティング', '量子コンピュータとクラウドの融合アーキテクチャ', 2024, 4, '前期'),
(2, (SELECT department_id FROM Departments WHERE name = 'FI'), NOW(), NOW(), 'ブロックチェーン基盤の金融システム', '分散型台帳技術を用いた次世代決済システム', 2024, 3, '後期'),
(3, (SELECT department_id FROM Departments WHERE name = 'EK'), NOW(), NOW(), 'スマートグリッドAI制御', '機械学習による電力需給の最適化と予測', 2024, 2, '前期'),
(4, (SELECT department_id FROM Departments WHERE name = 'EF'), NOW(), NOW(), '光ニューラルネットワーク', '光を用いた超高速ニューラルネットワークの実装', 2024, 4, '後期'),
(5, (SELECT department_id FROM Departments WHERE name = 'ES'), NOW(), NOW(), 'ナノスケールセンサーネットワーク', '体内を巡回する微小センサーシステムの開発', 2024, 3, '前期'),
(6, (SELECT department_id FROM Departments WHERE name = 'EC'), NOW(), NOW(), 'バイオコンピューティング', 'DNAの分子構造を利用した並列計算システム', 2024, 4, '後期'),
(7, (SELECT department_id FROM Departments WHERE name = 'EJ'), NOW(), NOW(), '感情理解AI', '人間の複雑な感情を理解し反応するAIの開発', 2024, 3, '前期'),
(8, (SELECT department_id FROM Departments WHERE name = 'EH'), NOW(), NOW(), '脳機能拡張インターフェース', '人間の認知能力を拡張するAI支援システム', 2024, 2, '後期'),
(9, (SELECT department_id FROM Departments WHERE name = 'FA'), NOW(), NOW(), '4Dバイオプリンティング', '時間変化する生体組織の3Dプリント技術', 2024, 4, '前期'),
(10, (SELECT department_id FROM Departments WHERE name = 'FR'), NOW(), NOW(), '群知能ロボット制御', '自律的に協調行動をとるロボット群の設計', 2024, 3, '後期'),
(1, (SELECT department_id FROM Departments WHERE name = 'AD'), NOW(), NOW(), 'エッジAIセキュリティ', 'IoTデバイスにおける機械学習モデルの保護と攻撃対策', 2024, 4, '前期'),
(2, (SELECT department_id FROM Departments WHERE name = 'FI'), NOW(), NOW(), '量子金融リスク分析', '量子コンピューティングを用いた金融リスクの高速評価', 2024, 3, '後期'),
(3, (SELECT department_id FROM Departments WHERE name = 'EK'), NOW(), NOW(), 'バイオ燃料電池', '微生物を利用した高効率エネルギー変換システム', 2024, 2, '前期'),
(4, (SELECT department_id FROM Departments WHERE name = 'EF'), NOW(), NOW(), '空間光変調通信', '光の空間的性質を利用した高速データ伝送技術', 2024, 4, '後期'),
(5, (SELECT department_id FROM Departments WHERE name = 'ES'), NOW(), NOW(), 'ソフトロボティクス制御', '柔軟な構造を持つロボットの適応的制御手法', 2024, 3, '前期'),
(6, (SELECT department_id FROM Departments WHERE name = 'EC'), NOW(), NOW(), '非ノイマン型アーキテクチャ', '従来のコンピュータ構造を超えた新しい計算パラダイム', 2024, 4, '後期'),
(7, (SELECT department_id FROM Departments WHERE name = 'EJ'), NOW(), NOW(), 'マルチモーダル感情AI', '表情、音声、生体信号を統合した感情理解システム', 2024, 3, '前期'),
(8, (SELECT department_id FROM Departments WHERE name = 'EH'), NOW(), NOW(), 'ニューロフィードバックトレーニング', '脳波を用いた認知機能強化システムの開発', 2024, 2, '後期'),
(9, (SELECT department_id FROM Departments WHERE name = 'FA'), NOW(), NOW(), 'メタマテリアル音響工学', '音波の異常な伝播を実現する人工構造体の設計', 2024, 4, '前期'),
(10, (SELECT department_id FROM Departments WHERE name = 'FR'), NOW(), NOW(), 'バイオインスパイアードロボット', '生物の運動メカニズムを模倣したロボット設計', 2024, 3, '後期'),
(1, (SELECT department_id FROM Departments WHERE name = 'NC'), NOW(), NOW(), 'ポスト量子暗号', '量子コンピュータ時代に対応する新しい暗号方式', 2024, 4, '前期'),
(2, (SELECT department_id FROM Departments WHERE name = 'NM'), NOW(), NOW(), '脳型メモリシステム', 'シナプスの可塑性を模倣した新しいメモリアーキテクチャ', 2024, 3, '後期'),
(3, (SELECT department_id FROM Departments WHERE name = 'NE'), NOW(), NOW(), 'サイバー物理セキュリティ', 'IoTシステムにおける物理層からの攻撃対策', 2024, 2, '前期'),
(4, (SELECT department_id FROM Departments WHERE name = 'RB'), NOW(), NOW(), 'シンセティックバイオロジー', 'デザイナー生物の創造と応用可能性の探究', 2024, 4, '後期'),
(5, (SELECT department_id FROM Departments WHERE name = 'RE'), NOW(), NOW(), 'スマートグリッド最適化', 'AIを用いた電力需給バランスの動的制御', 2024, 3, '前期'),
(6, (SELECT department_id FROM Departments WHERE name = 'RD'), NOW(), NOW(), '量子機械学習アルゴリズム', '量子コンピュータ上で動作する機械学習手法の開発', 2024, 4, '後期'),
(7, (SELECT department_id FROM Departments WHERE name = 'RU'), NOW(), NOW(), 'レジリエント都市設計', 'AIを活用した災害に強いスマートシティの計画', 2024, 3, '前期'),
(8, (SELECT department_id FROM Departments WHERE name = 'RM'), NOW(), NOW(), '4Dプリンティング材料', '時間とともに形状が変化する新しい材料の開発', 2024, 2, '後期'),
(9, (SELECT department_id FROM Departments WHERE name = 'RG'), NOW(), NOW(), 'AIストーリーテリング', '対話型物語生成AIシステムの構築', 2024, 4, '前期'),
(10, (SELECT department_id FROM Departments WHERE name = 'AJ'), NOW(), NOW(), 'クロスリンガルセマンティクス', '多言語間の意味構造を理解するAIモデルの開発', 2024, 3, '後期'),
(1, (SELECT department_id FROM Departments WHERE name = 'AD'), NOW(), NOW(), 'クォンタムクラウドセキュリティ', '量子コンピューティング環境でのデータ保護技術', 2024, 4, '前期'),
(2, (SELECT department_id FROM Departments WHERE name = 'FI'), NOW(), NOW(), 'AIトレーディングエシックス', '自動取引システムにおける倫理的意思決定モデル', 2024, 3, '後期'),
(3, (SELECT department_id FROM Departments WHERE name = 'EK'), NOW(), NOW(), 'ワイヤレス電力伝送網', '都市規模での無線電力供給システムの設計', 2024, 2, '前期'),
(4, (SELECT department_id FROM Departments WHERE name = 'EF'), NOW(), NOW(), 'テラヘルツ通信システム', '超高周波帯を利用した大容量データ伝送技術', 2024, 4, '後期'),
(5, (SELECT department_id FROM Departments WHERE name = 'ES'), NOW(), NOW(), 'ニューロモーフィックセンサー', '脳の情報処理を模倣したセンシングデバイス', 2024, 3, '前期'),
(6, (SELECT department_id FROM Departments WHERE name = 'EC'), NOW(), NOW(), 'トポロジカル量子計算', 'トポロジカル相を用いた耐ノイズ量子ビットの実装', 2024, 4, '後期'),
(7, (SELECT department_id FROM Departments WHERE name = 'EJ'), NOW(), NOW(), '言語モデル倫理学', '大規模言語モデルにおけるバイアスと公平性の研究', 2024, 3, '前期'),
(8, (SELECT department_id FROM Departments WHERE name = 'EH'), NOW(), NOW(), '脳コンピュータ融合インターフェース', '思考による直接的な情報入出力システムの開発', 2024, 2, '後期'),
(9, (SELECT department_id FROM Departments WHERE name = 'FA'), NOW(), NOW(), 'プログラマブルナノマテリアル', '外部信号で特性を制御できる ナノスケール材料の創製', 2024, 4, '前期'),
(10, (SELECT department_id FROM Departments WHERE name = 'FR'), NOW(), NOW(), '自己進化型AIロボット', '経験から自律的に学習・進化するロボットシステム', 2024, 3, '後期');


-- shared_urlsテーブルに対応するエントリを追加（各投稿に最大4つのURL）
INSERT INTO shared_urls (post_id, link, created_at, updated_at)
SELECT 
    p.post_id,
    CASE 
        WHEN urls.url_num = 1 THEN 'https://portfolio-atsushi.vercel.app/'
        WHEN urls.url_num = 2 THEN 'https://portfolio-atsushi.vercel.app/blog/bl5wdq_7qew'
        WHEN urls.url_num = 3 THEN 'https://portfolio-atsushi.vercel.app/blog/xmgjdgi4ayi3'
        WHEN urls.url_num = 4 THEN 'https://portfolio-atsushi.vercel.app/work/yt8fw1xyag8f'
    END,
    NOW(),
    NOW()
FROM Posts p
CROSS JOIN (
    SELECT 1 AS url_num UNION ALL
    SELECT 2 UNION ALL
    SELECT 3 UNION ALL
    SELECT 4
) urls
WHERE p.post_id > (SELECT COALESCE(MAX(post_id), 0) FROM shared_urls)
  AND urls.url_num <= (p.post_id % 4) + 1;  -- This ensures each post gets 1 to 4 URLs

-- Bookmarksテーブルに対応するエントリを追加
INSERT INTO Bookmarks (post_id, user_id, created_at)
SELECT 
    p.post_id,
    ((p.post_id - 1) % 10) + 1,  -- これにより、user_idが1から10の間で循環します
    NOW()
FROM Posts p
WHERE p.post_id > (SELECT COALESCE(MAX(post_id), 0) FROM Bookmarks);



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