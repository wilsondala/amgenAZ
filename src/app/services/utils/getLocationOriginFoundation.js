// @flow weak

export const getLocationOriginFoundation: () => string = () => {

  // if (process.env.NODE_ENV === 'production') {

  //   if (!window.location.origin) {
  //     window.location.origin = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}`;
  //   }
  //   return 'https://holisticus.azimute.med.br/WebService/Roche/PortalConcierge';
  // }
  return 'https://localhost:5001';
};

export default getLocationOriginFoundation;
