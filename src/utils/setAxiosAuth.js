import axios from 'axios';
import _ from 'lodash';

const setAxiosAuth = (user) => {
    if (!_.isEmpty(user)){      // HTTP Basic Auth
        axios.defaults.auth = user;
    } else {                    // log out
        delete axios.defaults.auth;
    }
}

export default setAxiosAuth;