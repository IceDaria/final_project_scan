import s from '../Main.module.scss';
import Image from 'next/image';
import whyusbanner from '@/public/whyusbanner.svg';

import { useState } from 'react';
import { cardsInfo } from '@/components/utils/shared';
import { GlobalSVGSelector } from '@/Shared/GlobalSVGSelector';
import { useWindowSize } from '@/Shared/CustomHooks';

export default function Carousel() {
    const [activeSlide, setActiveSlide] = useState(0);
    const { width } = useWindowSize();

    // Массив карточек для слайдов
    const cards = cardsInfo;

    // Функция для получения индекса карточки в массиве cards
    const getCardIndex = (index: number) => {
        return (activeSlide + index) % cards.length;
    };

    // Обработчики для переключения слайдов
    const handleNextSlide = () => {
        setActiveSlide((prev) => (prev + 1) % cards.length);
    };

    const handlePrevSlide = () => {
        setActiveSlide((prev) => (prev - 1 + cards.length) % cards.length);
    };

    // Количество карточек, отображаемых на слайдере, нужно для мобильной вёрстки
    const CardsToShow = width < 376 ? 1 : 3;

    return (
        <div className={`${s.carousel_wrapper} container`}>
            <h2 className={s.section_title}>Почему именно мы</h2>
            <div className={s.carousel}>
                <button className={s.changecard} onClick={handleNextSlide}>
                    <GlobalSVGSelector id="arrow" />
                </button>
                <div className={s.cards}>
                    {[...Array(CardsToShow)].map((_, index) => (
                        <div key={index} className={s.card}>
                            <Image src={cards[getCardIndex(index)].image} alt='Slide image' width={64} height={64} />
                            <p className={s.card_text}>{cards[getCardIndex(index)].text}</p>
                        </div>
                    ))}
                </div>
                <button className={s.changecard} onClick={handlePrevSlide}>
                    <GlobalSVGSelector id="arrowright" />
                </button>
            </div>
                <Image 
                    src={whyusbanner} 
                    alt='why Us banner'
                    className={s.whyusbanner}
                    width={1320}
                    height={575}
                />
        </div>
    );
}