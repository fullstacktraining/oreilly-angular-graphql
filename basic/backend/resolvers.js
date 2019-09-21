const { paginateResults } = require('./utils');

module.exports = {
  Query: {
    cars: (_, __, { dataSources }) => dataSources.carAPI.getCars(),
    car: (_, { id }, { dataSources }) => dataSources.carAPI.getCar({ id })
    
  }
};

/*
cars: async (_, { pageSize = 500, after }, { dataSources }) => {
      const allCars = await dataSources.carAPI.getCars();

      const cars = paginateResults({
        after,
        pageSize,
        results: allCars
      });

      return {
        cars,
        cursor: cars.length ? cars[cars.length - 1].cursor : null,
        hasMore: cars.length ? cars[cars.length - 1].cursor !== allCars[allCars.length - 1].cursor : false
      }
    },
*/