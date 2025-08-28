import axios from "axios";
import inquirer from "inquirer";

// Função para buscar latitude/longitude da cidade
async function getCoordinates(city: string) {
  const response = await axios.get(
    "https://geocoding-api.open-meteo.com/v1/search",
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

// Função para buscar temperatura atual
async function getWeather(latitude: number, longitude: number) {
  const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
    params: {
      latitude,
      longitude,
      current_weather: true,
    },
  });

  return response.data.current_weather.temperature;
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
    const temperature = await getWeather(latitude, longitude);
    console.log(`🌤️ Temperatura atual em ${city}: ${temperature}°C`);
  } catch (err: any) {
    console.error("Erro ao buscar dados:", err.message);
  }
}

main();
