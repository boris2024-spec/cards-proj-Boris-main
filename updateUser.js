const axios = require('axios');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTU5ZjJkYmRlZGYyZGIyYjUyYmRlNDIiLCJpc0J1c2luZXNzIjp0cnVlLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNzAwMzkzNzY4fQ.xwXvV-fY_e9y7HPMItxQER4oh42A0ZbosPyheq7Jq9c';
const userId = '6559f2dbdedf2db2b52bde42';

const data = {
    name: {
        first: 'business',
        middle: 'Man',
        last: 'user'
    },
    phone: '0512345567',
    image: {
        url: '',
        alt: ''
    },
    address: {
        state: 'IL',
        country: 'Israel',
        city: 'Arad',
        street: 'Shoham',
        houseNumber: 5,
        zip: 8920435
    }
};

axios.put(
    `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`,
    data,
    {
        headers: {
            'x-auth-token': token
        }
    }
)
    .then(res => {
        console.log('Пользователь обновлён:', res.data);
    })
    .catch(err => {
        console.error('Ошибка обновления пользователя:', err.response?.data || err.message);
    }); 