import s from './Auth.module.scss';
import Image from 'next/image';
import { GlobalSVGSelector } from '@/Shared/GlobalSVGSelector';
import lock from '@/public/lock.png'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { loginUser } from '@/api/auth';
import Loader from '../loader/Loader';
import { useRouter } from 'next/router';

export default function LoginForm() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const authState = useSelector((state: RootState) => state.auth); // Получаем состояние auth из хранилища Redux

    // Переменные состояния
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Обновляем ошибки, если есть ошибка аутентификации
        if (authState.error) {
            setErrors({ username: 'Введите корректные данные', password: 'Неправильный пароль' });
        }
    }, [authState.error]);

    useEffect(() => {
        // Проверяем форму при изменении имени пользователя или пароля
        validateForm();
    }, [username, password]);

    const validateForm = () => {
        // Проверяем, что поля для ввода имени пользователя и пароля не пусты
        const isUsernameValid = username.trim().length > 0;
        const isPasswordValid = password.trim().length > 0;
        setIsButtonDisabled(!isUsernameValid || !isPasswordValid);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Предотвращаем стандартное поведение отправки формы
        setErrors({}); // Сбрасываем ошибки
        
        setLoading(true); // Устанавливаем состояние загрузки в true перед отправкой запроса

        // Получаем данные для входа из состояния
        const loginData = {
            login: username,
            password: password
        };

        try {
            // Диспатчим действие loginUser для аутентификации пользователя
            const result = await dispatch(loginUser(loginData));
            
            if (loginUser.fulfilled.match(result)) {
                // Сохраняем токен доступа и срок действия в локальное хранилище
                localStorage.setItem('accessToken', result.payload.accessToken);
                localStorage.setItem('expire', result.payload.expire);
                router.push('/'); // Перенаправляем на главную страницу после успешной аутентификации
            }
        } catch (error) {
            // Обрабатываем ошибки, если они есть
            setErrors({ username: 'Введите корректные данные', password: 'Неправильный пароль' });
        } finally {
            setLoading(false); // Устанавливаем состояние загрузки в false после получения ответа
        }
    };

    return (
        <div className={s.container} style={loading ? { pointerEvents: 'none', opacity: 0.5 } : {}}>
            <form className={s.authform} onSubmit={handleSubmit}>
                <Image
                    src={lock}
                    alt='Locker'
                    className={s.lock}
                    width={75}
                    height={92}
                />

                <div className={s.formheader}>
                    <div className={s.tabs}>Войти</div>
                    <div className={s.tabs}>Зарегистрироваться</div>
                </div>

                <div className={s.form}>
                    <div className={s.form_wrapper}>
                        <label className={s.label} htmlFor="username">Логин или номер телефона:</label>
                        <input
                            className={`${s.input} ${errors.username ? s.error_input : ''}`}
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        {errors.username && <div className={s.error_message}>{errors.username}</div>}
                    </div>

                    <div className={s.form_wrapper}>
                        <label className={s.label} htmlFor="password">Пароль</label>
                        <input
                            className={`${s.input} ${errors.password ? s.error_input : ''}`}
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {errors.password && <div className={s.error_message}>{errors.password}</div>}
                    </div>

                    <button className={s.form_button} type="submit" disabled={isButtonDisabled || loading}>
                        {authState.status === 'loading' ? <Loader /> : 'Войти'}
                    </button>
                    <a href='_blank' className={s.form_link}>Восстановить пароль</a>
                </div>

                <div className={s.socials}>
                    <div className={s.title}>Войти через:</div>
                    <div className={s.buttons}>
                        <button className={s.auth_social}><GlobalSVGSelector id="google" /></button>
                        <button className={s.auth_social}><GlobalSVGSelector id="facebook" /></button>
                        <button className={s.auth_social}><GlobalSVGSelector id="yandex" /></button>
                    </div>
                </div>
            </form>
        </div>
    );
}