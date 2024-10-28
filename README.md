最初にすること
cd frontend
npm i

docker起動
構築から
docker-compose up --build

バックグラウンド起動
docker-compose up -d

docker停止
docker-compose down
#volumesも削除したいとき
docker-compose down --volumes
docker-compose up -d
or

springboot　jar作成
cd ./backend
mvnw clean package

dockerから直接データベースいじるとき。
docker exec -it postgres-db psql -U kaihatsurta -d dendaiTech