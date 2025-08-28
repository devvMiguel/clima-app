import axios from "axios";
import { getWeather } from "..";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Função getWeather", () => {
  test("deve retornar a temperatura quando coordenadas forem válidas", async () => {
    // Simula resposta da API com clima atual
    mockedAxios.get.mockResolvedValueOnce({
      data: { current_weather: { temperature: 30 } },
    });

    const temperatura = await getWeather(-23.55, -46.63);

    expect(temperatura).toBe(30);
  });

  test("deve mostrar erro se a resposta não tiver clima atual", async () => {
    // Simula resposta sem dados
    mockedAxios.get.mockResolvedValueOnce({ data: {} });

    await expect(getWeather(-23.55, -46.63)).rejects.toThrow();
  });
});
