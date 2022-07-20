TEST APP

- calculating fibonacci number by index
- getting fibonacci number by index

URL http://localhost:3040

POST /input
request body {number: [index of fibonacci you want to save]}
response {ticket: [key of your fibonacci]}

GET /output/:[ticket]
response {fibonacci: [ your fibonacci]} or " not found"

to start app clone repository and run command 'docker compose up -d'
