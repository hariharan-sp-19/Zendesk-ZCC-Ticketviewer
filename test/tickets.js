let server = require("../app");
let chai = require("chai");
let chaiHttp = require("chai-http");
let credData = require('./cred.json');
// Assertion 
chai.should();
chai.use(chaiHttp); 
if(credData.domain == "" || credData.username == "" || credData.password == ""){
    console.log("Please update credentials details before running test");
    return;
} else {
    describe('Tickets APIs', () => {

        /**
         * Test the POST route
         */
        describe("POST /fetch", () => {
            it("It should fetch tickets from page 1", (done) => {
                const body = {
                    "domain" : credData.domain,
                    "username" : credData.username,
                    "password": credData.password,
                    "fetch" : "fetchTicketByPage",
                    "pageCount" : 1
                };
                chai.request(server)                
                    .post("/fetch")
                    .send(body)
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('object');
                        response.body.should.have.property('body').be.a('object');
                        response.body.should.have.property('statusCode');
                        response.body.should.have.property('body').which.is.an('object').and.has.property('tickets');
                        response.body.should.have.property('body').which.is.an('object').and.has.property('count');
                    done();
                    });
            });

            it("should return error while fetch tickets from page -1", (done) => {
                const body = {
                    "domain" : credData.domain,
                    "username" : credData.username,
                    "password": credData.password,
                    "fetch" : "fetchTicketByPage",
                    "pageCount" : -1
                };
                chai.request(server)                
                    .post("/fetch")
                    .send(body)
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('object');
                        response.body.should.have.property('body').be.a('object');
                        response.body.should.have.property('statusCode');
                        response.body.should.have.property('body').which.is.an('object').and.has.property('error');
                    done();
                    });
            });

            it("It should fetch ticket by id(1)", (done) => {
                const body = {
                    "domain" : credData.domain,
                    "username" : credData.username,
                    "password": credData.password,
                    "fetch" : "fetchTicketById",
                    "fetchId" : 1
                };
                chai.request(server)                
                    .post("/fetch")
                    .send(body)
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('object');
                        response.body.should.have.property('body').be.a('object');
                        response.body.should.have.property('statusCode');
                        response.body.should.have.property('body').which.is.an('object').and.has.property('ticket');
                    done();
                    });
            });

            it("It should return error while fetching ticket by id(-1)", (done) => {
                const body = {
                    "domain" : credData.domain,
                    "username" : credData.username,
                    "password": credData.password,
                    "fetch" : "fetchTicketById",
                    "fetchId" : -1
                };
                chai.request(server)                
                    .post("/fetch")
                    .send(body)
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('object');
                        response.body.should.have.property('body').be.a('object');
                        response.body.should.have.property('statusCode');
                        response.body.should.have.property('body').which.is.an('object').and.has.property('error');
                    done();
                    });
            });

            it("It should fetch all users", (done) => {
                const body = {
                    "domain" : credData.domain,
                    "username" : credData.username,
                    "password": credData.password,
                    "fetch" : "fetchAllUsers",
                    "fetchIds" : ""
                };
                chai.request(server)                
                    .post("/fetch")
                    .send(body)
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('object');
                        response.body.should.have.property('body').be.a('object');
                        response.body.should.have.property('statusCode');
                        response.body.should.have.property('body').which.is.an('object').and.has.property('users');
                        response.body.should.have.property('body').which.is.an('object').and.has.property('count');
                    done();
                    });
            });

            it("It should fetch all the comments of a ticket by id", (done) => {
                const body = {
                    "domain" : credData.domain,
                    "username" : credData.username,
                    "password": credData.password,
                    "fetch" : "fetchTicketComments",
                    "fetchId" : 1
                };
                chai.request(server)                
                    .post("/fetch")
                    .send(body)
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('object');
                        response.body.should.have.property('body').be.a('object');
                        response.body.should.have.property('statusCode');
                        response.body.should.have.property('body').which.is.an('object').and.has.property('comments');
                        response.body.should.have.property('body').which.is.an('object').and.has.property('count');
                    done();
                    });
            });

        });



    });
}

