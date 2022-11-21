import { isNullOrUndefined } from "util";

/**
 * Configurações de css para botões
 */
export const primaryButtonCss = "uk-button uk-button-large uk-button-primary uk-form-width-medium uk-margin-small-bottom uk-margin-left";
export const successButtonCss = "uk-button uk-button-large uk-button-success uk-form-width-medium uk-margin-small-bottom client-color";
export const dangerButtonCss = "uk-button uk-button-large uk-button-danger uk-form-width-medium uk-margin-small-bottom uk-margin-left";

export const required = (value) => value ? undefined : 'Campo obrigatório';
export const requiredSelect = (value) => !isNullOrUndefined(value) ? undefined : 'Obrigatório';

/**
 * 
 * @param value  valor de entrada
 * @param defaultValue valor padrao que sera retornado caso seja null ou undefined
 * 
 * @returns valor de entrada ou defaultValue
 */
export function coalesce(value, defaultValue) {
    if (value === undefined
        || value === null) {
        return defaultValue;
    }
    else {
        return value;
    }
}

export function today() {
    return toDatePicker(new Date());
}

export function toDatePicker(date) {
    const y = date.getFullYear();
    const m = right("0" + (date.getMonth() + 1), 2);
    const d = right("0" + date.getDate(), 2);

    return y + "-" + m + "-" + d;
}

export function dateTimeFormat(date, format) {
    const year = date.getFullYear();
    const month = right("0" + (date.getMonth() + 1), 2);
    const day = right("0" + date.getDate(), 2);

    const hour = right("0" + date.getHours(), 2);
    const minute = right("0" + date.getMinutes(), 2);
    const second = right("0" + date.getSeconds(), 2);

    return new String(format)
        .replace("yyyy", year)
        .replace("yy", right(year, 2))
        .replace("MM", month)
        .replace("dd", day)
        .replace("hh", hour)
        .replace("mm", minute)
        .replace("ss", second)
}

export function left(str, n) {
    if (n <= 0)
        return "";
    else if (n > String(str).length)
        return str;
    else
        return String(str).substring(0, n);
}

export function right(str, n) {
    if (n <= 0)
        return "";
    else if (n > String(str).length)
        return str;
    else {
        var iLen = String(str).length;
        return String(str).substring(iLen, iLen - n);
    }
}

export function objectToQueryString(obj) {
    let filter = [];
    let ret = "";

    Object.entries(obj).map((e) => {
        filter.push(`${e[0]}=${encodeURI(e[1])}`);
    })

    if (filter.length > 0) {
        ret = filter.join("&");
    } else {
        ret = "";
    }

    return ret;
}

/**
 * 
 * @param data  dados do arquivo
 * @param filename valor do nome de arquivo
 * 
 * @returns valor de entrada ou defaultValue
 */
export function download(data, filename) {
    try {
        var file = b64toBlob(data);
        //new Blob([data], {type: type});
        if (window.navigator.msSaveOrOpenBlob)
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            var a = document.createElement("a"),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    } catch (error) {
        console.log('Error converter string 64 to archive: ', error);
    }
}

function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
}

export function loadJS(src) {
    let ref = window.document.getElementsByTagName("script")[0];
    let script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}

export function loadMaps() {
    try {
        const url = 'https://maps.googleapis.com/maps/api/js?key=_CHAVE_MAPS_&libraries=places';

        loadJS(url);
    } catch (error) {
        console.error('error in insert script maps => ', error);
    }
}

/**
 * 
 * @param {number} lat Destination Latitude 
 * @param {number} lng Destination Longitude
 * @param {number} latCurrent Origin Latitude 
 * @param {number} lngCurrent Origin Longitude
 * 
 * @returns distance between two coordinates
 */
export function radiusInEarthInKM(lat, lng, latCurrent, lngCurrent) {
    return Math.acos(Math.sin(lat) * Math.sin(latCurrent) + Math.cos(lat) * Math.cos(latCurrent) * Math.cos(lngCurrent - (lng))) * 6371;
}


export function headersReactTableByProfile(headers, profile){
    try {
        return headers.filter( h => h.profile == undefined || h.profile.includes(profile));
    }
    catch (error) {
        console.log(error);
    }
}

export function headerReactTableToHeaderExport(header) {
    try {
        return header.map(h => {
            if (h.export != false)
                return { label: h.Header, key: h.accessor }
        }).filter( e => e != undefined);
    }
    catch (error) {
        console.log(error);
    }
}

export function addItemWithoutDuplicates(lista, item, type) {
    if (type == 'text') {
        if (lista.filter(x => x.text == item.text).length == 0)
            lista.push(item);
        return lista;

    } else if (type == 'value') {

        if (lista.filter(x => x.value == item.value).length == 0)
            lista.push(item);
        return lista;

    }
}

export function base64ToArrayBuffer(base64) {
    let binaryString =  window.atob(base64);
    const len = binaryString.length;
    let bytes = new Uint8Array( len );
    for (let i = 0; i < len; i++)        {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }
  
  export function createAndDownloadBlobFile(raw, filename, extension = 'pdf') {
    const body = base64ToArrayBuffer(raw);
    const blob = new Blob([body]);
    const fileName = `${filename}.${extension}`;
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, fileName);
    } else {
      const link = document.createElement('a');
      // Browsers that support HTML5 download attribute
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }