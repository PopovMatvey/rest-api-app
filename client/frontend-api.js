// Request on server
// url - url request
// method - http method
// data - json object (requested object)
async function request(url, method = 'GET', data = null) {
    try {
        const headers = {};
        let body;

        if (data) {
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(data);
        }

        const response = await fetch(url, {
            method,
            headers,
            body,
        });

        return await response.json();
    } catch (e) {
        console.warn("Error:", e.message);
    }
}