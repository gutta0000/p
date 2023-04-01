window.addEventListener('load', async () => {
	if ('geolocation' in navigator) {
	  try {
		const { coords: { latitude, longitude } } = await navigator.geolocation.getCurrentPosition();
		const url = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:50,${latitude},${longitude})[shop];out tags;`
		const response = await fetch(url);
		const data = await response.json();
		const storeName = data.elements[0].tags.name || 'Unknown';
		const storeNameElem = document.getElementById('store-name');
		storeNameElem.innerText = storeName;
	  } catch (error) {
		console.error(error);
	  }
	} else {
	  console.error('Geolocation is not supported');
	}
  });
  