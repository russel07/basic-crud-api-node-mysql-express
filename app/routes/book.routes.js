module.exports = app => {
    const books = require("../controllers/book.controller.js");
    const router = require("express").Router();

    router.get("/", books.getAll);
    router.post("/", books.create);
    router.get("/:id", books.getOne);
    router.put("/:id", books.update);
    router.delete("/:id", books.delete);
    router.delete("/", books.deleteAll);

    app.use('/api/v0/book', router);
}