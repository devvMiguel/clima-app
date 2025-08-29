import axios from "axios";
import inquirer from "inquirer";
import dotenv from "dotenv";

dotenv.config();

const GEOCODING_API = process.env.GEOCODING_API!;
const CLIMA_API = process.env.CLIMA_API!;

// Função para buscar latitude/longitude da cidade
async function getCoordinates(city: string) {
  const response = await axios.get(
    GEOCODING_API,
    {
      params: {
        name: city,
        count: 1,
        language: "pt",
        format: "json",
      },
    }
  );

  if (!response.data.results || response.data.results.length === 0) {
    throw new Error("Cidade não encontrada.");
  }

  const { latitude, longitude } = response.data.results[0];
  return { latitude, longitude };
}


/**
 * Obtém a temperatura atual de uma localização específica
 * a partir da API Open-Meteo.
 *
 * Esta função realiza uma requisição HTTP para buscar dados
 * de clima atuais com base em latitude e longitude fornecidos.
 *
 * @param {number} latitude - Latitude da cidade/localização desejada.
 * @param {number} longitude - Longitude da cidade/localização desejada.
 *
 * @returns {Promise<{ temperature: number }>} - Objeto contendo:
 *   - `temperature`: temperatura atual em graus Celsius.
 *   (Outros atributos como `windspeed`, `winddirection` e `time`
 *    podem ser adicionados futuramente.)
 *
 * @throws {Error} - Lança erro nos seguintes casos:
 *   - Quando os dados de clima não estão disponíveis na resposta.
 *   - Quando a API retorna erro de status HTTP (ex: 404, 500).
 *   - Quando não há resposta da API (problema de rede/conexão).
 *   - Em erros inesperados no processamento da requisição.
 *
 * @example
 * ```ts
 * const clima = await getWeather(-8.05, -34.9); // Recife
 * console.log(`🌡️ Temperatura: ${clima.temperature}°C`);
 * // Saída esperada:
 * // 🌡️ Temperatura: 28°C
 * ```
 */
// Função para buscar temperatura atual
async function getWeather(latitude: number, longitude: number) {
  try {
    const response = await axios.get(CLIMA_API, {
      params: {
        latitude,
        longitude,
        current_weather: true,
      },
    });

    const weather = response.data?.current_weather;

    if (!weather) {
      throw new Error("Dados de clima indisponíveis no momento.");
    }

    return {
      temperature: weather.temperature,
      // windspeed: weather.windspeed,
      // winddirection: weather.winddirection,
      // time: weather.time,
    };
  } catch (error: any) {
    // Tratamento de erros mais informativo
    if (error.response) {
      throw new Error(
        `Erro na API (${error.response.status}): ${error.response.statusText}`
      );
    } else if (error.request) {
      throw new Error("Sem resposta da API. Verifique sua conexão.");
    } else {
      throw new Error(`Erro inesperado: ${error.message}`);
    }
  }
}

// Função principal
async function main() {
  const { city } = await inquirer.prompt<{ city: string }>([
    {
      type: "input",
      name: "city",
      message: "Digite o nome da cidade:",
    },
  ]);

  try {
    const { latitude, longitude } = await getCoordinates(city);
    const weather = await getWeather(latitude, longitude);

    console.log(`🌤️ Temperatura atual em ${city}: ${weather.temperature}°C`);

  } catch (err: any) {
    console.error("Erro ao buscar dados:", err.message);
  }
}

export { getCoordinates, getWeather };


main();

