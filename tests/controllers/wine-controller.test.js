const {
  getWines,
  getWine,
  deleteWine,
  addWine,
  updateWine,
} = require("../../controllers/wine-controller");

const Wine = require("../../models/wine");

jest.mock("../../models/wine");

describe("Wine Controller", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      params: {},
      body: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  describe("getWines", () => {
    it("should return all wines with status 200", async () => {
      const wines = [
        { _id: "1", wine: "Cabernet Sauvignon" },
        { _id: "2", wine: "Chardonnay" },
      ];

      const sort = jest.fn().mockResolvedValue(wines);

      Wine.find.mockReturnValue({ sort });

      await getWines(req, res);

      expect(Wine.find).toHaveBeenCalledTimes(1);
      expect(sort).toHaveBeenCalledWith({ wine: 1 });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(wines);
    });

    it("should return status 500 when the database request fails", async () => {
      Wine.find.mockReturnValue({
        sort: jest.fn().mockRejectedValue(new Error("Database error")),
      });

      await getWines(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Something went wrong ...",
      });
    });
  });

  describe("getWine", () => {
    it("should return a wine by ID", async () => {
      const wine = {
        _id: "123",
        wine: "Merlot",
      };

      req.params.id = "123";
      Wine.findById.mockResolvedValue(wine);

      await getWine(req, res);

      expect(Wine.findById).toHaveBeenCalledWith("123");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(wine);
    });

    it("should return status 500 when finding a wine fails", async () => {
      req.params.id = "invalid-id";
      Wine.findById.mockRejectedValue(new Error("Database error"));

      await getWine(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Something went wrong ...",
      });
    });

    it("should return null when a wine is not found", async () => {
      req.params.id = "missing-id";

      Wine.findById.mockResolvedValue(null);

      await getWine(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(null);
    });
  });

  describe("deleteWine", () => {
    it("should delete a wine and return the deleted wine", async () => {
      const deletedWine = {
        _id: "123",
        wine: "Merlot",
      };

      req.params.id = "123";
      Wine.findByIdAndDelete.mockResolvedValue(deletedWine);

      await deleteWine(req, res);

      expect(Wine.findByIdAndDelete).toHaveBeenCalledWith("123");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(deletedWine);
    });

    it("should return status 500 when deletion fails", async () => {
      req.params.id = "123";
      Wine.findByIdAndDelete.mockRejectedValue(new Error("Database error"));

      await deleteWine(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Something went wrong ...",
      });
    });

    it("should return null when wine to delete is not found", async () => {
      req.params.id = "missing-id";

      Wine.findByIdAndDelete.mockResolvedValue(null);

      await deleteWine(req, res);

      expect(Wine.findByIdAndDelete).toHaveBeenCalledWith("missing-id");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(null);
    });
  });

  describe("addWine", () => {
    it("should create a wine and return status 201", async () => {
      const wineData = {
        wine: "Merlot",
        winery: "Example Winery",
        price: 25,
      };

      const savedWine = {
        _id: "123",
        ...wineData,
      };

      req.body = wineData;

      Wine.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(savedWine),
      }));

      await addWine(req, res);

      expect(Wine).toHaveBeenCalledWith(wineData);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(savedWine);
    });

    it("should return status 500 when saving fails", async () => {
      req.body = {
        wine: "Merlot",
      };

      Wine.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(new Error("Validation error")),
      }));

      await addWine(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Something went wrong ...",
      });
    });
  });

  describe("updateWine", () => {
    it("should update a wine and return status 200", async () => {
      const updatedWine = {
        _id: "123",
        wine: "Updated Merlot",
      };

      req.params.id = "123";
      req.body = {
        wine: "Updated Merlot",
      };

      Wine.findByIdAndUpdate.mockResolvedValue(updatedWine);

      await updateWine(req, res);

      expect(Wine.findByIdAndUpdate).toHaveBeenCalledWith("123", req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedWine);
    });

    it("should return status 500 when update fails", async () => {
      req.params.id = "123";
      req.body = {
        wine: "Updated Merlot",
      };

      Wine.findByIdAndUpdate.mockRejectedValue(new Error("Database error"));

      await updateWine(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Something went wrong ...",
      });
    });

    it("should return null when wine to update is not found", async () => {
      req.params.id = "missing-id";
      req.body = {
        wine: "Updated Merlot",
      };

      Wine.findByIdAndUpdate.mockResolvedValue(null);

      await updateWine(req, res);

      expect(Wine.findByIdAndUpdate).toHaveBeenCalledWith(
        "missing-id",
        req.body,
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(null);
    });
  });
});
