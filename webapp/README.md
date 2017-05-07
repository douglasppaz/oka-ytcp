# OKa Youtube Cached Player - Web App
Aplicação web do OKa YTCP utlizada como interface do usuário.

### .env
O arquivo ```.env``` deve ter as sequintes configurações:

```
YT_API_KEY=[SUA API KEY GERADA NO CONSOLE DE DESENVOLVEDORES DO GOOGLE]
```

A chave ```YT_API_KEY``` deve ser gerada no [console de desenvolvedores do Google](https://console.developers.google.com/) com o YouTube Data API v3 habilitado no projeto.

### Tarefas npm
Você pode executar as tarefas abaixo usando a linha de comando com ```npm run [comando]```

|Tarefa|Descrição|
|------|---------|
|dist|Gera os arquivos de produção na pasta dist/
|start|Inicia um servidor web com Browersync para desenvolvimento
|test|Realiza testes com eslint


### Tecnologias
Somos fans de projetos de código aberto! Segue a lista das tecnologias que usamos.
- babel
- BrowserSync
- eslint
- Pug
- React
- Webpack
