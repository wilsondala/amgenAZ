import Auth from '../../services/auth';
import moment from 'moment'

let properties = {
    /**
     * Time in minutes to log out
     */
    timeToLogOut: 10,
    /**
     * Expiration time
     */
    validTime: undefined
}

/**
 * Add events listeners
 */
export function addEvents() {
    properties.validTime = new Date(new Date().setMinutes(new Date().getMinutes() + properties.timeToLogOut));
    try {
        removeEvents();
        let body = document.querySelector('body');
        body.addEventListener('mousemove', () => handleActionChange());
        body.addEventListener('mousedown', () => handleActionChange());
        body.addEventListener('keydown', () => handleActionChange());
        body.addEventListener('touchstart', () => handleActionChange());
        body.addEventListener('scroll', () => handleActionChange());
    } catch (error) {
        console.error('[ERROR] add events listeners in body => ', error);
    }
}

/**
 * Remove events listeners
 */
export function removeEvents() {
    try {
        let body = document.querySelector('body');
        body.removeEventListener('mousemove', () => handleActionChange());
        body.removeEventListener('mousedown', () => handleActionChange());
        body.removeEventListener('keydown', () => handleActionChange());
        body.removeEventListener('touchstart', () => handleActionChange());
        body.removeEventListener('scroll', () => handleActionChange());
    } catch (error) {
        console.error('[ERROR] remove events listeners in body => ', error);
    }
}

/**
 * Validates screen events to detect user downtime and log out after a certain time
 */
function handleActionChange()  {
    try {
        const user = Auth.getUserInfo();

        if (user) {
            const { timeToLogOut } = properties;
            let dtNow = moment(new Date());
            let dtExpirate = properties.validTime;
            let momentExpirate = moment(dtExpirate);
     
            if (momentExpirate.diff(dtNow, 'minutes', true) >= 0 && momentExpirate.diff(dtNow, 'minutes', true) <= timeToLogOut) {
                properties.validTime = new Date(new Date().setMinutes(new Date().getMinutes() + properties.timeToLogOut));
            } else {
                window.location.hash = '#/login';
            }
        }
    } catch (error) {
        console.error('[handleActionChange] => ', error);
    }
}