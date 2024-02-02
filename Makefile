deploy:
	git checkout dev
	git pull origin dev
	git checkout main
	git pull origin main
	git merge dev
	git push origin main
	git checkout dev