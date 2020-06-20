O model é a parte do MVC responsavel pela manipulação dos dados desde validações, modelagem, acesso ao banco de dados e demais operações.

Para uma utilização mais completa dos recursos disponibilzados pela linguagem utilizei nesta seção dois jeitos de manipular os dados no model, um dos jeitos foi através de Factory Functions ContatoModel.js e o outro através de Classes LoginModel.js

Para começar o framework utilizado para realizar a modelagem dos dados foi o (mongoose) também importamos o (validator) pois ajudou a realizar uma validação no email.

Nota: Para realizarmos importações de arquivos que estão no (node_modules) não precisamos escrever o caminho, apenas dizemos o nome da extensão.

Mongoose:

Importação do mongoose para o sistema

O schema descreve quais dados deverão ser registrados na base de dados. O comando "mongoose.Schema()" recebe um objeto como parametro. Este objeto é a definição das chaves e valores dos dados. Para cada chave passamos um objeto para definir as cofigurações dos valores.

O comando "ContatoModel = mongoose.model(nome, schema)" recebe como parametro, o nome do model, e em seguida o schema criado anteriormente utilizaremos o retorno deste comando posteriomente para navegar pela base dados, podemos fazer diversas operações sendo as exploradas nesse projeto as CRUD.

Em seguida elaboramos a função construtora ou classe e definimos para ela três chaves sendo elas {body, errors, user} cada chave é responsavel por guardar valores que serão utilizados de diversas formas dentro da classe. 
Vale ressaltar que o body já é diretamente instanciado junto com a classe ou seja ele vem por padrão dos controllers. O body possui os dados que foram inseridos pelo cliente, os mesmos dados que ja haviam sido previamente modelados no schema.

"cleanUp()".
A primeira verifição trata de verificar se todos os campos do body estão em formato de string, caso não estejam uma string vazia é atribuida a eles.
Em seguida fazemos um espécie de validação aonde forçamos o body utilizado pela classe a ter apenas as chaves que nós achamos convenientes. Ou seja utlizamos o mesmo nome das chaves escritas anteriormente no schema e atribuimos os valores que estamos recebendo no body, vale ressaltar que quando acessamos um campo especifico do body precisamos que o name esteja definido no html.

"valida()".
Como o nome ja diz essa função é responsavel pela validação dos dados ela é de certa forma bem simples é apenas realizado trës verificações:
Primeira: Caso o email exista se ele não for valido adicionamos um erro. Aqui que utilizamos a extensao validator através do comando (!validator.isEmail(email)).
Segunda: Verificamos se o campo nome é valido caso não seja adicionamos um erro.
Terceira: Verificamos se pelo menos um dos campos telefone ou email estão preenchidos caso não adicionamos um erro.

"register()"
Usaremos em todas nossas funcionalidades a funcao valida, fazemos um teste caso exista erro para o programa parar.
Essa função faz uma solicitação para criar um novo registro no banco de dados utilizamos o comando "await ContatoModel.create(body)" analisando esse comando percebemos algumas coisas, primeiramente ele é uma promisse por isso a função register deve ser async e esse comando deve conter await, segundo ele está inserindo o {body} no banco de dados ou seja nosso corpo previamente formatado pela função "cleanUp()" agora vai para o banco de dados.

As outras funções usam dessa mesma base para realizar seu trabalho apenas fazem atividades diferentes vamos explorar elas mais rapidamente.
"edit(id)" -> utiliza o comando "await ContatoModel.findByIdAndUpdate(id, this.body, { new: true })" utilizamos o id do usuario para o procurar e edita-lo no banco de dados, a funcao recebe o parametro id, o corpo com os dados a serem editados, e o new diz para retornar o objeto já modificado.
"buscaPorId(id)" -> utiliza o comando "await ContatoModel.findById(id)" recebe o id como parametro e retorna o usuario.
"buscaContatos()" -> utiliza o comando "await ContatoModel.find().sort({ criadoEm: -1 })" o find() retorna os contatos da base de dados após isso o sort os organiza em ordem decrescente.
"delete()" -> utiliza o comando "await ContatoModel.findOneAndDelete({_id: id})" esse comando recebe um objeto como parametro sendo a chave _id o id do usuario a ser deletado.

Por ultimo exportamos a nossa classe ou funcao para a utilizarmos nos controllers.
