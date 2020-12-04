mkdocs build

git add .
git commit
git push

cd site
git add .
git commit -m "Updated doc site"
git push
cd ..
