const jwt = require('jsonwebtoken');
const Trip = require('../models/tripModel');
const axios = require('axios');
const Station = require('../models/stationModel');
const Buses = require('../models/Buses');
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyBzU_tI_Y8m8KzwJP-wZcNqTTPogYtg2x4',
    Promise: Promise
  });



// GET
const getWeather = async (req,res,next) => {
    try{
        const response = await axios.get(
            `https://servis.mgm.gov.tr/web/sondurumlar?merkezid=97801`,
            {
              headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json, text/plain, */*",
                "Origin": "https://www.mgm.gov.tr",
                "Referer": "https://www.mgm.gov.tr",
                "Accept": "*"
                // İsteğe başka header'ları da ekleyebilirsiniz
              },
            }
          );
          res.json({sicaklik: response.data[0].sicaklik});
    }
    catch (err){
        console.log(err)
    }
}
const homeShow = async (req, res, next) => {
    try {

        res.render('user/homePage', { layout: '../layouts/mainSecond_Layout', title: `IG Priv`, description: ``, keywords: `` })


    } catch (err) {
        console.log(err);
    }
};

const loginPageShow = async (req, res, next) => {

    try {

        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const token = req.cookies.access_token;
        const verified = jwt.verify(token, jwtSecretKey, async (e, decoded) => {
            if (decoded) {
                res.redirect('/accounts');
            } else {
                res.render('user/loginPage', { layout: '../layouts/mainHome_Layout', title: `Login | Instagram`, description: ``, keywords: `` })
            }
        })

    } catch (err) {
        console.log(err);
    }
};

const calculatePoint = async (req, res, next) => {
    try {
        const addTimeToString = (timeString, additionalTime) => {
            // Verilen süreyi dakikaya çevir
            const additionalMinutes = parseTimeToMinutes(additionalTime);
        
            // Verilen saat string'ini ayrıştır
            const [hours, minutes] = timeString.split(':').map(Number);
        
            // Toplam dakikayı hesapla
            const totalMinutes = hours * 60 + minutes + additionalMinutes;
        
            // Saati ve dakikayı ayarla
            const newHours = Math.floor(totalMinutes / 60) % 24;
            const newMinutes = totalMinutes % 60;
        
            // Sonucu "HH:mm" formatında döndür
            const resultTimeString = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
            
            return resultTimeString;
        };
        
        const parseTimeToMinutes = (timeString) => {
            // Süreyi dakikaya çevir
            const matches = timeString.match(/(\d+)\s*(min|minute)/i);
        
            if (!matches) {
                throw new Error('Geçersiz süre formatı. Örnek: "5 min"');
            }
        
            const minutes = parseInt(matches[1], 10);
            return isNaN(minutes) ? 0 : minutes;
        };

        // Burdan başlıyor
        const tripData = await Trip.findOne({ otobusAdi: "13" });

        if (!tripData) {
            return res.status(404).json({ message: "Sefer bilgileri bulunamadı." });
        }

        const origin = tripData.seferBaslangic;
        const destination = tripData.seferBitis;
        const waypoints = tripData.tripRoad.map(point => point.split(',').map(parseFloat));

        const resultPromises = [];

        for (let i = 0; i < waypoints.length; i++) {
            const currentWaypoint = waypoints[i];
            const currentOrigin = `${currentWaypoint[0]}, ${currentWaypoint[1]}`;

            const resultPromise = googleMapsClient.directions({
                origin: currentOrigin,
                destination: destination,
                waypoints: waypoints,
                mode: 'driving',
                units: 'metric'
            })
            .asPromise();

            resultPromises.push(resultPromise);
        }

        const results = await Promise.all(resultPromises);

        const tripDetailsArray = results.map((result, index) => {
            const route = result.json.routes[0];
            return {
                stop: waypoints[index],
                totalDistance: route.legs[0].distance.text,
                totalDuration: route.legs[0].duration.text,
                varisSaati: addTimeToString(tripData.seferBaslangic, route.legs[0].duration.text,)
            };
        });

        console.log(tripDetailsArray);
        res.json(tripDetailsArray);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
const calistir = async (req,res,next) => {
    try{
        const kaynakDurakIsim = "İSTASYON"; // Kaynak durak ismi
        const hedefDurakIsim = "EMNİYET MÜDÜRLÜĞÜ KARŞISI 1"; // Hedef durak ismi

        // Kaynak duraktan hedef duraka en yakın otobüs rotasını bul
        const deneme =  await Trip.aggregate([
            {
              $match: {
                "tripRoad.stationName": kaynakDurakIsim // Kaynak durak ismine göre filtrele
              }
            },
            {
              $addFields: {
                "location": {
                  type: "Point",
                  coordinates: [41.1959151, 32.61048606] // Kaynak durak koordinatları (örnek değerler)
                }
              }
            },
            {
              $geoNear: {
                near: {
                  type: "Point",
                  coordinates: [41.1959151, 32.61048606] // Kaynak durak koordinatları (örnek değerler)
                },
                distanceField: "distance",
                spherical: true,
                maxDistance: 10000, // Maksimum mesafe (metre cinsinden), ihtiyaca göre ayarlayabilirsiniz
                query: {
                  "tripRoad.stationName": hedefDurakIsim // Hedef durak ismi için filtreleme
                }
              }
            },
            {
              $sort: { distance: 1 } // Mesafeye göre sırala, en yakın rota ilk sırada olacak
            },
            {
              $limit: 1 // Sadece en yakın rota
            }
          ]);


        console.log(deneme)
    }
    catch (err){
        console.log(err)
    }
}

const NasilGiderim = async (req,res,next) => {
    try{
        const fromStationName = req.body.fromStationName;
        const toStationName = req.body.toStationName;
        const directTrips = await Trip.find({
            tripRoad: { $elemMatch: { stationName: fromStationName } },
            tripRoad: { $elemMatch: { stationName: toStationName } }
          });
        
          // Direkt sefer yoksa aktarmaya bakalım
          if (!directTrips.length) {
            const possibleTransfers = [];
        
            // Başlangıç noktasından kalkan tüm seferleri bul
            const startingTrips = await Trip.find({ tripRoad: { $elemMatch: { stationName: fromStationName } } });
        
            for (const startingTrip of startingTrips) {
              const intermediateStops = startingTrip.tripRoad.filter(station => station.stationName !== toStationName);
              for (const intermediateStop of intermediateStops) {
                // Ara durağa giden seferleri bul
                const connectingTrips = await Trip.find({ tripRoad: { $elemMatch: { stationName: intermediateStop.stationName } } });
        
                // Bir aktarma seçeneği oluştur 
                possibleTransfers.push({
                  startingTrip,
                  connectingTrips: connectingTrips.filter(trip => trip.tripRoad.find(station => station.stationName === toStationName))
                });
              }
            }
        
            // 2. Adım: En Uygun Rotayı Seç
            let bestRoute = null;
            for (const transferOption of possibleTransfers) {
              // En az aktarmaya sahip rotayı seç (yalnızca 1 aktarma var)
              if (!bestRoute || transferOption.connectingTrips.length < bestRoute.connectingTrips.length) {
                bestRoute = transferOption;
              }
            }
        
            res.json(bestRoute);
          } else {
            // Direkt sefer bulundu, onu döndür
            res.json(directTrips[0]);
          }
        }
    catch (err){
        console.log(err)
        res.json({status:false,errMessage:"Eksik yada Hatalı Parametre Gönderildi."})
    }
}



// POST
const searchStation = async (req,res,next) => {
    try{
        const foundedStations = await Station.find({stationName:{"$regex": req.body.query, $options: 'i' } })
        res.json(foundedStations)
    }
    catch (err){
        console.log(err)
    }
}
const searchTrip = async (req,res,next) => {
    try{
        const foundedStations = await Trip.find({$and:[{otobusAdi:{"$regex": req.body.query, $options: 'i' } },{seferBaslangicDurakAdi: req.body.yon}]})
        res.json(foundedStations)
    }
    catch (err){
        console.log(err)
    }
}
const searchTripYon = async (req,res,next) => {
  try{
      const foundedStations = await Trip.find({$and:[{otobusAdi:{"$regex": req.body.query, $options: 'i' } },{seferBaslangicDurakAdi: req.body.yon}]})
      res.json(foundedStations)
  }
  catch (err){
      console.log(err)
  }
}
const getNearestStation = async (req,res,next) => {
    try{
        const userLocationX = req.body.longitude;
        const userLocationY = req.body.latitude;
        const metres = req.body.metres;
        const findNearest = await Station.find({
            location: {
              $near: {
                $geometry: {
                  type: "Point",
                  coordinates: [Number(userLocationX), Number(userLocationY)],
                },
                $maxDistance: Number(metres),
              },
            },
          });
          const stationsWithDistance = [];

        for (const station of findNearest) {
          const userCoords = [Number(userLocationX), Number(userLocationY)];
          const stationCoords = station.location.coordinates;
        
          // Haversine formülü kullanarak mesafeyi hesapla
          const distance = calculateDistance(userCoords, stationCoords);
        
          const stationWithDistance = {
            ...station.toObject(), // Mongoose nesnesini temel JS nesnesine dönüştür
            distance: Math.round(distance) // Mesafeyi tam sayıya yuvarla ve ekle
          };
        
          stationsWithDistance.push(stationWithDistance);
        }
        
        // Haversine formülü kullanarak iki nokta arasındaki mesafeyi hesaplayan fonksiyon
        function calculateDistance(coord1, coord2) {
          const [lat1, lon1] = coord1;
          const [lat2, lon2] = coord2;
        
          const R = 6371e3; // Earth radius in meters
          const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
          const φ2 = lat2 * Math.PI / 180;
          const Δφ = (lat2 - lat1) * Math.PI / 180;
          const Δλ = (lon2 - lon1) * Math.PI / 180;
        
          const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                    Math.cos(φ1) * Math.cos(φ2) *
                    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        
          const distance = R * c; // in meters
        
          return distance;
        }
        res.json(stationsWithDistance)
    }
    catch (err){
        console.log(err)
    }
}

module.exports = {
    homeShow,
    getWeather,
    calistir,
    NasilGiderim,
    getNearestStation,
    searchStation,
    searchTrip,
    searchTripYon,
    loginPageShow,
    calculatePoint,
}