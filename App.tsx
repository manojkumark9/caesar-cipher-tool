
import React from 'react';
import CaesarCipherTool from './components/CaesarCipherTool';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 selection:bg-cyan-500 selection:text-cyan-900">
      <CaesarCipherTool />
    </div>
  );
};

export default App;
