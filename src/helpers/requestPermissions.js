// import q from 'q';
// import fetch from 'isomorphic-fetch';

// import config from '../config';
// import fetchHeaders from './fetchHeaders';

// let proto = 'http';

// /* eslint-disable */
// if (config.services.accts.port === 443) {
//     proto = 'https';
// }
// /* eslint-enable */

// /**
//  * [requestPermissions function uses http to request up to date permissions for the user]
//  * @param {Object} user the user's cookie for requesting their permissions'
//  * @param {boolean} details true if we want user details
//  * @returns {Promise} deferred the promise to act on in the function that calls requestPermissions
//  */
// export default function requestPermissions(user, details = false) {
//     // response body
//     let route = `api/apps/${config.services.accts.app}/permissions/user/check`;
//     if (details) {
//         route = `api/apps/${config.services.accts.app}/permissions/user`;
//     }
//     // http options
//     const options = {
//         headers: fetchHeaders(user)
//     };
//     // we're returning a promise no matter what
//     const deferred = q.defer();
//     // if we have a cookie, use it to request the permissions
//     if (user.coded) {
//         fetch(
//             `${proto}://${config.services.accts.host_name}/${route}`,
//             options
//         ).then(
//             res => res.json().then(
//                 body => {
//                     if (body.success) {
//                         // if the call was successful return it
//                         deferred.resolve({ ...body, status: res.status });
//                     } else {
//                         // otherwise resolve an unsuccessful promise
//                         deferred.resolve({ ...body, success: false, status: res.status });
//                     }
//                 },
//                 // fail on json parsing error
//                 () => deferred.resolve({ success: false })
//             ),
//             // fail on fetch error
//             () => deferred.resolve({ success: false })
//         );
//     } else {
//         // if we dont have a cookie just resolve an unnsuccessful promise
//         deferred.resolve({ success: false });
//     }
//     return deferred.promise;
// }

// /**
//  * Clears out login cooikies and redirects to accounts longin.
//  * @param {Object} res Express response object
//  * @returns {undefined}
//  */
// export function redirectToLogin(res) {
//     res.clearCookie(config.services.accts.jwt_cookie);
//     res.redirect(config.services.accts.url + config.services.accts.login_path);
// }
