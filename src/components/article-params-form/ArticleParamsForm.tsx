import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	appliedParams: typeof defaultArticleState;
	onApply: (params: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({
	appliedParams,
	onApply,
}: ArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const formRef = useRef<HTMLDivElement>(null);
	const [formState, setFormState] = useState(appliedParams);

	const toggleForm = () => {
		setIsFormOpen(!isFormOpen);
	};

	type UseCloseOnOutsideClickOrEsc = {
		isOpenElement: boolean; // Флаг, открыт ли элемент (например, модальное окно или форма)
		onClose?: () => void; // Колбэк, вызываемый при закрытии
		elementRef: React.RefObject<HTMLElement>; // Ссылка на DOM-элемент, вне которого отслеживаем клик
	};

	const useCloseOnOutsideClickOrEsc = ({
		isOpenElement,
		elementRef,
		onClose,
	}: UseCloseOnOutsideClickOrEsc) => {
		useEffect(() => {
			if (!isOpenElement) {
				return;
			}

			const handleClick = (event: MouseEvent) => {
				// Если клик был вне элемента — вызываем onClose
				if (
					event.target instanceof Node &&
					elementRef.current &&
					!elementRef.current.contains(event.target)
				) {
					onClose?.();
				}
			};

			const handleKeyDown = (event: KeyboardEvent) => {
				// Закрытие по нажатию Escape
				if (event.key === 'Escape') {
					onClose?.();
				}
			};

			// Добавляем обработчики
			window.addEventListener('mousedown', handleClick);
			window.addEventListener('keydown', handleKeyDown);

			// Убираем обработчики при размонтировании или изменении зависимостей
			return () => {
				window.removeEventListener('mousedown', handleClick);
				window.removeEventListener('keydown', handleKeyDown);
			};
		}, [isOpenElement, elementRef, onClose]);
	};

	useCloseOnOutsideClickOrEsc({
		isOpenElement: isFormOpen,
		elementRef: formRef,
		onClose: () => setIsFormOpen(false),
	});

	const updateFormField = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setFormState({ ...formState, [field]: value });
		};
	};

	const handleApply = (event: React.FormEvent) => {
		event.preventDefault();
		onApply(formState);
		setIsFormOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={toggleForm} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}
				ref={formRef}>
				<form className={styles.form} onSubmit={handleApply}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						title='Шрифт'
						selected={formState.fontFamilyOption}
						onChange={updateFormField('fontFamilyOption')}
					/>
					<RadioGroup
						options={fontSizeOptions}
						title='Размер шрифта'
						name='fontSize'
						selected={formState.fontSizeOption}
						onChange={updateFormField('fontSizeOption')}
					/>
					<Select
						options={fontColors}
						title='Цвет шрифта'
						selected={formState.fontColor}
						onChange={updateFormField('fontColor')}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						title='Цвет фона'
						selected={formState.backgroundColor}
						onChange={updateFormField('backgroundColor')}
					/>
					<Select
						options={contentWidthArr}
						title='Ширина контента'
						selected={formState.contentWidth}
						onChange={updateFormField('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
