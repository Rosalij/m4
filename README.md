# Applikation för Moment 4 

Detta repository innehåller kod för ett enklare REST API byggt med Express. APIet är byggt för att hantera en enklare webbplats för att skapa inlägg, till exempel en gästbok där inloggning krävs för att skriva i gästboken. API:et använder auktorisering med jsonwebtoken för att komma åt skyddade router vid inloggning, jsonwebtoken lagrar även username i payload.
token kan sedan sparas i frontend-applikation för autentisering.
Grundläggande funktionalitet för CRUD (Create, Read, Update, Delete) är implementerad.

## Länk
En liveversion av APIet finns tillgänglig på följande URL:(https://m4-jwlg.onrender.com/api)

## Installation, databas
APIet använder en MongoDB-databas.
Klona ner källkodsfilerna, kör kommando npm install för att installera nödvändiga npm-paket. 
MongoDB scheman för databasstruktur finns i /models.
Databasen bör ha följande fält:
|Tabell-namn|Fält  |
|--|--|
|user  | _id: (autoincrement), username: string, password: string(hashed), created: date|
|post | _id (autoincrement), author: string, textinput: string, created: date  |

## Användning
Nedan finns beskrivet hur man nå APIet på olika vis:

|Metod  |Ändpunkt     |Beskrivning                                                                           |
|-------|-------------|--------------------------------------------------------------------------------------|
|GET    |/api/users     |Hämtar alla registrerade användare.                                                  |
|GET    |/api          |Hämtar alla postade inlägg.                                                           |
|POST   |/api/newpost  |Lagrar ett nytt inlägg. kräver giltig jsonwebtoken för auktorisering.                 |
|POST   |api/login     |loggar in användare om den finns i databasen, lagrar jsonwebtoken|
|POST   |/api/register |lagrar en ny användare till databasen vid giltig input                                |
