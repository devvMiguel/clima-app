# 🌤️ Clima App - TypeScript

Um aplicativo simples de clima feito em **TypeScript**, que permite consultar a **temperatura atual** de qualquer cidade usando a API [Open-Meteo](https://open-meteo.com/).  
O projeto foi criado para praticar consumo de APIs, boas práticas de organização de código e testes automatizados.

---

## 📌 Visão geral do projeto

- Receber o nome de uma cidade como entrada do usuário.  
- Buscar a **latitude e longitude** da cidade usando a API de geocodificação.  
- Consultar a **temperatura atual** usando a API de clima.  
- Exibir os dados de forma clara e amigável no terminal.  
- Registrar erros de requisição em arquivo de log.  

---

## 🛠️ Tecnologias utilizadas

- **Node.js** (runtime)  
- **TypeScript** (linguagem)  
- **Axios** (requisições HTTP)  
- **Inquirer** (entrada do usuário via terminal)  
- **dotenv** (variáveis de ambiente)  
- **Jest** (testes automatizados)  

---

## 📋 Pré-requisitos

- Node.js >= 18  
- npm  

---

## 🚀 Instalação e uso

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/clima-app.git
   cd clima-app
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente criando um arquivo **.env** na raiz do projeto:
   ```
   GEOCODING_API=https://geocoding-api.open-meteo.com/v1/search
   CLIMA_API=https://api.open-meteo.com/v1/forecast
   ```

4. Execute o projeto:
   ```bash
   npx ts-node src/index.ts
   ```

5. Digite o nome da cidade quando solicitado:

**Exemplo:**
```
Entrada:
Digite o nome da cidade: Recife

Saída:
🌤️ Temperatura atual em Recife: 28°C
```

---

## ✅ Funcionalidades

- Buscar **coordenadas (latitude/longitude)** de uma cidade.  
- Consultar **temperatura atual**.  
- Tratar erros de entrada de usuário (cidades inválidas).  
- Tratar erros de rede/API fora do ar.  
- Registro de erros em arquivo de log.  

---

## 🧪 Testes

Este projeto conta com uma suíte de testes automatizados em **TypeScript com Jest**.  
Os testes cobrem tanto casos comuns quanto extremos.

### Casos cobertos:
**Geocoding (coordenadas)**
- Cidade válida retorna latitude/longitude.  
- Cidade inexistente retorna erro apropriado.  
- API fora do ar retorna erro tratado.  

**Clima (previsão do tempo)**
- Cidade válida retorna temperatura atual.  
- API válida mas sem `current_weather` retorna erro apropriado.  
- API fora do ar retorna erro tratado.  

### Como rodar os testes
```bash
npm test
```

---

## 📂 Estrutura do projeto

```
clima-app/
├── package.json
├── tsconfig.json
├── .gitignore
└── src/
    ├── index.ts         # Ponto de entrada
    ├── api/             # Chamadas à API
    ├── services/        # Regras de negócio
    ├── utils/           # Funções auxiliares
    ├── types/           # Tipos TypeScript
    ├── ui/              # Entrada/saída com usuário
    ├── config/          # Constantes e configurações
    └── tests/           # Testes unitários
```

---

## 🔮 Melhorias futuras

- Exibir **velocidade do vento e umidade**.  
- Implementar suporte para **5 dias de previsão**.  
- Criar interface gráfica simples (ex: com Electron ou web).  
- Melhorar logs para incluir data/hora detalhada.  

---

## 👨‍💻 Desenvolvido por

**Miguel Galvão Ferreira**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ferreir4miguel)  
[![Outlook](https://img.shields.io/badge/Outlook-0078D4?style=for-the-badge&logo=microsoft-outlook&logoColor=white)](mailto:miguelgalvao_galvao@hotmail.com)  

---

## 📜 Licença

**MIT** - Sinta-se livre para usar, modificar e compartilhar este projeto.  

