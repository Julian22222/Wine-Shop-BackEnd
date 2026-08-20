const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = require("../../app");
const Wine = require("../../models/wine");

let mongoServer;
let wine;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  await mongoose.connect(mongoServer.getUri());
});

beforeEach(async () => {
  wine = await Wine.create({
    wine: "Test Merlot",
    name: "Test Merlot",
    winery: "Test Winery",
    price: 25,
    year: "2024",
    description: "A test wine",
    image: "test.jpg",
    location: "France",
    rating: 4.5,
    grade: "A",
    available: 10,
  });
});

afterEach(async () => {
  await Wine.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Wine API", () => {
  describe("GET /wines", () => {
    it("should return all wines", async () => {
      const response = await request(app).get("/wines");

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(1);
    });

    it("should return an empty array when there are no wines", async () => {
      await Wine.deleteMany({});

      const response = await request(app).get("/wines");

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe("GET /wines/:id", () => {
    it("should return a wine by ID", async () => {
      const response = await request(app).get(`/wines/${wine._id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe("Test Merlot");
    });

    it("should return null when wine does not exist", async () => {
      const response = await request(app).get(
        `/wines/${new mongoose.Types.ObjectId()}`,
      );

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeNull();
    });
  });

  describe("POST /wines", () => {
    it("should create a new wine", async () => {
      const newWine = {
        wine: "Test Cabernet",
        name: "Test Cabernet",
        winery: "Test Winery",
        price: 30,
        year: "2024",
        description: "A test wine",
        image: "test.jpg",
        location: "France",
        rating: 4.5,
        grade: "A",
        available: 10,
      };

      const response = await request(app).post("/wines").send(newWine);

      expect(response.statusCode).toBe(201);
      expect(response.body.name).toBe("Test Cabernet");
    });

    it("should return 500 when creating an invalid wine", async () => {
      const response = await request(app).post("/wines").send({
        name: "Incomplete Wine",
      });

      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty("error");
    });
  });

  describe("PATCH /wines/:id", () => {
    it("should update a wine", async () => {
      // Create a valid wine first
      const createResponse = await request(app).post("/wines").send({
        name: "Updated Merlot",
        wine: "Updated Merlot",
        price: 25,
        available: 10,
        grade: "A",
        description: "A test Merlot wine",
        year: "2022",
        image: "test-image.jpg",
        location: "France",
        rating: 4.5,
        winery: "Test Winery",
      });

      expect(createResponse.statusCode).toBe(201);

      const wineId = createResponse.body._id;

      //   console.log("Created wine:", createResponse.body);
      //   console.log("Wine ID:", wineId);

      // Update the wine
      const response = await request(app).patch(`/wines/${wineId}`).send({
        name: "Updated Merlot",
        wine: "Updated Merlot",
        price: 25,
        available: 15,
        grade: "A+",
        description: "An updated Merlot wine",
        year: "2023",
        image: "updated-image.jpg",
        location: "France",
        rating: 4.8,
        winery: "Updated Winery",
      });

      expect(response.statusCode).toBe(200);
      expect(response.body.wine).toBe("Updated Merlot");
      expect(response.body.price).toBe("25");
    });

    it("should return null when wine does not exist", async () => {
      const response = await request(app)
        .patch(`/wines/${new mongoose.Types.ObjectId()}`)
        .send({
          name: "Updated Wine",
          wine: "Updated Wine",
          price: 30,
          available: 10,
          grade: "A",
          description: "Updated wine",
          year: "2024",
          image: "updated.jpg",
          location: "France",
          rating: 4.5,
          winery: "Test Winery",
        });

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeNull();
    });
  });

  describe("DELETE /wines/:id", () => {
    it("should delete a wine", async () => {
      const response = await request(app).delete(`/wines/${wine._id}`);

      expect(response.statusCode).toBe(200);

      const deletedWine = await Wine.findById(wine._id);

      expect(deletedWine).toBeNull();
    });

    it("should return null when wine does not exist", async () => {
      const response = await request(app).delete(
        `/wines/${new mongoose.Types.ObjectId()}`,
      );

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeNull();
    });
  });
});
