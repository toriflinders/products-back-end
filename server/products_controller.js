module.exports = {
  createOneProduct: (req, res, next) => {
    const db = req.app.get('db');
    const { name, description, price, image_url } = req.body;

    db.create_product([name, description, price, image_url])
      .then(() => res.sendStatus(200))
      .catch(err => {
        res.status(500).send({errorMessage: "Could not create_product"});
        console.log(err)
      });
  },
  getOneProduct: (req, res, next) => {
    const db = req.app.get('db');
    const {id} = req.params;

    db.read_product(id)
      .then(product => res.status(200).send(product))
      .catch(err => {
        res.status(500).send({errorMessage: "Could not read one product"});
        console.log(err)
      });
  },
  getAllProducts: (req, res, next) => {
    const db = req.app.get('db');
    
    db.read_products()
      .then(products => res.status(200).send(products))
      .catch(err => {
        res.status(500).send({errorMessage: "Could not gather all products"});
        console.log(err)
      });
  },
  updateOneProduct: (req, res, next) => {
    const db = req.app.get('db');
    const {params, query} = req;

    db.update_product([params.id, query.desc])
      .then(() => res.sendStatus(200))
      .catch(err => {
        res.status(500).send({errorMessage: "Could not update one product"});
        console.log(err)
      });
  },
  deleteOneProduct: (req, res, next) => {
    const db = req.app.get('db');
    const {id} = req.params;

    db.delete_product(id)
      .then(() => res.sendStatus(200))
      .catch(err => {
        res.status(500).send({errorMessage: "Could not delete one product"});
        console.log(err)
      });
  }
};