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


// Cache simples em memória (chave: "lat,long")
const weatherCache: Record<string, { data: { temperature: number }; timestamp: number }> = {};

/**
 * Obtém a temperatura atual de uma localização específica,
 * usando cache de 1 hora para evitar chamadas desnecessárias à API.
 *
 * @param {number} latitude - Latitude da cidade/localização desejada.
 * @param {number} longitude - Longitude da cidade/localização desejada.
 * @returns {Promise<{ temperature: number }>} - Objeto contendo a temperatura.
 */
async function getWeather(latitude: number, longitude: number) {
  const cacheKey = `${latitude},${longitude}`;
  const oneHour = 60 * 60 * 1000;
  const now = Date.now();

  // Verifica se existe no cache e se ainda é válido
  if (weatherCache[cacheKey] && now - weatherCache[cacheKey].timestamp < oneHour) {
    return weatherCache[cacheKey].data;
  }

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

    const result = {
      temperature: weather.temperature,
    };

    // Salva no cache
    weatherCache[cacheKey] = {
      data: result,
      timestamp: now,
    };

    return result;

  } catch (error: any) {
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

