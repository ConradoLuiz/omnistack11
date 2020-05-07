const crypto = require('crypto');

const connection = require('../database/connection');

module.exports = { 
    async index (req, res){
        const result = await connection('ongs').select('*');
    
        return res.json({
            ongs: result
        });
    },

    async create (req, res) {
        const {name, email, whatsapp, city, uf} = req.body;
        
        const id = crypto.randomBytes(4).toString('HEX');
        
        console.log(id, name, email, whatsapp, city, uf);
    
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })
    
        return res.json({
            meta: {
                id,
                name,
                email,
                whatsapp,
                city,
                uf
            }
        })
    }

};