# ベースイメージ
FROM openjdk:17-jdk-slim

# 作業ディレクトリの作成
WORKDIR /app

# Spring Boot の JAR ファイルをコピー
COPY target/backend-0.0.1-SNAPSHOT.jar .

# アプリケーションを実行
CMD ["java", "-jar", "backend-0.0.1-SNAPSHOT.jar"]
