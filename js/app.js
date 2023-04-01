const appId = 'dj00aiZpPThtVTNlWlF5aFdNNCZzPWNvbnN1bWVyc2VjcmV0Jng9MzU-';
const apiUrl = 'https://map.yahooapis.jp/search/local/V1/localSearch';

// 現在地の緯度経度を取得する
navigator.geolocation.getCurrentPosition(function(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // Yahoo!地図APIにリクエストを送信する
  const requestUrl = apiUrl + '?appid=' + appId + '&lat=' + latitude + '&lon=' + longitude + '&sort=dist';
  fetch(requestUrl)
    .then(response => response.text())
    .then(data => {
      // レスポンスから一番近いお店の名前を取得する
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, 'text/xml');
      const firstResult = xmlDoc.getElementsByTagName('Result')[0];
      const name = firstResult.getElementsByTagName('Name')[0].childNodes[0].nodeValue;
      console.log('一番近いお店の名前は ' + name + ' です。');
    })
    .catch(error => console.log(error));
});
