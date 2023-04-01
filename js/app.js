window.addEventListener('load', () => {
	if ('geolocation' in navigator) {
	  navigator.geolocation.getCurrentPosition(async (position) => {
		const { latitude, longitude } = position.coords;
		const response = await fetch(`https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&radius=500&sort_by=distance`, {
		  headers: {
			Authorization: 'Bearer 6y_Q8qP-ct_RoL98Plgpz5EPef3UryOuLxG-PNT4Uv2XcaJO38q8XStqbglMoQHDE85jS-DHMvOakllEEQNefXiJa2JXESpKivO_s1Mvm0U8cQ5EMfcWETIePscnZHYx'
		  }
		});
		const data = await response.json();
		if (data.businesses.length > 0) {
		  const storeName = data.businesses[0].name;
		  const storeNameElem = document.getElementById('store-name');
		  storeNameElem.innerText = storeName;
		} else {
		  console.log('No nearby stores found');
		}
	  }, (error) => {
		console.error(error);
	  });
	} else {
	  console.error('Geolocation is not supported');
	}
  });
  