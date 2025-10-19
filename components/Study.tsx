import React from 'react';
import { BackArrowIcon, LightbulbIcon } from './icons/Icons';

interface StudyProps {
  onBack: () => void;
}

const Section: React.FC<{ title: string; icon: string; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg mb-8">
    <h2 className="text-3xl font-black text-indigo-700 mb-4 flex items-center gap-3">
      <span className="text-4xl">{icon}</span> {title}
    </h2>
    <div className="space-y-4 text-lg text-slate-700">{children}</div>
  </div>
);

const KeyConcept: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 my-4 rounded-r-lg text-amber-900">
    <p className="flex items-start gap-3">
      <span className="text-amber-500 pt-1"><LightbulbIcon /></span>
      <span><strong>Conceito Chave:</strong> {children}</span>
    </p>
  </div>
);

const ExamplesGrid: React.FC<{ items: { from: string, to: string }[] }> = ({ items }) => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
    {items.map((item, index) => (
      <div key={index} className="bg-indigo-50 p-3 rounded-lg text-center">
        <span className="font-semibold">{item.from}</span> → <span className="font-bold text-indigo-600">{item.to}</span>
      </div>
    ))}
  </div>
);

const ExampleBox: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg mt-4">
    <h4 className="font-bold text-purple-800 text-xl">{title}</h4>
    <div className="text-slate-700 mt-2 space-y-2">{children}</div>
  </div>
);


