#! /bin/sh

python3 manage.py runserver &
cd frontend/ && npm start