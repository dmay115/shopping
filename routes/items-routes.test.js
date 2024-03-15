process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../supertest-demo/app");
let items = require("../supertest-demo/fakeDb");

let popcorn = { name: "popcorn", price: 1.99 };

beforeEach(function () {
    items.push(popcorn);
});

afterEach(function () {
    items.length = 0;
});

describe("GET /items", function () {
    test("Gets a list of items", async function () {
        const resp = await request(app).get(`/items`);
        expect(resp.statusCode).toBe(200);

        expect(resp.body).toEqual({ items: [popcorn] });
    });
});

describe("GET /items/:name", function () {
    test("Gets an item", async function () {
        const resp = await request(app).get(`/items/${popcorn.name}`);
        expect(resp.statusCode).toBe(200);

        expect(resp.body).toEqual({ item: popcorn });
    });
});

describe("POST /items", function () {
    test("Creates a new item", async function () {
        const resp = await request(app).post(`/items`).send({
            name: "Soap",
            price: 2.5,
        });
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({
            item: { name: "Soap" },
        });
    });
});

describe("PATCH /items/:name", function () {
    test("Updates an item", async function () {
        const resp = await request(app).patch(`/items/${popcorn.name}`).send({
            name: "pickle",
        });
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({
            item: { name: "pickle" },
        });
    });
});

describe("DELETE /items/:name", function () {
    test("Deletes an item", async function () {
        const resp = await request(app).delete(`/items/${popcorn.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ message: "Deleted" });
    });
});