const Study: React.FC<StudyProps> = ({ onBack }) => {
  const professionExamples = [
    { from: "Ferro →", to: "Ferreiro" }, { from: "Pintar →", to: "Pintor" },
    { from: "Jornal →", to: "Jornalista" }, { from: "Dente →", to: "Dentista" },
    { from: "Lavar →", to: "Lavador" }, { from: "Cozinhar →", to: "Cozinheiro" },
    { from: "Costurar →", to: "Costureira" }, { from: "Telefone →", to: "Telefonista" },
    { from: "Surfar →", to: "Surfista" },
  ];

  return (
    <div className="animate-fade-in">
      <button onClick={onBack} className="mb-6 inline-flex items-center px-4 py-2 border border-transparent text-base font-bold rounded-full shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
        <BackArrowIcon /> Voltar para o Menu
      </button>

      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-indigo-800">🚀 Master Class: Missão Detetive das Palavras e Histórias!</h1>
        <p className="text-xl text-slate-600 mt-2">Sua missão é desvendar os segredos das palavras e os mistérios das histórias. Edição Turbo!</p>
      </div>

      <Section title="Fase 1: O Laboratório de Palavras Turbinado" icon="🔬">
        <p>Aqui, vamos explorar a fábrica de palavras, entendendo como elas se conectam e ganham novos poderes!</p>

        <h3 className="text-2xl font-bold text-indigo-600">1. A Grande Família das Palavras (Primitivas e Derivadas)</h3>
        <p><strong>Revisão Rápida:</strong> A palavra-mãe (primitiva) dá origem às palavras-filhas (derivadas).</p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>PEDRA</strong> (primitiva) → <strong className="text-purple-700">PEDR</strong>EIRO, <strong className="text-purple-700">PEDR</strong>INHA, EM<strong className="text-purple-700">PEDR</strong>ADO (derivadas)</li>
          <li><strong>FERRO</strong> (primitiva) → <strong className="text-purple-700">FERR</strong>EIRO, <strong className="text-purple-700">FERR</strong>AGEM, <strong className="text-purple-700">FERR</strong>UGEM (derivadas)</li>
        </ul>
        <KeyConcept>O <strong>radical</strong> (a parte principal da palavra-mãe) aparece nas palavras-filhas, mostrando que elas pertencem à mesma família. É como um sobrenome secreto!</KeyConcept>
        
        <h3 className="text-2xl font-bold text-indigo-600 mt-6">2. Os Superpoderes das Palavras: Sufixos e Prefixos em Ação!</h3>
        <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-bold text-xl">PREFIXOS - Vêm ANTES e mudam o sentido</h4>
                <p>Ex: <strong>IN</strong>feliz (ao contrário), <strong>DES</strong>fazer (o contrário de fazer), <strong>SUB</strong>marino (embaixo d'água)</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-bold text-xl">SUFIXOS - Vêm DEPOIS e criam novas palavras</h4>
                <p>Ex: Pint<strong>OR</strong> (quem pinta), Chuv<strong>EIRO</strong> (onde sai chuva), Gost<strong>OSO</strong> (cheio de gosto)</p>
            </div>
        </div>
        
        <h4 className="font-bold text-xl mt-4">Exemplos de Profissões com Sufixos:</h4>
        <ExamplesGrid items={professionExamples} />
      </Section>

      <Section title="Fase 2: O Mapa do Tesouro das Histórias" icon="🗺️">
        <p>Agora, vamos analisar as histórias com os olhos de um detetive experiente, usando as ferramentas que ele já praticou!</p>
        <h3 className="text-2xl font-bold text-indigo-600">1. Os Elementos do Mapa Secreto</h3>
        <p>Toda história tem 4 pontos secretos no mapa:</p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Personagens:</strong> Quem está na história?</li>
          <li><strong>Cenário:</strong> Onde a aventura acontece?</li>
          <li><strong>Conflito:</strong> Qual é o GRANDE problema que começa a confusão?</li>
          <li><strong>Resolução:</strong> Como o problema foi resolvido no final?</li>
        </ul>

        <h3 className="text-2xl font-bold text-indigo-600 mt-6">2. A Câmera da História: Explorando o Ponto de Vista</h3>
        <ul className="list-disc list-inside space-y-2">
            <li><strong>1ª Pessoa:</strong> O personagem conta a história. Ele fala "Eu", "nós".</li>
            <li><strong>3ª Pessoa:</strong> Alguém de fora conta a história. Fala "Ele", "ela", "eles".</li>
        </ul>
      </Section>
      
      <Section title="Fase 3: O Poder Secreto da Leitura" icon="🧠">
         <p>Detetives de verdade leem nas entrelinhas! Às vezes, o texto não conta tudo, ele nos dá <strong>PISTAS</strong>! Encontrar essas pistas e descobrir os segredos se chama <strong>inferência</strong>.</p>
        
         <h3 className="text-2xl font-bold text-indigo-600 mt-6">Exemplos de Pistas:</h3>
         
         <ExampleBox title="1. Expressões com Sentido Escondido">
            <p>Às vezes, as pessoas dizem uma coisa, mas querem dizer outra!</p>
            <div className="mt-2 p-3 bg-white rounded-md border italic">
                <p><strong>Frase:</strong> "Eles não passam duns tolos."</p>
                <p><strong>Pista Secreta:</strong> Na verdade, isso significa que eles são muito <strong>espertos</strong> e não são nada bobos!</p>
            </div>
        </ExampleBox>

        <ExampleBox title="2. Ações que Revelam Pensamentos">
            <p>O que um personagem faz pode nos contar o que ele está pensando, mesmo que ele não diga nada.</p>
            <div className="mt-2 p-3 bg-white rounded-md border italic">
                <p><strong>Texto:</strong> "O fazendeiro ria da asneira do outro."</p>
                <p><strong>Pista Secreta:</strong> O riso do fazendeiro nos mostra que ele achava a ideia do caboclo boba ou engraçada. Ele provavelmente já sabia que ia ganhar a aposta e estava se divertindo com a situação.</p>
            </div>
        </ExampleBox>

        <KeyConcept>
            Sempre se pergunte: "Por que o personagem disse isso?" ou "Por que ele fez aquilo?". As respostas são as pistas que você procura!
        </KeyConcept>
      </Section>
    </div>
  );
};

export default Study;