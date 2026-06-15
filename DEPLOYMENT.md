# Deployment

Questo repository contiene solo il frontend React in `giulio`.
Puoi pubblicarlo gratuitamente su Netlify.

## Frontend gratuito su Netlify

1. Vai su https://app.netlify.com e crea un account.
2. Crea un nuovo sito collegandolo al repository GitHub `Rainapster/compleannoGiulio`.
3. Configura i parametri del deploy:
   - `Base directory` = `giulio`
   - `Build command` = `npm install && npm run build`
   - `Publish directory` = `dist`
4. Avvia il deploy.

## Variabili locali

- Non sono richieste variabili di ambiente per il deploy frontend.
> Il repository ora è standalone e non richiede un backend separato.
