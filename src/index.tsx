import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './styles/index.scss';
import { App } from './App';

// 🦅 Точка высадки в материальный мир. Здесь дух React вселяется в DOM.
// ⚔️ Да будет свет рендера, и да не падёт root во тьму null.
const domNode = document.getElementById('root') as HTMLDivElement;

// 🔥 Создаём ядро управления. Машинный дух пробуждён.
const root = createRoot(domNode);

root.render(
	<StrictMode>
		{/* 🛡️ StrictMode — инквизитор, выявляющий слабости в эпоху разработки */}
		<App />
	</StrictMode>
);