
const userModel = require('../models/userSchema');
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
        const { id } = req.params;
        const formation = await formationModel.findById(id).populate("owners"); 

        if (!formation) {
            return res.status(404).json({ message: "Formation not found" });
        }

        res.status(200).json(formation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


  



 
  module.exports.deleteFormationsById = async (req, res) => {
    try {
      const id = req.params.id;
  
      const formationById = await formationModel.findById(id);
  
      if (!formationById || formationById.length === 0) {
        throw new Error("formation introuvable");
      }
  
        
      await userModel.updateMany({}, {
          $pull: {formations: id },
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
  module.exports.affect = async (req, res) => {
    try {
        const { userId, formationId } = req.body;

        const formationById = await formationModel.findById(formationId);
        if (!formationById) {
            throw new Error("formation introuvable");
        }

        const checkIfUserExists = await userModel.findById(userId);
        if (!checkIfUserExists) {
            throw new Error("User not found");
        }

        // Ajouter userId dans owners[] dans formation
        await formationModel.findByIdAndUpdate(formationId, {
            $push: { owners: userId },
        });

        // Ajouter formationId dans formations[] dans user
        await userModel.findByIdAndUpdate(userId, {
            $push: { formations: formationId },
        });

        res.status(200).json("affected");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.desaffect = async (req, res) => {
    try {
        const { userId, formationId } = req.body;

        const formationById = await formationModel.findById(formationId);
        if (!formationById) {
            throw new Error("formation introuvable");
        }

        const checkIfUserExists = await userModel.findById(userId);
        if (!checkIfUserExists) {
            throw new Error("User not found");
        }

        // Supprimer userId de owners[] dans formation
        await formationModel.findByIdAndUpdate(formationId, {
            $pull: { owners: userId },
        });

        // Supprimer formationId de formations[] dans user
        await userModel.findByIdAndUpdate(userId, {
            $pull: { formations: formationId },
        });

        res.status(200).json("desaffected");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

