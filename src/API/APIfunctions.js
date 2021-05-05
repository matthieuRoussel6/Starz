// Ma clé et mon nom de domaine pour cette API :
const cléAPI = 'c8am80Xxy0fDxx7syLU0bZEfjU1hVk24fcaBne7q';
const nomDeDomaine = "https://api.nasa.gov/neo/rest/v1/";

//trouver au moyen du feed les astres entre deux dates
export function getAsteroideFromApi(date_deb, date_fin) {
  var url = nomDeDomaine + "feed?start_date=" + date_deb +"&end_date=" + date_fin + "&detailed=true&api_key=" + cléAPI;
  return fetch(url)
    .then((response) => (response.json()))
    .catch((error) => console.log(error))
};

// Lorsque la plage de date dépasse les 7 jours on va faire la demande sans dateFin pour n'obtenir que les 7 prochains jours
export function getAsteroideFromApiOneDate(date_deb) {
  var url = nomDeDomaine + "feed?start_date=" + date_deb +"&detailed=true&api_key=" + cléAPI;
  return fetch(url)
    .then((response) => (response.json()))
    .catch((error) => console.log(error))
};

// On exploite les liens donnés par l'API de 'next' et 'prev'
export function getNewPage(link) {
  var url = link.replace("DEMO_KEY", cléAPI);
  return fetch(url)
    .then((response) => (response.json()))
    .catch((error) => console.log(error))
};

// Recupération simple des détails de l'astre
export function getAsteroideDetail(idAsteroid) {
  var url = nomDeDomaine + "neo/" + idAsteroid +"?api_key=" + cléAPI;
  return fetch(url)
    .then((response) => (response.json()))
    .catch((error) => console.log(error))
};
