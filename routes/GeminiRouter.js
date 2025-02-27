

const express = require("express");

const { GoogleGenerativeAI } = require("@google/generative-ai");
const router = express.Router(); 
// Remplace "YOUR_API_KEY" par ta clé API Gemini
const genAI = new GoogleGenerativeAI("AIzaSyDfddPCh0XmAMgpGT1eJaE9_u-T2OrQNnM");

// Route pour générer du contenu avec Gemini
router.post("/generate", async (req, res) => {
    try {
        // Vérifier si le corps de la requête contient bien un "prompt"
        if (!req.body.prompt) {
            return res.status(400).json({ error: "Le champ 'prompt' est requis." });
        }

        const prompt = req.body.prompt;

        // Initialiser le modèle Gemini
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        // Générer le contenu
        const result = await model.generateContent({
            contents: [{ parts: [{ text: prompt }] }]
        });

        // Récupérer la réponse de Gemini
        const response = result.response?.candidates?.[0]?.content?.parts?.[0]?.text;

        // Vérifier si une réponse a bien été générée
        if (!response) {
            return res.status(500).json({ error: "Aucune réponse générée par l'API Gemini." });
        }

        res.json({ response });

    } catch (error) {
        console.error("Erreur lors de la génération :", error);
        res.status(500).json({ error: "Erreur lors de la génération du contenu." });
    }
});

module.exports = router;