'use strict';

const yelp = require('yelp-fusion');
const api_key = '-qZtrbK-TIcsGZSHlJ2IPJJwgXxUspRlWV7iFiPgJT7QvKa9TGeBZdSKf7vMEBl7NNO-U3aW8eUl03S1YSrvI3TncKox5LMoJiiQNJnKONyRmOPlfM7OwIvLVcR-XnYx';

const client = yelp.client(api_key);

let list_of_businesses = [];

client.search({
    term: 'restaurant',
    location: 'new york, ny',
    sort_by: 'distance',
    // price: 2,
    radius: 40000,
    limit: 50
}).then(response => {
    list_of_businesses = response.jsonBody.businesses;
    console.log(getBadBusinesses(list_of_businesses));
}).catch(e => {
    console.log(e);
});

function getBadBusinesses(businesses) {
    const cutoff = 3;
    let bad_businesses = [];

    for (let i in businesses) {
        let business = businesses[i]
        let rating = business.rating;

        if (rating <= cutoff) {
            bad_businesses.push({
                "name": business.name,
                "rating": rating
            });
        }
    }

    return bad_businesses;
}

function printBusinesses(businesses) {
    for (const i in businesses) {
        console.log(businesses[i].name);
    }
}

function printReviews(businesses) {
    for (let i in businesses) {
        client.reviews(businesses[i].id).then(response => {
            let reviews = response.jsonBody.reviews;

            for (let j in reviews) {
                console.log(reviews[j].text);
            }
        }).catch(e => {
            console.log(e);
        });
    }
}
