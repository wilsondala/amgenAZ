// @flow weak

export const getLocationOriginMicrosservicos: () => string = () => {
    return 'https://auth.azimute.med.br';
    // return 'https://dev.azimute.med.br:8243';
};

export default getLocationOriginMicrosservicos;

export function APIKey(){
    if (process.env.NODE_ENV === 'production') {
        return 'ca623c05-0a2e-36cf-b6ae-4836e5cef31c';
    }
    return '7ad42ca9-5cad-32c7-ab14-274fabec6206';
}

export function ProgramId(){
    return 'ee4babc5-7e36-4d88-8de5-da7023e0d211';
}
