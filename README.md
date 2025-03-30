# Teste Técnico - Vício de uma estudante
## Tecnologias

- [Next.JS](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Docker](https://www.docker.com/)

## Requisitos
- [Docker](https://www.docker.com/) deve estar instalado!!!

## Iniciando a aplicação
### Realize o clone ou baixe o ZIP do repositório, em seguida acesse o diretório

```bash
  $ git clone https://github.com/Nitael-dev/teste_tecnico_vdue.git
  $ cd teste_tecnico_vdue
```

### Rode a imagem Docker da aplicação
```bash
  $ docker compose up
```

### Acesse a aplicação e cronometre seu tempo de estudo nas disciplinas e temas da plataforma, em qualquer Navegador
```bash
  http://localhost:3000/
```
## Pontos-chave do projeto e considerações sobre o teste

A solução foi realizada de acordo com o documento proposto, com potencial de escalabidade. As regras da aplicação passo-a-passo são: selecionar uma disciplina, selecionar um tema e controlar o cronômetro na parte inferior da tela. O cronômetro tem funcionamento tradicional e oferece cinco ações: ininiar, pausar, retomar, parar e salvar. Os diferenciais são as ações de parar e salvar, que possuem funções distintas em relação a persistência de dados. Ao clicar em salvar, todo o tempo rastreado é adicionado ao total estudado e a última sessão, já ao clicar em parar, o tempo rastreado não é implementado ao total estudado e apenas é salvo como última sessão.

Sobre as tecnologias, utilizei a biblioteca de componentes customizáveis [ShadCN](https://ui.shadcn.com/docs) para a criação de componentes otimizados, recicláveis e customizáveis, tendo em mente que se encaixa ao uso de [TailwindCSS](https://tailwindcss.com/) como meio principal de customização.

Espero muito fazer parte do time e agradeço pelo desafio.
