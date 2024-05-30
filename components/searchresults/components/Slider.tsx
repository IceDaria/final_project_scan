import s from '../Results.module.scss';
import { useSelector } from 'react-redux';
import Loader from '@/components/loader/Loader';
import { useState } from 'react';
import { GlobalSVGSelector } from '@/Shared/GlobalSVGSelector';
import { useWindowSize } from '@/Shared/CustomHooks';
import { SliderData } from '@/components/utils/shared';

interface SliderProps {
    sliderData: SliderData;
}

export default function Slider({ sliderData }: SliderProps) {
    const [firstIndex, setFirstIndex] = useState(0);
    // Получаем ширину окна браузера с помощью кастомного хука useWindowSize
    const { width } = useWindowSize();

    const status = useSelector((state: any) => state.histograms.status);
    // Получаем данные о документах и рисках из пропса sliderData
    const totalDocumentsData = sliderData.data.find(item => item.histogramType === 'totalDocuments')?.data || [];
    const riskFactorsData = sliderData.data.find(item => item.histogramType === 'riskFactors')?.data || [];

    //опрделеляем общее количество, складываем все value в рисках и документах
    const totalItemsCount = totalDocumentsData.reduce((sum, item) => sum + item.value, 0) + riskFactorsData.reduce((sum, item) => sum + item.value, 0);

     // определяем, сколько карточек будет показываться в зависимости от размера экрана
     const CardsToShow= width < 376 ? 1 : 8;
     const visibleDocumentsData = totalDocumentsData.slice(firstIndex, firstIndex + CardsToShow);

    // обработчики для листания слайдера
    const handlePrevSlide = () => {
        setFirstIndex(prevIndex => Math.max(prevIndex - 1, 0));
    };

    const handleNextSlide = () => {
        if (firstIndex + CardsToShow < totalDocumentsData.length) {
            setFirstIndex(prevIndex => prevIndex + 1);
        }
    };

    return (
        <div className={s.slider_section}>
            <h2 className={s.section_title}>Общая сводка</h2>
            <p className={s.resultsnumber}>Найдено {totalItemsCount.toLocaleString() || 0} вариантов</p>
            <div className={s.slider_wrapper}>
                <button className={s.carusel_button} onClick={handlePrevSlide}>
                    <GlobalSVGSelector id="arrow" />
                </button>
                <div className={s.slider}>
                    <div className={s.header}>
                        <div className={`${s.slider_element} ${s.slider_header}`}>
                            <div className={s.header_period}>Период</div>
                            <div className={s.header_all}>Всего</div>
                            <div className={s.header_risks}>Риски</div>
                        </div>
                    </div>
                    {status === 'loading' ? (
                        <div className={s.loader}><Loader />Загрузка данных...</div>
                    ) : (
                        visibleDocumentsData.map((item, index) => (
                            <div key={index} className={`${s.slider_element} ${s.slider_card}`}>
                                <div className={s.card_period}>{new Date(item.date).toLocaleDateString()}</div>
                                <div className={s.card_all}>{item.value.toLocaleString()}</div>
                                <div className={s.card_risks}>{riskFactorsData.toLocaleString()  ? riskFactorsData[index].value.toLocaleString() : 0}</div>
                            </div>
                        ))
                    )}
                </div>
                <button className={s.carusel_button} onClick={handleNextSlide}>
                    <GlobalSVGSelector id="arrowright" />
                </button>
            </div>
        </div>
    );
}