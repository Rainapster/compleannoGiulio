# Deployment

Questo repository è pronto per il deploy gratuito di:
- frontend su Netlify
- backend su Railway (o Render)

## Backend gratuito su Railway

1. Vai su https://railway.app e crea un account.
2. Crea un nuovo progetto.
3. Collegalo al repository GitHub `Rainapster/compleannoGiulio`.
4. Usa la cartella `backend` come root del servizio.
5. In Railway, imposta il comando di build / deploy su:
   - `npm install`
   - `npm start`
6. Aggiungi la variabile d'ambiente:
   - `MONGO_URI` = la tua stringa di connessione MongoDB Atlas
7. Avvia il deploy.
8. Dopo il deploy, Railway ti darà un URL del backend.

## Frontend gratuito su Netlify

1. Vai su https://app.netlify.com e crea un account.
2. Crea un nuovo sito collegandolo al repository GitHub `Rainapster/compleannoGiulio`.
3. Configura i parametri del deploy:
   - `Base directory` = `giulio`
   - `Build command` = `npm install && npm run build`
   - `Publish directory` = `dist`
4. Aggiungi la variabile d'ambiente Netlify:
   - `VITE_API_URL` = l'URL del backend Railway (es. `https://my-backend.railway.app`)
5. Avvia il deploy.

## Variabili locali

- `backend/.env.example` contiene l'esempio per `MONGO_URI`
- `giulio/.env.example` contiene l'esempio per `VITE_API_URL`

> Non aggiungere al repository la tua password o il tuo URI reale. Usa una `backend/.env` locale ignorata da Git.
