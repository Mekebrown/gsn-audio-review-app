/* 
id (number)
tag (string) - uuid
username (email)
password (string) - bcrypt
role (enum: admin, user, testadmin, testuser)
ip (array)
headers (array)
last_login (date)
last_logout (date)
login_count (number)
disclaimer (boolean)
notes (array)
media (array)
settings (object) - Future: Light/dark mode
created (date)
deleted (date)

user -> notes one to many
user -> media one to many


Note: Notifications to be calculated from notes and media dates
*/