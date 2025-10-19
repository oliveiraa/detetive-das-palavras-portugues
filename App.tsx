import React, { useState } from 'react';
import Study from './components/Study';
import Test from './components/Test';
import Tutor from './components/Tutor';
import { MicroscopeIcon, MapIcon, GraduationCapIcon, LightbulbIcon } from './components/icons/Icons';

type View = 'home' | 'study' | 'test' | 'tutor';

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  buttonColor: string;
  onClick: () => void;
}

const InfoCard: React.FC<CardProps> = ({ icon, title, description, buttonText, buttonColor, onClick }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col text-center items-center transform hover:-translate-y-2 transition-transform duration-300">
    <div className={`p-4 rounded-full mb-4 ${buttonColor.replace('bg-', 'bg-').replace('-500', '-100').replace('-600', '-100')}`}>
      <div className={`text-4xl ${buttonColor.replace('bg-', 'text-').replace('hover:bg-', 'hover:text-')}`}>{icon}</div>
    </div>
    <h3 className="text-2xl font-bold text-slate-800 mb-2">{title}</h3>
    <p className="text-slate-600 mb-6 flex-grow">{description}</p>
    <button
      onClick={onClick}
      className={`w-full font-bold text-white py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 ${buttonColor}`}
    >
      {buttonText}
    </button>
  </div>
);

const Home: React.FC<{ onNavigate: (view: View) => void }> = ({ onNavigate }) => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black text-indigo-700 mb-3">
          Missão Detetive das Palavras
        </h1>
        <p className="text-xl text-slate-600">
          Bem-vindo, jovem detetive! Escolha sua missão para desvendar os mistérios do Português.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <InfoCard
          icon={<MicroscopeIcon />}
          title="Área de Estudo"
          description="Aprenda sobre palavras primitivas e derivadas, prefixos, sufixos e muito mais!"
          buttonText="Começar a Estudar"
          buttonColor="bg-purple-600 hover:bg-purple-700"
          onClick={() => onNavigate('study')}
        />
        <InfoCard
          icon={<MapIcon />}
          title="Área de Prova"
          description="Teste seus conhecimentos e receba uma avaliação personalizada com IA!"
          buttonText="Fazer a Prova"
          buttonColor="bg-amber-500 hover:bg-amber-600"
          onClick={() => onNavigate('test')}
        />
        <InfoCard
          icon={<GraduationCapIcon />}
          title="Tutor IA"
          description="Tire suas dúvidas com um tutor especializado que fala a sua língua!"
          buttonText="Conversar com Tutor"
          buttonColor="bg-purple-600 hover:bg-purple-700"
          onClick={() => onNavigate('tutor')}
        />
      </div>

      <div className="bg-white border-l-4 border-purple-400 text-slate-700 p-6 rounded-r-lg max-w-3xl mx-auto shadow-md">
        <h3 className="font-bold text-xl mb-2 flex items-center gap-2"><LightbulbIcon /> Dica do Detetive</h3>
        <p>Comece pela Área de Estudo para aprender o conteúdo, depois teste seus conhecimentos na Prova e, se tiver dúvidas, converse com o Tutor IA a qualquer momento!</p>
      </div>
    </div>
  );
};


const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('home');

  const handleBack = () => setActiveView('home');

  const renderView = () => {
    switch (activeView) {
      case 'study':
        return <Study onBack={handleBack} />;
      case 'test':
        return <Test onBack={handleBack} />;
      case 'tutor':
        return <Tutor onBack={handleBack} />;
      case 'home':
      default:
        return <Home onNavigate={setActiveView} />;
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 text-slate-800">
      <main className="container mx-auto p-4 sm:p-8">
        {renderView()}
      </main>
      <footer className="text-center py-4 text-slate-500 text-sm">
        <p>Criado com ❤️ para o melhor detetive do mundo!</p>
      </footer>
    </div>
  );
};

export default App;
