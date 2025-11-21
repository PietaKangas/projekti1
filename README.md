**Reseptisovellus**

Kuvaus:
Reseptisovellus on full-stack verkkosovellus, jossa on mahdollista selata, lisätä ja poistaa reseptejä.

Käyttäjä pystyy selamaan sivulla olevia reseptejä, järjestämään niitä kategorioittain sekä hakemaan yksittäisiä
reseptejä hakutoiminnolla. Lisäksi käyttäjä pystyy tarkastelemaan yksittäisten reseptien tietoja. 

Reksiteröitynyt käyttäjä pystyy kirjautumaan sisään ja ulos, lisätä ja poistaa omia reseptejä sekä tykätä haluamistaan
resepteistään. Itse lisätyt ja tykätyt reseptit näkyvät käyttäjän omalla profiilisivulla listana. Lisäksi käyttäjä voi
halutessaan poistaa itse lisäämiään reseptejä ja oman tilinsä.

Ota yhteyttä -sivun kautta voi ottaa yhteyttä verkkosovelluksen ylläpitäjään. Tätä toimintoa ei kuitenkaan ole vielä toteutettu valmiiksi.

Teknologiat:
- kieli: JavaScript
- frontend: React, React Router, Tailwind CSS, Bootstrap, Cloudinary
- backend: Node.js, Express, MongoDB Atlas (Mongoose)
- autentikaatio: JSON Web Token, bcrypt
- RESTful API pyynnöt: Axios

Toiminnallisuudet/ominaisuudet:
- Ei rekisteröitynyt käyttäjä:
    - Selaa ja tarkastele reseptejä
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

Nettisivut eivät ole vielä täysin valmiit. 
Muutoksia toiminnallisuuksiin ja visuaalisuuteen voi tulla tulevaisuudessa.
