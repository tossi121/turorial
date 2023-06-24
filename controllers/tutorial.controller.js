const { Op } = require('sequelize');
const { tutorials: Tutorial } = require('../models');
const multer = require('multer');

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder for uploaded images
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for the uploaded image
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const fileExtension = file.originalname.split('.').pop();
    cb(null, `image-${uniqueSuffix}.${fileExtension}`);
  },
});

// Create the multer upload instance
const upload = multer({ storage });

exports.create = async (req, res) => {
  try {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(500).send({
          message: err.message || 'Error occurred while uploading the image.',
        });
      }

      const { title, description, published } = req.body;
      if (!title) {
        return res.status(400).send({
          message: 'Content can not be empty!',
        });
      }

      const tutorial = {
        title,
        description,
        published: published || false,
        imageUrl: req.file ? req.file.filename : null, // Save the filename of the uploaded image
      };

      const data = await Tutorial.create(tutorial);
      res.send(data);
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the Tutorial.',
    });
  }
};


exports.findAll = async (req, res) => {
  try {
    const { title } = req.query;
    const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    const data = await Tutorial.findAll({ where: condition });
    res.send(data);
  } catch (err) {
    res.sendStatus(500).send({
      message: err.message || 'Some error occurred while retrieving tutorials.',
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Tutorial.findByPk(id);

    if (!data) {
      return res.status(404).send({
        message: `Cannot find Tutorial with id=${id}.`,
      });
    }

    res.send(data);
  } catch (err) {
    res.sendStatus(500).send({
      message: 'Error retrieving Tutorial with id=' + id,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const [num] = await Tutorial.update(req.body, { where: { id } });

    if (num === 1) {
      res.send({
        message: 'Tutorial was updated successfully.',
      });
    } else {
      res.send({
        message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.sendStatus(500).send({
      message: 'Error updating Tutorial with id=' + id,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const num = await Tutorial.destroy({ where: { id } });

    if (num === 1) {
      res.send({
        message: 'Tutorial was deleted successfully!',
      });
    } else {
      res.send({
        message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
      });
    }
  } catch (err) {
    res.sendStatus(500).send({
      message: 'Could not delete Tutorial with id=' + id,
    });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    const nums = await Tutorial.destroy({ where: {}, truncate: false });
    res.send({ message: `${nums} Tutorials were deleted successfully!` });
  } catch (err) {
    res.sendStatus(500).send({
      message: err.message || 'Some error occurred while removing all tutorials.',
    });
  }
};

exports.findAllPublished = async (req, res) => {
  try {
    const data = await Tutorial.findAll({ where: { published: true } });
    res.send(data);
  } catch (err) {
    res.sendStatus(500).send({
      message: err.message || 'Some error occurred while retrieving tutorials.',
    });
  }
};
