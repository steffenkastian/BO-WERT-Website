const mapEl = document.getElementById('locations-map');

if (mapEl && window.L) {
  L.Icon.Default.imagePath = 'assets/leaflet/images/';

  const locations = [
    { name: 'Im Dreieck 4–6', address: '23758 Oldenburg in Holstein', lat: 54.27317, lng: 10.88605 },
    { name: 'Sebenter Weg 31', address: '23758 Oldenburg in Holstein', lat: 54.27869, lng: 10.88476 },
    { name: 'Dazendorfer Weg 50', address: '23774 Heiligenhafen', lat: 54.36544, lng: 10.94826 },
  ];

  const map = L.map(mapEl, { scrollWheelZoom: false });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>-Mitwirkende',
  }).addTo(map);

  const markers = locations.map((loc) =>
    L.marker([loc.lat, loc.lng])
      .addTo(map)
      .bindPopup('<strong>' + loc.name + '</strong><br>' + loc.address)
  );

  map.fitBounds(L.featureGroup(markers).getBounds(), { padding: [36, 36] });
}
