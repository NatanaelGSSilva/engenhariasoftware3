/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable no-return-assign */
import express from 'express';
import cors from 'cors';
import { uuid } from 'uuidv4';

const app = express();

app.use(express.json());
app.use(cors());

let products = [];

app.get('/products', (request, response) => {
  // TODO: listagem de todos os produtos
  response.status(200).json(products);
});

app.post('/products', (request, response) => {
  // TODO: Salvar produto no array products
  const produtosRecebidosBody = request.body; // pode ser varios itens
  const temProduto = products.find(v => v.code == produtosRecebidosBody.code);
  let lovers = 0;
  if(temProduto) {
    lovers = temProduto.lovers;
  }
  const produtosTotais = {id:uuid(), ...produtosRecebidosBody, lovers}

  products.push(produtosTotais);
  response.status(201).json(produtosTotais);
});

app.put('/products/:id', (request, response) => {
  // TODO: Atualiza produto por ID
  const {id} = request.params; // pegar o ID
  const code = request.body.code; // Receber o Novo
  const description = request.body.description; // Receber o Novo
  const buyPrice = request.body.buyPrice; // Receber o Novo
  const sellPrice = request.body.sellPrice; // Receber o Novo
  const tags = request.body.tags;// Receber o Novo

  let product = products.find(value => value.id == id);// pega o objeto com aquele id
  if(product == undefined){
      response.status(400).json({error:'Requisição Invalida'});// mensagem de erro do servidor para o cliente
  }
      product.code = code;
      product.description = description;
      product.buyPrice = buyPrice;
      product.sellPrice = sellPrice;
      product.tags = tags;

      response.status(200).json(product);
  
});

app.delete('/products/:code', (request, response) => {
    // TODO: Remove TODOS os produtos que possuam o código passado por parâmetro
    const {code} = request.params;
    const index = products.findIndex(value => value.code == code);
    if(index == -1){
        response.status(400).json({error:'Requisição Invalida'});
    }
        products.splice(index,1);
        response.status(204).send();
    
});

app.post('/products/:code/love', (request, response) => {
  // TODO: Incrementa em 1 o número de lovers de todos os produtos que possuam 
  // o code do parâmetro
  const {code} = request.params;
  let newProducts = products.filter(value => value.code == code);
  newProducts.map(value => value.lovers = value.lovers+=1);
  response.status(200).json(newProducts[0])
});

app.get('/products/:code', (request, response) => {
  // TODO: Busca de todos os produtos com o código recebido por parâmetro.
  const {code} = request.params;// pegar o codigo recebido pela url
  let buscarProduto = products.filter(value => value.code == code);// retornar o produto com o codigo recebido pela url
  if(buscarProduto==undefined){
    response.status(400).json({error:'Requisição Invalida, Insira o codigo para busca correto'})
  }
  response.status(200).json(buscarProduto);

  
});

export default app;
