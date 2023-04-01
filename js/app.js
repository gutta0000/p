window.addEventListener('load', async () => {
	if ('geolocation' in navigator) {
	  navigator.geolocation.getCurrentPosition(
		async (position) => {
		  const { coords: { latitude, longitude } } = position;
		  const url = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:50,${latitude},${longitude})[shop];out tags;`;
		  try {
			const response = await fetch(url);
			const data = await response.json();
			if (data.elements.length > 0) {
			  const storeName = data.elements[0].tags.name || 'Unknown';
			  const storeNameElem = document.getElementById('store-name');
			  storeNameElem.innerText = storeName;
			} else {
			  console.error('No shops found in the area');
			}
		  } catch (error) {
			console.error(error);
		  }
		},
		(error) => {
		  console.error(error);
		}
	  );
	} else {
	  console.error('Geolocation is not supported');
	}
  });
  