import React, { useState } from 'react';
import type { TestAnswers } from '../types';
import { evaluateTest } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';
import { BackArrowIcon } from './icons/Icons';

const initialAnswers: TestAnswers = {
  name: '',
  question1: '',
  question2a_word: '',
  question2a_meaning: '',
  question2b_word: '',
  question2c_word: '',
  question3_dentist: '',
  question3_journalist: '',
  question3_flowershop: '',
  question4: '',
  question5: '',
  question6: '',
  question7: '',
};

interface TestProps {
  onBack: () => void;
}

const Test: React.FC<TestProps> = ({ onBack }) => {
  const [answers, setAnswers] = useState<TestAnswers>(initialAnswers);
  const [feedback, setFeedback] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAnswers(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback('');
    const result = await evaluateTest(answers);
    setFeedback(result);
    setIsLoading(false);
    window.scrollTo(0, document.body.scrollHeight);
  };

  const StoryBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-4 my-4 italic text-slate-800">
      {children}
    </div>
  );

  const Input = (props: React.ComponentProps<'input'>) => (
    <input {...props} className="w-full p-3 bg-white border border-slate-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 transition" />
  );

  const Textarea = (props: React.ComponentProps<'textarea'>) => (
     <textarea {...props} className="w-full p-3 bg-white border border-slate-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 transition" />
  );
  
  return (
    <div className="animate-fade-in">
      <button onClick={onBack} className="mb-6 inline-flex items-center px-4 py-2 border border-transparent text-base font-bold rounded-full shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
        <BackArrowIcon /> Voltar para o Menu
      </button>

      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
        <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-black text-indigo-800">Mini Prova do Detetive: Desafio Avançado! 🏆</h1>
            <p className="text-lg text-slate-600 mt-2">Mostre suas habilidades de detetive respondendo às questões abaixo!</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-10">
          <div>
            <label htmlFor="name" className="block text-lg font-bold text-slate-700 mb-2">Nome do Detetive:</label>
            <Input
              type="text"
              id="name"
              name="name"
              value={answers.name}
              onChange={handleInputChange}
              placeholder="Seu nome de agente secreto aqui!"
            />
          </div>

          {/* Parte 1 */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-indigo-700 border-b-2 border-indigo-200 pb-2">Parte 1: Fábrica de Palavras ✍️</h2>
            
            <div className="space-y-2">
              <label htmlFor="question1" className="font-bold text-lg">1. A palavra primitiva é <strong>"SOL"</strong>. Escreva no mínimo 3 palavras derivadas dessa família e explique o que significam.</label>
              <Textarea id="question1" name="question1" value={answers.question1} onChange={handleInputChange} rows={4} placeholder="Exemplo: SOLAR - relativo ao sol, ou casa com painéis solares"></Textarea>
            </div>

            <div className="space-y-2">
              <p className="font-bold text-lg">2. Complete as frases formando palavras derivadas com os sufixos/prefixos indicados:</p>
              <div className="space-y-4 ml-4">
                <div className="space-y-2">
                  <label>a) O bolo de chocolate ficou muito ___________ (sufixo: -oso).</label>
                  <Input type="text" name="question2a_word" value={answers.question2a_word} onChange={handleInputChange} placeholder="Palavra criada"/>
                  <Input type="text" name="question2a_meaning" value={answers.question2a_meaning} onChange={handleInputChange} placeholder="Significado: O bolo é cheio de..."/>
                </div>
                <div className="space-y-2">
                   <label>b) O carteiro trouxe muitas cartas para a ___________ (palavra primitiva: carta, sufixo: -ista).</label>
                  <Input type="text" name="question2b_word" value={answers.question2b_word} onChange={handleInputChange} placeholder="Palavra criada"/>
                </div>
                 <div className="space-y-2">
                  <label>c) Ele não era justo, era _____________ (prefixo: in-).</label>
                  <Input type="text" name="question2c_word" value={answers.question2c_word} onChange={handleInputChange} placeholder="Palavra criada"/>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-bold text-lg">3. Detetive de Profissões – Escreva o nome da profissão ou do lugar:</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-600 mb-1">a) Quem cuida de dentes?</label>
                  <Input type="text" name="question3_dentist" value={answers.question3_dentist} onChange={handleInputChange} placeholder="Digite a profissão..."/>
                </div>
                <div>
                  <label className="block text-slate-600 mb-1">b) Quem trabalha com jornal?</label>
                  <Input type="text" name="question3_journalist" value={answers.question3_journalist} onChange={handleInputChange} placeholder="Digite a profissão..."/>
                </div>
                <div>
                  <label className="block text-slate-600 mb-1">c) Onde se vende flores?</label>
                  <Input type="text" name="question3_flowershop" value={answers.question3_flowershop} onChange={handleInputChange} placeholder="Digite o nome do lugar..."/>
                </div>
              </div>
            </div>
          </div>

          {/* Parte 2 */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-indigo-700 border-b-2 border-indigo-200 pb-2">Parte 2: Mapa do Tesouro das Histórias 🗺️</h2>
            <p className="font-bold text-lg">Leia o pequeno trecho abaixo para responder às perguntas:</p>
            <StoryBlock>
              <p>O esquilo, que morava numa árvore bem alta, viu o gato lá embaixo. O esquilo ficou com muito medo, pois sabia que o gato adorava caçar animais pequenos. "Ah, se esse gato subir aqui!", pensou o esquilo, querendo aprontar alguma.</p>
            </StoryBlock>

            <div className="space-y-2">
              <label htmlFor="question4" className="font-bold text-lg">4. Quem são os personagens na história que você acabou de ler?</label>
              <Textarea id="question4" name="question4" value={answers.question4} onChange={handleInputChange} rows={2}></Textarea>
            </div>
            <div className="space-y-2">
              <label htmlFor="question5" className="font-bold text-lg">5. Qual é o conflito? Qual o problema que está acontecendo?</label>
              <Textarea id="question5" name="question5" value={answers.question5} onChange={handleInputChange} rows={3}></Textarea>
            </div>
            <div className="space-y-2">
              <p className="font-bold text-lg">6. Marque um X. Quem está contando essa história?</p>
              <div className="space-y-2">
                <label className="flex items-center gap-3 text-lg p-3 rounded-md hover:bg-amber-100 cursor-pointer border border-transparent hover:border-amber-200">
                  <input type="radio" name="question6" value="O esquilo (falando na 1ª pessoa)" onChange={handleInputChange} className="w-5 h-5 text-purple-600 focus:ring-purple-500" />
                  O esquilo (falando na 1ª pessoa)
                </label>
                <label className="flex items-center gap-3 text-lg p-3 rounded-md hover:bg-amber-100 cursor-pointer border border-transparent hover:border-amber-200">
                  <input type="radio" name="question6" value="Alguém de fora contando a história (em 3ª pessoa)" onChange={handleInputChange} className="w-5 h-5 text-purple-600 focus:ring-purple-500" />
                  Alguém de fora contando a história (em 3ª pessoa)
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="question7" className="font-bold text-lg">7. Pergunta de Detetive: O texto diz que o esquilo "queria aprontar alguma". O que você acha que isso significa?</label>
              <Textarea id="question7" name="question7" value={answers.question7} onChange={handleInputChange} rows={3} placeholder="O que o esquilo está planejando?"/>
            </div>
          </div>

          <div className="text-center pt-4">
            <button type="submit" disabled={isLoading} className="bg-emerald-500 text-white font-black text-xl px-10 py-4 rounded-lg shadow-lg hover:bg-emerald-600 transition-transform transform hover:scale-105 disabled:bg-slate-400 disabled:cursor-not-allowed">
              {isLoading ? 'Avaliando Missão...' : 'Corrigir Prova!'}
            </button>
          </div>
        </form>
      </div>
      
      {isLoading && (
        <div className="mt-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-lg font-bold text-purple-700">O Professor Sábio está analisando suas pistas... 🦉</p>
        </div>
      )}

      {feedback && !isLoading && (
        <div className="mt-8 p-6 bg-indigo-50 border-2 border-indigo-200 rounded-lg shadow-lg">
            <ReactMarkdown className="prose prose-lg max-w-none prose-headings:text-indigo-800 prose-strong:text-emerald-600">
              {feedback}
            </ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default Test;
