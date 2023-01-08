const from = document.querySelector('#sendForm');

console.log(from);

async function sendForm(event){
    let requestedObject = {
        name : event.srcElement[0].value,
        shortMessage: event.srcElement[1].value,
    }

    event.preventDefault();
    const postRequest = await request('/api/mail', 'POST', requestedObject);

    console.log(postRequest)

}