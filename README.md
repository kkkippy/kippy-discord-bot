# Visão geral
O bot foi projetado para ser utilizado em um único servidor, portanto, terá de modificar muitas coisas para torná-lo público.

O bot foi desenvolvido por Kippy (eu mesmo), e ele se encontra em [meu servidor do Discord](https://discord.com/invite/GtFDNCsqMq).

# Instalação
Para instalar as dependências utilizadas pelo bot, basta executar `npm i` na pasta do bot.

# Observação
Ao clonar este repositório, certifique-se de criar um arquivo `config.json` com as seguintes entradas:
```json
{
    "token": "Token do seu bot",
    "clientId": "ID do seu bot",
    "mongooseUri": "URI da sua database do MongoDB"
}
```

Após isso, basta executar o arquivo `index.ts` usando o [tsx](https://www.npmjs.com/package/tsx).
Instale-o executando `npm i -g tsx` em seu terminal.