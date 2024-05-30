import clock from '@/public/clock.png';
import search from '@/public/search.png';
import security from '@/public/security.png';
import gear from '@/public/gear.svg'

import beginner from '@/public/begginer.png'
import pro from '@/public/pro.png';
import business from '@/public/business.png';
import check from '@/public/check.png';
import { HistogramParams, Tariff } from '@/Shared/types';
import { StaticImageData } from 'next/image';

export const cardsInfo = [
    {
        image: clock,
        text: 'Высокая и оперативная скорость обработки заявки'
    },
    {
        image: search,
        text: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос'
    },
    {
        image: security,
        text: 'Защита конфиденциальных сведений, не подлежащих разглашению по федеральному законодательству'
    },
    {
        image: gear,
        text: 'Какой-то текст, чтобы проверить, что карусель работает'
    },
];

export const tariffsData = [
    {
      title: 'Beginner',
      description: 'Для небольшого исследования',
      image: beginner,
      currentPrice: '799 ₽',
      previousPrice: '1 200 ₽',
      planPrice:'или 150 ₽/мес. при рассрочке на 24 мес.',
      check: check,
      perks: ['Безлимитная история запросов', 'Безопасная сделка', 'Поддержка 24/7'],
      buttonText: 'Подробнее',
      color: 'yellow'
    },

    {
        title: 'Pro',
        description: 'Для HR и фрилансеров',
        image: pro,
        currentPrice: '1 299 ₽',
        previousPrice: '2 600 ₽',
        planPrice:'или 279 ₽/мес. при рассрочке на 24 мес.',
        check: check,
        perks: ['Все пункты тарифа Beginner', 'Экспорт истории', 'Рекомендации по приоритетам'],
        buttonText: 'Подробнее',
        color: 'cian'
      },

    {
        title: 'Business',
        description: 'Для корпоративных клиентов',
        image: business,
        currentPrice: '2 379 ₽',
        previousPrice: '3 700 ₽',
        planPrice:'',
        check: check,
        perks: ['Все пункты тарифа Pro', 'Безлимитное количество запросов', 'Приоритетная поддержка'],
        buttonText: 'Подробнее',
        color: 'black'
    }
];

export interface Doc {
    id: string;
    ok: {
        issueDate: string;
        url: string;
        source: {
            name: string;
        };
        title: {
            text: string;
        };
        content: {
            markup: string;
        };
        attributes: {
            isTechNews?: boolean;
            isAnnouncement?: boolean;
            isDigest?: boolean;
            wordCount: number;
        };
    };
    isTechNews?: boolean;
}

export interface SliderData {
    data: {
        data: {
            date: string;
            value: number;
        }[];
        histogramType: string;
    }[];
}

export interface TariffCardProps {
    title: string;
    description: string;
    image: StaticImageData;
    currentPrice: string;
    previousPrice: string;
    planPrice: string;
    check: StaticImageData;
    perks: string[];
    buttonText: string;
    color: string;
    currentTariff: Tariff | null;
}