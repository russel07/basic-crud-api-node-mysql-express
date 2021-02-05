const db = require("../models");
const Book = db.book;
const Op = db.Sequelize.Op;

//Create
exports.create = (req, res) => {
    Book.findOne({
       where: {
           title: req.body.title 
       }
    })
    .then(async (data) => {
        if(data){
            return res.status(400).send({
                message:"Book already exist with this title."
            });
        }else{
            const book = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description
            }; 
            
            Book.create(book)
            .then(book => {
                res.status(200).send(book);
            }).catch(err => {
                res.status(500).send({message: err.message})
            });
        }
    }).catch(err => {
        res.status(500).send({message: err.message})
    });
}

//view all
exports.getAll = (req, res) =>{
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    Book.findAll({
        where: condition
    })
    .then(async (data) => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({message: `Something went wrong`})
    });
}

//get one
exports.getOne = (req, res) =>{
    const id = req.params.id;
    
    Book.findByPk(id)
        .then(data => {
            if(data)
                return res.status(200).send(data);
                else res.status(400).send({
                    message: `No book found`
                })
        })
        .catch( err => {
            res.status(500).send({
                message: `Something went wrong`
            })
        });
}

//update

exports.update = (req, res) => {
    const id = req.params.id;
    const book = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description
    };

    Book.update(book, {
        where: {id:id}
    }).then(data => {
        res.status(200).send({message: `Updated successfully`});
    }).catch(err => {
        res.status(500).send({message: err.message})
    });
}

//delete one
exports.delete = (req, res) => {
    const id = req.params.id;

    Book.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
        res.send({
            message: "Book was deleted successfully!"
        });
        } else {
        res.send({
            message: `Cannot delete book with id=${id}. Maybe Tutorial was not found!`
        });
        }
    })
    .catch(err => {
        res.status(500).send({
        message: "Could not delete book with id=" + id
        });
    });
};

//delete all

exports.deleteAll = (req, res) => {
    Book.destroy({
        where: {},
        truncate: false
      })
      .then(nums => {
        res.send({ message: `${nums} books were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
        message: "Could not delete book with id=" + id
        });
    });
};

