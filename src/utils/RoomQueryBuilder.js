import _ from 'lodash';

const RoomQueryBuilder = (_filters, roomType) => {
  const searchQueryArray = [];
  const filters = _.pick(_filters, 'locations', 'floors');
  let locationsQuery = '';
  let floorsQuery = '';

  if (Object.keys(filters.locations).length > 0) {
    locationsQuery = Object.keys(filters.locations).reduce((acc, curr) => {
      if (filters.locations[curr]) {
        if (!acc) return `location=${curr}`;
        return `${acc},${curr}`;
      }
      return acc;
    }, '');
  }

  if (Object.keys(filters.floors).length > 0) {
    floorsQuery = Object.keys(filters.floors).reduce((acc, curr) => {
      if (filters.floors[curr]) {
        if (!acc) return `floor=${curr}`;
        return `${acc},${curr}`;
      }
      return acc;
    }, '');
  }
};

export default RoomQueryBuilder;
