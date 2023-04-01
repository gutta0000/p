window.addEventListener('load', () => {
	if ('geolocation' in navigator) {
	  navigator.geolocation.getCurrentPosition(async (position) => {
		const { latitude, longitude } = position.coords;
		const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
		const data = await response.json();
		const storeName = data.address.poi || data.address.shop || data.address.amenity || data.address.name || data.address.building || data.address.house_number || 'Unknown';
		const storeNameElem = document.getElementById('store-name');
		storeNameElem.innerText = storeName;
	  }, (error) => {
		console.error(error);
	  });
	} else {
	  console.error('Geolocation is not supported');
	}
  });
  