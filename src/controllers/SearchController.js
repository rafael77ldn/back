const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');


module.exports = {
  async index(request, response) {
    // Filtrar por tecnologias
    const { latitude, longitude, techs } = request.query;

    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      // Busca todos Devs num reaio 10km
      location: {
        $near:{
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000, //10km
        }
      }
    });

    // console.log(techsArray);
  return response.json({ devs });
  }
}