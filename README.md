# drawing_app

Questa è un'applicazione web che permette agli utenti di disegnare su un canvas, caricare immagini, e salvarle in una repository personale. L'app utilizza HTML, CSS, JavaScript e PHP per la parte backend, e salva le immagini nel database in formato Base64 per una gestione più semplice.

## Struttura del progetto

### 1. `index.php`

La pagina principale del progetto, dove gli utenti possono effettuare il login o la registrazione.

- **Funzionalità**:
  - Se l'utente non è autenticato, vengono visualizzati i form di login e registrazione.
  - Se l'utente è già loggato, viene automaticamente reindirizzato alla pagina di disegno (`draw_app.php`).

### 2. `draw_app.php`

Questa è la pagina principale dell'app di disegno. Una volta che l'utente è autenticato, può accedere a questa pagina per disegnare sul canvas e interagire con le immagini salvate nel suo repository.

- **Funzionalità**:
  - Canvas per disegnare liberamente.
  - Opzioni per scegliere il colore, la dimensione del pennello e altre funzionalità di disegno.
  - Caricamento di immagini per modificarle o aggiungerle come sfondo.
  - Salvataggio delle immagini nel database.

### 3. `styles/style.css`

Il foglio di stile principale per la parte frontend. Qui vengono gestiti tutti gli stili CSS per il layout e il design dell'app.

- **Contenuto**:
  - Stili per la pagina di login, il canvas di disegno e le altre interfacce utente.

### 4. `scripts/app.js`

Contiene la logica JavaScript per la gestione del disegno sul canvas.

- **Funzionalità**:
  - Gestione degli eventi di disegno (click, drag, ecc.).
  - Funzioni per cambiare il colore e la dimensione del pennello.
  - Funzione per esportare il disegno come immagine in formato Base64.

### 5. `scripts/form.js`

Gestisce il comportamento dei moduli di login e registrazione.

- **Funzionalità**:
  - Gestisce la validazione del form e invia i dati al server tramite AJAX per il login e la registrazione.

### 6. `scripts/fetch.js`

Contiene le funzioni per interagire con il backend utilizzando AJAX o Fetch API.

- **Funzionalità**:
  - Recupera le immagini salvate dall'utente.
  - Invia il disegno salvato (in formato Base64) al server per il salvataggio nel database.

### 7. `server/db.php`

Gestisce la connessione al database MySQL.

- **Funzionalità**:
  - Crea la connessione con il database per tutte le operazioni di lettura e scrittura.

### 8. `server/auth.php`

Gestisce la logica di autenticazione per il login e la registrazione degli utenti.

- **Funzionalità**:
  - Registra un nuovo utente nel database con un username e una password criptata.
  - Verifica le credenziali durante il login e avvia una sessione per l'utente autenticato.

### 9. `server/upload.php`

Gestisce il salvataggio delle immagini nel database.

- **Funzionalità**:
  - Converte l'immagine del canvas in formato Base64.
  - La stringa Base64 viene compressa per ottimizzare lo spazio nel database.
  - L'immagine compressa viene salvata nel database, associata all'utente loggato.

- **Come salviamo le immagini**:
  - Il disegno sul canvas viene convertito in una stringa Base64 usando il metodo `canvas.toDataURL()`.
  - La stringa Base64 viene compressa utilizzando algoritmi come GZIP o un'altra libreria di compressione lato server (ad esempio, `gzcompress()` in PHP) per ridurre le dimensioni.
  - La stringa compressa viene quindi salvata nel database associata all'utente tramite il suo ID.

### 10. `server/fetch_images.php`

Recupera le immagini salvate dall'utente nel database.

- **Funzionalità**:
  - Recupera le immagini salvate nel database e le restituisce in formato JSON al frontend per la visualizzazione nella galleria dell'utente.

### 11. `server/logout.php`

Gestisce la disconnessione dell'utente, terminando la sessione.

- **Funzionalità**:
  - Distrugge la sessione utente e reindirizza l'utente alla pagina di login.

### 12. `database/schema.sql`

Contiene lo schema del database, con le tabelle necessarie per gli utenti e le immagini.

- **Tabelle**:
  - **`utenti`**: Memorizza le informazioni degli utenti (ID, username, password).
  - **`immagini`**: Memorizza le immagini salvate dagli utenti (ID immagine, ID utente, dati Base64 dell'immagine, timestamp).