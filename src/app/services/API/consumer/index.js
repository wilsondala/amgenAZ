// @flow weak

import axios                    from 'axios';
import getLocationOrigin        from '../../utils/getLocationOrigin';

export const Consumer = {

  Model: {
    codigo: '',
    codigoCupom: '',
    name: '',
    cpf: '',
    dataNascimento: '',
    sexo: '',
    logradouro: '',
    bairro: '',
    cidade: '',
    uf: '',
    celular: '',
    telefone: '',
    email: ''
  },

  postConsumer(): any {
    const options = { data: Consumer };
    const headers = {};
    const method  = 'post';
    const endpoint = '/api/consumer';
    const url     = `${getLocationOrigin()}/${endpoint}`;
  
    return axios.request({
      url,
      method,
      ...headers,
      ...options,
      withCredentials: false
    })
    .then(data => data)
    .catch(error => error);
  }
};

export default Consumer;
