import s from './SearchForm.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, useEffect, useState } from 'react';
import { docslimitReducer, endDateReducer, innReducer, resetFormReducer, setCheckbox, startDateReducer, tonalityReducer } from '@/store/Slices/histogramReducer';
import { AppDispatch, RootState } from '@/store/store';
import { PostObjectSearch } from '@/api/objectsearch';
import { PostHistograms } from '@/api/histogram';
import { useRouter } from 'next/router';

export default function SearchForm() {
    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();

    // Состояния ошибок для полей формы    
    const [innError, setInnError] = useState('');
    const [limitError, setLimitError] = useState('');
    const [dateError, setDateError] = useState('');
    const [isSearchDisabled, setSearchDisabled] = useState(false);

    // Получаем данные из состояния хранилища Redux
    const endDate = useSelector((state: RootState) => state.histograms.histogramsParams.endDate);
    const startDate = useSelector((state: RootState) => state.histograms.histogramsParams.startDate);
    const SearchParams = useSelector((state: RootState) => state.histograms.histogramsParams);

    useEffect(() => {
        // При размонтировании компонента сбрасываем состояние формы и данные о гистограммах
        return () => {
            dispatch(resetFormReducer()); // Сброс состояния формы
        };
    }, [dispatch]);

    // Обработчик для поля ИНН
    const handleINN = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(innReducer(e.target.value));
        let result = false;
        if (!e.target.value) {
            setInnError('Обязательное поле');
        } else if (/[^0-9]/.test(e.target.value)) {
            setInnError('Введите корректные данные');
        } else {
            setInnError('');
    
            const CheckDigit = (inn: string, coeff: number[]) => {
                let n = 0;
                for (let i in coeff) {
                    n += coeff[i] * parseInt(inn[i]);
                }
                return parseInt((n % 11 % 10).toString());
            };
            switch (e.target.value.length) {
                case 10:
                    let n10 = CheckDigit(e.target.value, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
                    if (n10 === parseInt(e.target.value[9])) {
                        result = true;
                    }
                    break;
            }
            if (!result) {
                setInnError('Неправильное контрольное число');
            }
        }
        return result;
    };

    // Обработчик для выбора тональности
    const handleSelect = (e: React.MouseEvent<HTMLSelectElement, MouseEvent>) => {
        const selectElement = e.target as HTMLSelectElement;
        dispatch(tonalityReducer(selectElement.value));
    }

    // Обработчик для поля ввода количества документов
    // к слову, в ТЗ написано, что до 1000 может быть
    // однако я получила ошибку,  Превышено максимально допустимое количество запрошенных публикаций. Запрошено: 111. Максимум: 100
    // я оставила, как по ТЗ, потому что не поняла, я что-то не так сделала или в АПИ что-то поменялось
    const handleLimitInput = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(docslimitReducer(e.target.value));
    
        if (!e.target.value) {
            setLimitError('Обязательное поле');
        } else if (/[^0-9]/.test(e.target.value)) {
            setLimitError('Введите корректные данные');
        } else if (parseInt(e.target.value) < 1 || parseInt(e.target.value) > 1000 ) {
            setLimitError('Введите число до 1000 или больше 0');
        } else { 
            setLimitError('');                        
        }  
    }

    // Обработчик для чекбоксов
    const handleCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
        const index = parseInt(e.target.dataset.index || '0', 10);
        const checked = e.target.checked;
        dispatch(setCheckbox({ index, checked }));
    };

    // Обработчики для полей ввода дат начала и конца
    const handleDateChange = (e: ChangeEvent<HTMLInputElement>, field: 'startDate' | 'endDate') => {
        const value = e.target.value;
        const isStartDate = field === 'startDate';
        const setStartDate = isStartDate ? new Date(value + 'T00:00:00') : new Date(startDate + 'T00:00:00');
        const setEndDate = !isStartDate ? new Date(value + 'T00:00:00') : new Date(endDate + 'T00:00:00');
        const newDate = new Date();

        dispatch(isStartDate ? startDateReducer(value) : endDateReducer(value));

        if (newDate >= setStartDate && setEndDate >= setStartDate) {
            setDateError('');
        } else {
            setDateError('Введите корректные данные');
        }
    };

    const handleStartDate = (e: ChangeEvent<HTMLInputElement>) => {
        handleDateChange(e, 'startDate');
    };

    const handleEndDate = (e: ChangeEvent<HTMLInputElement>) => {
        handleDateChange(e, 'endDate');
    };

    // Проверка наличия ошибок в инпутах
    const checkAllErrors = () => {
        return !!innError || !!limitError || !!dateError;
    };

    // Обновление состояния активности кнопки поиска
    useEffect(() => {
        setSearchDisabled(checkAllErrors() || !SearchParams.innField || !SearchParams.startDate || !SearchParams.endDate);
    }, [innError, limitError, dateError, SearchParams]);

    // Обработчик отправки формы
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isValidInn = handleINN({ target: { value: SearchParams.innField } as HTMLInputElement } as ChangeEvent<HTMLInputElement>);
        const isValidLimit = !limitError;
        const isValidDate = !dateError;

        if (isValidInn && isValidLimit && isValidDate) {
            console.log('Отправка формы с параметрами:', SearchParams);
            dispatch(PostObjectSearch(SearchParams));
            dispatch(PostHistograms(SearchParams));
            dispatch(resetFormReducer());
            router.push('/result');
        }
    }

    return (
        <form className={s.searchform} onSubmit={handleSubmit}>
            <div className={s.form__main}>
                <div className={s.inputs}>
                    <label className={s.input}> ИНН Компании *
                        <input 
                            className={`${s.text_input} ${innError ? s.error_input : ''}`} 
                            type="text" 
                            placeholder="10 цифр"
                            maxLength={10}
                            onChange={handleINN} 
                        />
                        {innError && <p className={s.error}>{innError}</p>}
                    </label>

                    <label className={s.input}>Тональность
                        <select className={s.select} onClick={(e) => handleSelect(e)} name='tonality'>
                            <option className={s.select_option}  value="any">Любая</option>
                            <option className={s.select_option} value="positive">Позитивная</option>
                            <option className={s.select_option} value="negative">Негативная</option>
                        </select>
                    </label>

                    <label className={s.input}>Количество документов в выдаче *
                        <input 
                            className={`${s.text_input} ${limitError ? s.error_input : ''}`} 
                            type="text" 
                            placeholder="От 1 до 1000"
                            onChange={handleLimitInput}
                        />
                        {limitError && <p className={s.error}>{limitError}</p>}
                    </label>
                </div>

                <div className={s.checkboxes}>
                    {[
                        'Признак максимальной полноты',
                        'Упоминания в бизнес-контексте',
                        'Главная роль в публикации',
                        'Публикации только с риск-факторами',
                        'Включать технические новости рынков',
                        'Включать анонсы и календари',
                        'Включать сводки новостей'
                    ].map((label, index) => (
                        <label className={`${s.checkbox_input} ${SearchParams.checkboxes[index] ? s.checked : ''}`} key={index}>
                            <input
                                type="checkbox"
                                className={`${s.checkbox} ${SearchParams.checkboxes[index] ? s.checked : ''}`}
                                onChange={handleCheckBox}
                                data-index={index.toString()}
                                checked={SearchParams.checkboxes[index]}
                            />
                            {label}
                        </label>
                    ))}
                </div>
            </div>
            <div className={s.form_footer}>
                <div className={s.dates}>
                    <label className={s.date_select}>Диапазон поиска *
                        <div className={s.date_range}>
                            <input className={`${s.date} ${dateError ? s.error_input : ''}`} type="date" onChange={(e) => handleStartDate(e)} placeholder="Дата начала"  />
                            <input className={`${s.date} ${dateError ? s.error_input : ''}`} type="date" onChange={(e) => handleEndDate(e)} placeholder="Дата конца" />
                        </div>
                        {dateError && <p className={s.error}>{dateError}</p>}
                    </label>
                </div>
                <div className={s.button}>
                    <button className={s.searchform_submit} type="submit" disabled={isSearchDisabled}>Поиск</button>
                    <p className={s.important}>* Обязательные к заполнению поля</p>
                </div>
            </div>
        </form>
    )
}