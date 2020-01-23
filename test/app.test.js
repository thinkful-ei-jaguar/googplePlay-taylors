const app = require('../app');
const supertest = require('supertest');
const { expect } = require('chai');

describe('/apps get request', () => {
    it('returns an array of App objects', () => {
        return supertest(app)
                .get('/apps')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body).to.be.an('array')
                    expect(res.body).to.have.lengthOf.at.least(1)
                    const appOne = res.body[0]
                    expect(appOne).to.include.all.keys('App', 'Category', 'Rating', 'Reviews', 'Size', 'Installs', 'Type', 'Price', 'Content Rating', 'Genres', 'Last Updated', 'Current Ver', 'Android Ver')
                })
    })
    it('returns 400 response if Rating or App isn\'t sort query', () => {
        return supertest(app)
                .get('/apps')
                .query({sort: 'OOPS'})
                .expect(400, 'Sort must one of \"Rating\" or \"App\"')
    })
    it('returns 400 response if genres query is not a known category', () => {
        return supertest(app)
                .get('/apps')
                .query({genres: 'WHOOPS'})
                .expect(400, 'Genres must be one of Action, Puzzle, Strategy, Casual, Arcade, or Card')
    })
    const sortFields = ['App', 'Rating'];
    sortFields.forEach(field => {
    it(`should return array of Apps sorted by ${field} query provided`, () => {
        return supertest(app)
                .get('/apps')
                .query({sort: field})
                .then(res => {
                    expect(res.body).to.be.an('array');
                    let sorted=true, i=0;
                    while(i < res.body.length-1) {
                        const appAtI= res.body[i];
                        const appAtIPlus1 = res.body[i + 1];
                        if (appAtIPlus1.field < appAtI.field) {
                            sorted=false;
                            break;
                        }
                        i++;
                    }
                      expect(sorted).to.be.true;
                })

        })
    })
})