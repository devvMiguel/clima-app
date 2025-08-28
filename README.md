# 🌤️ Clima App - TypeScript

Um aplicativo simples de clima feito em **TypeScript** desenvolvido utilizando IA que permite consultar a temperatura atual de qualquer cidade usando a API [Open-Meteo](https://open-meteo.com/).

---

##  Objetivo do projeto

- Receber o nome de uma cidade como entrada do usuário.
- Buscar a latitude e longitude da cidade usando a API de geocodificação.
- Consultar a temperatura atual usando a API Open-Meteo.
- Exibir a temperatura de forma clara e amigável no terminal.

---

##  Tecnologias utilizadas

- **Node.js** (runtime)
- **TypeScript** (linguagem)
- **Axios** (requisições HTTP)
- **Inquirer** (entrada do usuário via terminal)

---

##  Pré-requisitos

- Node.js >= 18
- npm

---

##  Como usar

1. Clone o projeto:

```bash
git clone https://github.com/seu-usuario/weather-app.git
cd clima-app

```

2. Instale as dependências:

```bash
npm install

```

3. Execute o projeto:
```bash
npx ts-node src/index.ts

```

4. Digite o nome da cidade quando solicitado:

Example:

Entrada:
Digite o nome da cidade: Recife

Saída:
🌤️ Temperatura atual em Recife: 28°C


## Estrutura do projeto:

```
clima-app/
│── package.json
│── tsconfig.json
│── .gitignore
│── src/
│   ├── index.ts        # Ponto de entrada
│   ├── api/            # Chamadas à API
│   ├── services/       # Regras de negócio
│   ├── utils/          # Funções auxiliares
│   ├── types/          # Tipos TypeScript
│   ├── ui/             # Entrada/saída com usuário
│   └── config/         # Constantes e configurações
```


## Desenvolvido por:

Desenvolvido por **Miguel Galvão Ferreira**.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ferreir4miguel)

[![Outlook](https://img.shields.io/badge/Outlook-0078D4?style=for-the-badge&logo=microsoft-outlook&logoColor=white)](mailto:miguelgalvao_galvao@hotmail.com)


## Licença:

**MIT** - Sinta-se livre para usar, modificar e compartilhar este projeto.