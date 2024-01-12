db:
	docker compose up -d

stop:
	docker stop furpic-dev-db

kill:
	docker kill furpic-dev-db

db-access:
	docker exec -it furpic-dev-db psql -U postgres -d furpic