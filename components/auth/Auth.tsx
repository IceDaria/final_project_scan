import s from './Auth.module.scss';
import Image from 'next/image';
import banner from '@/public/Characters.svg';
import LoginForm from './LoginForm';

export default function Auth() {
    return (
        <div className={`${s.auth} container`}>
            <div className={s.wrapper}>
                <h1 className={s.title}>Для оформления подписки на тариф, необходимо авторизоваться.</h1>
                <Image 
                    src={banner}
                    alt='Our logo'
                    className={s.banner}
                    width={321}
                    height={342}
                />
            </div>
            <LoginForm />
        </div>
    )
}