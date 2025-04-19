📘 Time Line App

De Time Line App is een React-webapplicatie waarmee gebruikers zich kunnen registreren, inloggen, berichten kunnen plaatsen, en reacties kunnen toevoegen. De authenticatie gebeurt volledig op de frontend (via localStorage), maar berichten en reacties worden opgeslagen in een backend via een API.

🚀 Functionaliteiten


🔐 Registratie & Inloggen (Frontend-only)
Gebruikers kunnen zich registreren en inloggen. De gebruikersgegevens en inlogstatus worden opgeslagen in localStorage.


📝 Berichten Toevoegen (met backend)
Ingelogde gebruikers kunnen berichten aanmaken die via een API worden opgeslagen in de backend (MongoDB via Express).


💬 Reacties Toevoegen (met backend)
Gebruikers kunnen reacties toevoegen aan berichten, die ook via de API worden opgeslagen.


💾 Data Persistentie

Gebruikersdata: localStorage

Berichten en reacties: opgeslagen in de backend-database


🛠️ Technologieën
Frontend: React

State Management: React useState + useEffect

Authenticatie: Alleen frontend via localStorage

Backend: Node.js met Express

Database: MongoDB via Mongoose

📄 Opmerkingen
Registratie en inloggen worden niet gevalideerd via de backend (dus geen echte tokens of sessies).

De backend handelt wel de opslag van berichten en reacties af via RESTful API-routes.
