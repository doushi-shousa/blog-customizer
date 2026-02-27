import { CSSProperties, useState } from 'react';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';
import styles from './styles/index.module.scss';

export function App() {
	// 🦅 Утверждённые параметры страницы — действующие догматы оформления
	const [appliedParams, setAppliedParams] =
		useState<typeof defaultArticleState>(defaultArticleState);

	return (
		// 🏰 Главный бастион статьи, принимающий утверждённые законы отображения
		<main
			className={styles.main}
			style={
				{
					// ⚙️ Параметры передаются через священные CSS-переменные
					'--font-family': appliedParams.fontFamilyOption.value,
					'--font-size': appliedParams.fontSizeOption.value,
					'--font-color': appliedParams.fontColor.value,
					'--container-width': appliedParams.contentWidth.value,
					'--bg-color': appliedParams.backgroundColor.value,
				} as CSSProperties
			}>
			{/* 🛡️ Панель управления — изменение допустимо лишь по приказу */}
			<ArticleParamsForm
				appliedParams={appliedParams}
				onApply={setAppliedParams}
			/>

			{/* 📜 Статья подчиняется только утверждённым параметрам */}
			<Article />
		</main>
	);
}