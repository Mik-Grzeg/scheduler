let API_SERVER_VAL = '';

switch (process.env.NODE_ENV) {
    case 'development':
        API_SERVER_VAL = 'http://localhost:8000';
        break;
    case 'production':
        API_SERVER_VAL = process.env.REACT_APP_API_SERVER;
        break;
    default:
        API_SERVER_VAL = 'http://localhost:8000';
        break;
}

export const API_SERVER = API_SERVER_VAL;

export const SESSION_DURATION = 5*3600*1000;

export const hours = [  '8:00', '9:00', '10:00', '11:00',
                        '12:00', '13:00', '14:00', '15:00', '16:00',
                        '17:00', '18:00', '19:00', '20:00']