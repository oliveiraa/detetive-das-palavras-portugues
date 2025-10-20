import type { TestAnswers, ChatMessage } from "../types";

// Direct fetch calls to our proxy instead of using @google/genai library
const PROXY_BASE_URL = "/api-proxy";
let chatHistory: ChatMessage[] = [];

const TUTOR_SYSTEM_INSTRUCTION = `
Você é o Professor Sábio, um tutor amigável e paciente. Sua missão é ajudar uma criança de 9 anos a estudar para uma prova de português. O conteúdo que você deve ensinar é EXCLUSIVamente sobre:
1.  Palavras Primitivas e Derivadas (famílias de palavras).
2.  Prefixos e Sufixos (superpoderes das palavras).
3.  Elementos da Narrativa (Personagens, Cenário, Conflito, Resolução).
4.  Ponto de Vista (Narrador em 1ª ou 3ª pessoa).
5.  Inferência (ler nas entrelinhas).

REGRAS IMPORTANTES:
- Responda de forma simples, curta e muito encorajadora.
- Use emojis para deixar a conversa divertida. 🦉✨
- SEMPRE se mantenha DENTRO dos tópicos listados acima.
- Se a criança perguntar algo fora do tópico (como matemática, jogos ou outros assuntos), responda gentilmente: "Essa é uma ótima pergunta! Mas nossa missão agora é focar nos segredos das palavras e histórias. Que tal voltarmos para o nosso mapa do tesouro? 😉".
- Trate a criança como um "jovem detetive".
`;

const getTestEvaluationPrompt = (answers: TestAnswers) => `
Você é um professor muito gentil e encorajador, avaliando a prova de um aluno de 9 anos. O nome do aluno é ${answers.name || "Jovem Detetive"}.

Aqui estão as respostas dele:
- Pergunta 1 (Família da palavra SOL): "${answers.question1 || "Não respondeu"}"
- Pergunta 2a (gosto + -oso): Palavra: "${answers.question2a_word || "Não respondeu"}". Significado: "${answers.question2a_meaning || "Não respondeu"}"
- Pergunta 2b (surfar + -ista): Palavra: "${answers.question2b_word || "Não respondeu"}"
- Pergunta 2c (justo + in-): Palavra: "${answers.question2c_word || "Não respondeu"}"
- Pergunta 3 (Profissões): Dentista: "${answers.question3_dentist || "Não respondeu"}", Pintor: "${answers.question3_painter || "Não respondeu"}", Floricultura: "${answers.question3_flowershop || "Não respondeu"}"
- Pergunta 4 (Personagens): "${answers.question4 || "Não respondeu"}"
- Pergunta 5 (Conflito): "${answers.question5 || "Não respondeu"}"
- Pergunta 6 (Narrador): "${answers.question6 || "Não respondeu"}"
- Pergunta 7 (Inferência - plano do esquilo): "${answers.question7 || "Não respondeu"}"

Aqui está o gabarito com as respostas esperadas:
- Pergunta 1: Exemplos: SOLAR (relativo ao sol), ENSOLARADO (com muito sol), GIRASSOL (flor que gira para o sol). O importante é ter "sol" na base e fazer sentido.
- Pergunta 2a: Palavra: "gostoso". Significado: "cheio de gosto" ou "com muito sabor".
- Pergunta 2b: Palavra: "surfista".
- Pergunta 2c: Palavra: "injusto".
- Pergunta 3: Dentista, Pintor, Floricultura.
- Pergunta 4: O esquilo e o gato.
- Pergunta 5: O esquilo está com medo porque o gato quer caçá-lo, e o esquilo está pensando em um plano para se defender ou enganar o gato.
- Pergunta 6: Alguém de fora contando a história (em 3ª pessoa).
- Pergunta 7: Que o esquilo ia enganar o gato, pregar uma peça, jogar algo nele, etc. A ideia é que ele não ia ficar parado esperando.

Sua tarefa é comparar as respostas do aluno com o gabarito e fornecer um feedback em português.
- Para cada questão, diga se está certa ou o que pode ser melhorado.
- Use uma linguagem simples, positiva e que uma criança de 9 anos entenda.
- Comece o feedback com "### Olá, detetive ${answers.name || "!"}! 🕵️‍♂️\n\nAnalisei sua missão e aqui está o resultado:".
- Use emojis para deixar o texto mais amigável.
- Use markdown para formatar o texto (títulos com '###', listas com '*' e negrito com '**').
- Termine com uma mensagem de incentivo como "Você foi incrível nesta missão! Continue praticando e você se tornará um mestre detetive das palavras! 🌟".
- Não dê uma nota numérica. Apenas o feedback qualitativo.
- Seja breve e direto em cada ponto.
`;

// Helper function to make API calls through our proxy
const callGeminiAPI = async (contents: any[], systemInstruction?: string) => {
  const requestBody: any = {
    contents: contents,
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 12288,
    },
  };

  if (systemInstruction) {
    requestBody.systemInstruction = {
      parts: [{ text: systemInstruction }],
    };
  }

  const response = await fetch(`${PROXY_BASE_URL}/v1beta/models/gemini-2.5-flash:generateContent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`API Error: ${response.status} - ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
};

export const evaluateTest = async (answers: TestAnswers): Promise<string> => {
  try {
    const prompt = getTestEvaluationPrompt(answers);
    const response = await callGeminiAPI([{ role: "user", parts: [{ text: prompt }] }]);
    return response;
  } catch (error) {
    console.error("Error evaluating test:", error);
    return "Ops! Ocorreu um erro ao tentar corrigir sua prova. Por favor, tente novamente mais tarde.";
  }
};

export const getTutorResponse = async (
  history: ChatMessage[],
  newMessage: string,
): Promise<string> => {
  try {
    // Build conversation history for the API
    const conversationHistory = [
      {
        role: "user",
        parts: [{ text: TUTOR_SYSTEM_INSTRUCTION }],
      },
      ...history.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      })),
      {
        role: "user",
        parts: [{ text: newMessage }],
      },
    ];

    const response = await callGeminiAPI(conversationHistory);
    return response;
  } catch (error) {
    console.error("Error getting tutor response:", error);
    return "Oh não! Meu cérebro de coruja deu um nó. Podemos tentar essa pergunta de novo?";
  }
};
