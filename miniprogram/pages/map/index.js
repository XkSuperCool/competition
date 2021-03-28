Page({
  data: {
    lat: '',
    lng: '',
    markers: [],
  },
  onLoad: function(options) {
    this.setData({
      lat: options.lat,
      lng: options.lng,
      markers: [{
        id: 1,
        latitude: options.lat,
        longitude: options.lng,
        iconPath: '../../assets/images/location.png',
        width: 44,
        height: 44,
      }]
    });
  },
})