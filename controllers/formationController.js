const formationModel = require('../models/formationSchema');
module.exports.getAllFormations = async (req, res) => {
    try {
      const formationList = await formationModel.find();
  
      if (!formationList || formationList.length === 0) {
        throw new Error("Aucun formation trouvé");
      }
  
      res.status(200).json(formationList);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  module.exports.getAllFormationsById = async (req, res) => {
    try {
        const id = req.params.id;
      const formation = await formationModel.findById(id).populate("owner");;
  
      if (!formation || formation.length === 0) {
        throw new Error(" formation introuvable");
      }
      res.status(200).json(formationList);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.deleteFormationsById = async (req, res) => {
    try {
      const id = req.params.id;
  
      const formationById = await formationModel.findById(id);
  
      if (!formationById || formationById.length === 0) {
        throw new Error("formationintrouvable");
      }
  
        
      await formationModel.updateMany({}, {
          $pull: { cars: id },
        });
  
      await formationModel.findByIdAndDelete(id);
  
      res.status(200).json("deleted");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  module.exports.addFormations = async (req, res) => {
    try {
      const { id_f, titre, contenu, departement } = req.body;
      if (!id_f & !titre & !contenu & !departement) {
        throw new Error("errue data");
      }
  
      const formation = await formationModel.create({
        id_f,
        titre,
        contenu,
        departement,
      });
  
      res.status(200).json({ formation });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.updateFormations = async (req, res) => {
    try {
      const id = req.params.id;
      const { id_f, titre, contenu, departement } = req.body;
  
      const formationById = await formationModel.findById(id);
  
      if (!formationById) {
        throw new Error("formation introuvable");
      }
  
      if (!id_f & !titre & !contenu & !departement) {
        throw new Error("errue data");
      }
  
      await formationModel.findByIdAndUpdate(id, {
        $set: { id_f, titre, contenu, departement },
      });
  
      const updated = await formationModel.findById(id);
  
      res.status(200).json({ updated });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };