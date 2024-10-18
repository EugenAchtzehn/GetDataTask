# About this Program
---
This is a program to fetch weather open data from the Central Weather Administration of Taiwan. The tech stack is based on Node.js.
I chose the Axios package to fetch data. For communicating with the database, I used the ORM tool, Sequelize, which will be more convenient when you want to switch the database.
For people who are familiar with Node.js, you just have to download this program, create a .env file with the API key (AUTH_CODE) that CWA provides you, and set up the Postgres connection info.
You can run this program using a terminal/CLI with `node main.js` and get the information into your database for advanced analysis.
