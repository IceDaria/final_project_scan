import { tariffsData } from '@/components/utils/shared';
import s from '../Main.module.scss';
import TariffCard from './TariffCard';
import { Tariff } from '@/Shared/types';

interface TariffsProps {
    currentTariff: Tariff | null;
}

export default function Tariffs ({ currentTariff} : TariffsProps) {
    return (
        <div className={`${s.tariffs} container`}>
            <h2 className={s.section_title}>Наши тарифы</h2>
            <div className={s.tariffs_list}>
                {tariffsData.map((tariff, index) => (
                    <TariffCard currentTariff={currentTariff} key={index} {...tariff} />
                ))}
            </div>
        </div>
    )
}