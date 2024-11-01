# プロジェクトセットアップガイド

このガイドでは、プロジェクトのセットアップ手順と主要な操作方法について説明します。

## 目次

- [次やること](#次やること)
- [フロントエンド設定](#フロントエンド設定)
- [Docker操作](#docker操作)
- [バックエンド設定](#バックエンド設定)
- [データベース操作](#データベース操作)

## 次やること

各POST(投稿作成、ブックマーク押下)に対する確認
ユーザー登録の設定

## フロントエンド設定

フロントエンドの依存関係をインストールするには、以下のコマンドを実行します：

```bash
cd frontend
npm install
```

## Docker操作

### ビルドと起動

Dockerコンテナをビルドして起動するには：

```bash
docker-compose up --build
```

### バックグラウンド起動

コンテナをバックグラウンドで起動するには：

```bash
docker-compose up -d
```

### Docker停止

実行中のコンテナを停止するには：

```bash
docker-compose down
```

### ボリュームを含めた完全な停止と再起動

データボリュームも含めてコンテナを完全に停止し、再起動するには：

```bash
docker-compose down --volumes
docker-compose up -d
```

## バックエンド設定

SpringbootのJARファイルを作成するには：

```bash
cd ./backend
./mvn clean package
```

## データベース操作

PostgreSQLデータベースに直接接続するには：

```bash
docker exec -it postgres-db psql -U kaihatsurta -d dendaiTech
```

このコマンドは、`postgres-db`コンテナ内のPostgreSQLに接続し、ユーザー`kaihatsurta`として`dendaiTech`データベースにアクセスします。

---

注意：このREADMEは基本的なセットアップ手順を提供しています。詳細な設定や追加の操作については、プロジェクトの詳細なドキュメントを参照してください。
```