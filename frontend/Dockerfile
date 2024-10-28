# ベースイメージ
FROM node:18-alpine

# 作業ディレクトリの作成
WORKDIR /app

# 依存関係のインストール
COPY package.json package-lock.json ./
RUN npm install

# Next.js アプリケーションのコピー
COPY . .

# アプリケーションのビルド
RUN npm run build

# Next.js サーバーを起動
CMD ["npm", "start"]
