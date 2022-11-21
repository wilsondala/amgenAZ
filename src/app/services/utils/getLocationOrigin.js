// @flow weak

export const getLocationOrigin: () => string = () => {

   if (process.env.NODE_ENV === 'production') {
      return 'https://api.azimute.med.br/Prod/Amgen/LungMapping';
     }
     return 'https://localhost:5001';
};

export default getLocationOrigin;
