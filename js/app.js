const appId = 'fz_ifOexg668ec3stQVTAJCA9OfmHXsc7OQvcQlSllR1OcD2WowgZUTI7PC.eNw-'; // アプリケーションIDを入力してください
const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${appId}`
  },
  mode: 'cors',
  credentials: 'include'
};

window.addEventListener('load', async () => {
  if ('geolocation' in navigator) {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const { latitude, longitude } = position.coords;
      const url = `https://map.yahooapis.jp/search/local/V1/geoCoder?lat=${latitude}&lon=${longitude}&output=json&sort=geo&results=1&detail=simple&appid=${appId}`;
      const response = await fetch(url, options);
      const data = await response.json();
      if (data.ResultInfo.Count > 0) {
        const storeName = data.Feature[0].Name;
        const storeNameElem = document.getElementById('store-name');
        storeNameElem.innerText = storeName;
      } else {
        console.log('近くの店舗が見つかりませんでした。');
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    console.error('このブラウザではジオロケーションがサポートされていません。');
  }
});
