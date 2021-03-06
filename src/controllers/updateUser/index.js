const User = require('../../models/user')

const crypto = require("crypto");
const {
    CRYPTO_ALG,
    CRYPTO_SECRET, CRYPTO_TYPE
} = process.env
function criptografar(senha) {
    const cipher = crypto.createCipher(CRYPTO_ALG, CRYPTO_SECRET)
    cipher.update(senha);
    return cipher.final(CRYPTO_TYPE)
}
async function updateUser(req, res) {
    const nome = req.body.nome;
    const cpf = req.body.cpf;
    const email = req.body.email;
    const username = req.body.username;
    const senha = criptografar(req.body.senha);

    try {
        const user = await User.findByPk(cpf);
        if (user.senha == senha) {
            //TODO -> Usar switchcase ao invés de if

            if (nome != null)
                user.nome = nome;

            if (email != null)
                user.email = email;

            if (username != null)
                user.username = username;

            if (senha != null)
                user.senha = senha;
            await user.save()
            res.status(200).json('Update succesfully')
        } else {
            res.status(401).json('Unauthorized')

        }



    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}
module.exports = updateUser