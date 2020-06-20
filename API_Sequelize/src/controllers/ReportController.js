const { Op } = require('sequelize');
const User = require('../models/User');

module.exports = {
    async show(req, res) {
        // Encontrar todos os usuários que tem email que termina com @rocketseat.com.br
        // Destes usuários, quero buscar todos que mora na rua Papa João XXIII
        // Destes usuários eu quero buscar as tecnologias que começam com React

        const users = await User.findAll({
            attributes: ['name', 'email'],
            where: {
                email: {
                    [Op.like]: '%@rocketseat.com.br',
                }
            },
            include: [
                { association: 'addresses', where: { street: 'Rua Papa João XXIII' } },
                { 
                    association: 'techs', 
                    required: false,
                    where: {
                        name: {
                            [Op.like]: 'React%'
                        }
                    }
                },
            ]
        });

        return res.json(users);
    }
};