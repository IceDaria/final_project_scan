import React from 'react';
import s from '../Main.module.scss';
import Image from 'next/image';
import { TariffCardProps } from '@/components/utils/shared';

const TariffCard: React.FC<TariffCardProps> = ({
  title,
  description,
  image,
  currentPrice,
  previousPrice,
  planPrice,
  check,
  perks,
  buttonText,
  color,
  currentTariff,
}: TariffCardProps) => {

  // типа получаем информацию от апи о текущет тарифе авторизованного пользователя, 
  // чтобы сделать соответствующую карточку активной
  const isCurrentTariff = currentTariff && currentTariff.name === title;

  return (
    <div className={`${s.card} ${isCurrentTariff ? s.active : ''} ${s[color]}`}>
      <div className={`${s.header} ${s[color]}`}>
        <div className={s.wrapper}>
          <h3 className={`${s.title} ${s[color]}`}>{title}</h3>
          <div className={`${s.subtitle} ${s[color]}`}>{description}</div>
        </div>
        <Image src={image} alt={`Banner for ${title} tariff`} width={92} height={83} />
      </div>
      {isCurrentTariff && <div className={s.current_tariff}>Текущий тариф</div>}
      <div className={s.info}>
        <div className={s.price}>
          <p className={s.current}>{currentPrice}<span className={s.previous}>{previousPrice}</span></p>
          <p className={s.more_info}>{planPrice}</p>
        </div>
        <div className={s.perks}>
          <p className={s.list_title}>В тариф входит:</p>
          <ul>
            {perks.map((perk, index) => (
              <li key={index} className={s.perk_list}>
                <Image src={check} alt='Green check' width={20} height={20} />
                <p>{perk}</p>
              </li>
            ))}
          </ul>
        </div>
        <button className={`${s.tariffs_button} ${isCurrentTariff ? s.active : ''} ${s[color]}`}>
          {isCurrentTariff ? 'Перейти в личный кабинет' : buttonText}
        </button>
      </div>
    </div>
  );
};

export default TariffCard;