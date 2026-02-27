import { CSSProperties, useState } from 'react';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';
import styles from './styles/index.module.scss';

export function App() {
	// 🦅 Во имя Императора — здесь храним утверждённые указы о стиле страницы
	const [appliedParams, setAppliedParams] =
		useState<typeof defaultArticleState>(defaultArticleState);

	return (
		<main
			className={styles.main}
			// ⚙️ Механикус одобряет: передаём параметры через священные CSS-переменные
			style={
				{
					'--font-family': appliedParams.fontFamilyOption.value,
					'--font-size': appliedParams.fontSizeOption.value,
					'--font-color': appliedParams.fontColor.value,
					'--container-width': appliedParams.contentWidth.value,
					'--bg-color': appliedParams.backgroundColor.value,
				} as CSSProperties
			}>
			{/* 🛡️ Панель управления стилем. Инквизиция следит, чтобы изменения применялись осознанно */}
			<ArticleParamsForm
				appliedParams={appliedParams}
				onApply={setAppliedParams}
			/>

			{/* 📜 Да будет текст, оформленный по канонам Империума */}
			<Article />
		</main>
	);
}