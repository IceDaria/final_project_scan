import s from './Footer.module.scss';
import logo from '@/public/withe-logo.png';
import Image from 'next/image';

export default function Footer() {
    return (
        <div className={`${s.footer} container`}>
            <Image 
                src={logo}
                alt='Our logo but in white'
                className={s.logo}
            />

            <div className={s.info}>
                <p className={s.adress}>г. Москва, Цветной б-р, 40<br/> +7 495 771 21 11<br/> info@skan.ru</p>
                <p>Copyright. 2022</p>
            </div>
        </div>
    )
}