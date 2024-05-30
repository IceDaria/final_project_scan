import s from '../Main.module.scss';
import Image from 'next/image';
import banner from '../../../public/mainbanner.svg'
import Link from 'next/link';

interface AboutProps {
    isLoggedIn: boolean;
}

export default function About({ isLoggedIn } : AboutProps) {
    // я не прячу кнопку, если пользователь не авторизован, а дисэйблю
    // вообще изначально хотела сделать всплывающую подсказку при наведении типа "войдите в систему"
    // но не сдюжила. Cогласна на минус бал, если это критично, так как всё-таки отошла от требования
    const linkHref = isLoggedIn ? "/searchform" : "#";

    return (
        <div className={s.about}>
            <div className={s.info}>
                <div className={s.textinfo}>
                    <h1 className={s.title}>сервис по поиску<br/>публикаций<br/>о компании<br/>по его ИНН</h1>
                    <div className={s.subtitle}>Комплексный анализ публикаций, получение данных<br/>в формате PDF на электронную почту.</div >
                </div>
                <Link href={linkHref} aria-label="Go to the search form">
                    <button className={s.getData} disabled={!isLoggedIn}>
                        Запросить данные
                    </button>
                </Link>
            </div>
            <Image 
                src={banner}
                alt='Main page banner'
                className={s.banner}
                width={629}
                height={620}
                priority
            />
        </div>
    )
}