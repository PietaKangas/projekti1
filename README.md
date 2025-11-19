**Reseptisovellus**

Kuvaus:
Reseptisovellus on full-stack nettisivu, jossa on mahdollista selata, lisätä ja poistaa reseptejä.

Nettisivuilla käyttäjä pystyy selamaan sivulla olevia reseptejä, järjestämään niitä kategorioittain sekä hakemaan yksittäisiä
reseptejä hakutoiminnolla. Lisäksi käyttäjä pystyy tarkastelemaan yksittäisten reseptien tietoja. 

Reksiteröitynyt käyttäjä pystyy kirjautumaan sisään ja ulos, lisätä ja poistaa omia reseptejä sekä tykätä haluamistaan
resepteistään. Itse lisätyt ja tykätyt reseptit näkyvät reksiteröitynen käyttäjän profiilisivulla listana. Lisäksi käyttäjä voi
halutessaan voi poistaa itse lisäämiään reseptejä ja oman tilinsä.

Kontaktisivun kautta voi ottaa yhteyttä nettisivujen ylläpitäjään. Tätä toimintoa ei kuitenkaan ole vielä toteutettu valmiiksi.

Teknologiat:
- kieli: JavaScript
- frontend: React, React Router, Tailwind CSS, Bootstrap, Cloudinary
- backend: Node.js, Express, MongoDB Atlas (Mongoose)
- autentikaatio: JSON Web Token
- RESTful API Requests: Axios

Toiminnallisuudet/ominaisuudet:
- Ei rekisteröitynyt käyttäjä:
    - Selaa reseptejä
    - Hae ja suodata reseptejä
- Rekisteröitynyt käyttäjä:
  - Kirjaudu sisään ja ulos käyttäjätunnuksella ja salasanalla
  - Lisää ja poista omia reseptejä
  - Tykkää resepteistä
  - Poista oma tili
- Ota yhteyttä ylläpitoon yhteydenottolomakkeen kautta
- Ilmoitukset:
  - Viesti näkyy, kun toiminto on suoritettu onnistuneesti tai toiminnossa tapahtuu virhe

Kuvat:
- logo ja tausta on tehty canvalla, reseptien kuvat ovat otettu kuvapankista: https://www.pexels.com/fi-fi/

Linkki nettisivuille: https://projekti1-e6ds.onrender.com/recent

Nettisivut eivät ole vielä täysin valmiut. 
Muutoksia toiminnallisuuksiin ja visuaalisuuteen voi tulla tulevaisuudessa.
