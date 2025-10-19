import React, { useState, useRef, useEffect } from "react";
import type { ChatMessage } from "../types";
import { getTutorResponse } from "../services/geminiService";
import { PaperAirplaneIcon, BackArrowIcon } from "./icons/Icons";

const Tutor: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      text: `Olá, meu jovem detetive! Que legal que você veio me procurar! 🕵️‍♂️

Eu posso te ajudar a entender direitinho esses assuntos que vão cair na sua prova, sabe? É como se eu fosse um mapa do tesouro que te leva direto para o conhecimento! 🗺️✨

Por exemplo, podemos:

- **Desvendar as palavras:** Vou te mostrar como algumas palavras são "pais" de outras (primitivas) e como as "filhas" (derivadas) nascem delas. É como uma árvore genealógica das palavras! 🌳
- **Encontrar os "códigos secretos" das palavras:** Vamos descobrir os **prefixos** (letrinhas que vêm antes e mudam o sentido, tipo um "superpoder" pra palavra) e os **sufixos** (letrinhas que vêm depois e também modificam a palavra). 🕵️‍♀️
- **Virar um detetive de histórias:** Vou te ensinar a reconhecer quem são os **personagens** (os heróis e vilões!), onde a história acontece (**cenário**), qual é o **conflito** (o problema que eles têm que resolver!) e como tudo termina (**resolução**). 📖
- **Descobrir quem está contando a história:** Vamos ver se é um personagem (1ª pessoa, que diz "eu") ou se é alguém de fora, como um narrador observador (3ª pessoa, que fala "ele" ou "ela"). 👀
- **Ler nas entrelinhas:** Essa é a parte mais legal! É como ser um detetive de verdade e encontrar pistas no texto para entender o que não está escrito, mas que a gente percebe! 💡

Então, pensa em qual desses assuntos você quer começar a explorar hoje! Me diga qual deles te deixa mais curioso ou qual você acha que precisa de uma ajudinha extra. Estou aqui pra você! 😊`,
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const history = [...messages];
    const responseText = await getTutorResponse(history, input);

    const modelMessage: ChatMessage = { role: "model", text: responseText };
    setMessages((prev) => [...prev, modelMessage]);
    setIsLoading(false);
  };

  return (
    <div className="animate-fade-in">
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center px-4 py-2 border border-transparent text-base font-bold rounded-full shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        <BackArrowIcon /> Voltar para o Menu
      </button>

      <div className="flex flex-col h-[80vh] bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl font-black text-center text-indigo-800 p-4 border-b-2 border-slate-100">
          Tutor de Português
        </h1>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-md lg:max-w-2xl p-4 rounded-2xl shadow-sm ${
                  msg.role === "user"
                    ? "bg-purple-600 text-white rounded-br-none"
                    : "bg-slate-100 text-slate-800 rounded-bl-none"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-sm p-3 rounded-2xl bg-slate-100 rounded-bl-none shadow-sm">
                <div className="flex items-center space-x-2">
                  <span className="h-2 w-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="h-2 w-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="h-2 w-2 bg-slate-500 rounded-full animate-bounce"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <form
          onSubmit={handleSendMessage}
          className="p-4 border-t-2 border-slate-100 bg-white rounded-b-2xl"
        >
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua dúvida aqui..."
              className="flex-1 w-full p-3 border border-slate-300 rounded-full shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all"
            >
              <PaperAirplaneIcon />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Tutor;
