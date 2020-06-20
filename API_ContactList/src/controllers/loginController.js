// Importando o Login do model, ele é o responsavel pela modelagem e validação dos dados.
const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    // Caso o usuario esteja logado sumimos com a pagina de login/criar conta. Podemos testar sempre se há um usuario usando a session.user
    if (req.session.user) return res.render('login-logado');
    res.render('login');
};

// Criando método de registro --  Faremos a validação dos dados no model pois ele é o responsavel, estaremos utilizando a classe Login construida lá.
exports.register = async (req, res) => {
    try {
        const login = new Login(req.body);
        // Uma vez que o meu metodo register é uma promisse e o estamos usando precisamos estender a promessa até aqui
        await login.register();
        
        if (login.errors.length > 0) {
            // Mensagens de flash -- Caso exista um erro, instaciamos um "errors" e passamos o erro no caso "login.errors".
            req.flash('errors', login.errors);
            // Quando um erro é lançado precisamos salvar a seção e retornar para anterior.
            req.session.save(function () {
                return res.redirect('back');
            })
            return;
        }

        req.flash('success', 'Seu usuário foi criado com sucesso.')
        req.session.save(function () {
            return res.redirect('back');
        });
    } catch (e) {
        console.log(e);
        res.render('404');
    }
};

exports.login = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.login();
        
        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function () {
                return res.redirect('back');
            })
            return;
        }

        req.flash('success', 'Usuário logado com sucesso')
        req.session.user = login.user;
        req.session.save(function () {
            return res.redirect('back');
        });
    } catch (e) {
        console.log(e);
        res.render('404');
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}