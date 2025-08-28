import axios from "axios";
import { getCoordinates } from "..";


// O Jest vai "fingir" ser o axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Função getCoordinates", () => {
  test("deve retornar latitude e longitude quando a cidade existir", async () => {
    // Simula a resposta da API
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        results: [{ latitude: -23.55, longitude: -46.63 }],
      },
    });

    const coords = await getCoordinates("São Paulo");

    // Espera que retorne um objeto com latitude e longitude
    expect(coords).toEqual({ latitude: -23.55, longitude: -46.63 });
  });

  test("deve mostrar erro quando a cidade não for encontrada", async () => {
    // Simula API sem resultados
    mockedAxios.get.mockResolvedValueOnce({ data: { results: [] } });

    await expect(getCoordinates("CidadeInexistente")).rejects.toThrow(
      "Cidade não encontrada."
    );
  });

  test("deve mostrar erro quando a API falhar", async () => {
    // Simula falha da API
    mockedAxios.get.mockRejectedValueOnce(new Error("Erro de rede"));

    await expect(getCoordinates("Recife")).rejects.toThrow("Erro de rede");
  });
});
