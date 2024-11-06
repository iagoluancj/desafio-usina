"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function userAuth(Component: React.ComponentType<{}>) { // Segunda validação, essa inserida em cada componente. 
    // Para aumentar o nível de confiabilidade e segurança.
    return function AuthenticatedComponent(props: any) {
        const router = useRouter();
        const [loading, setLoading] = useState(true);
        const [isValid, setIsValid] = useState(false);
        const [messageLog, setMessageLog] = useState('Verificando seu acesso...');

        useEffect(() => {
            const timeoutMessage = setTimeout(() => {
                setMessageLog('Tempo limite excedido. Redirecionando para login...');
            }, 8000);
            
            const timeoutId = setTimeout(() => {
                router.push('/login');
            }, 10000);

            const savedToken = Cookies.get('token'); 
            if (savedToken) {
                fetch(`http://localhost:3001/validar-token?token=${savedToken}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.error) {
                            router.push('/login');
                        } else {
                            setIsValid(true);
                        }
                    })
                    .finally(() => {
                        setLoading(false);
                        clearTimeout(timeoutId);
                    });
            } else {
                router.push('/login');
            }

            return () => {
                clearTimeout(timeoutMessage);
                clearTimeout(timeoutId);
            };
        }, [router]);

        if (loading) {
            // return <ValidandoToken message={messageLog} />; // Utlizei algumas partes do código de um outro projeto meu, e por conta disso o compoenten 'ValidandoToken' está comentado.
            return <div>{messageLog}</div>
        }

        return isValid ? <Component {...props} /> : null;
    };
}

export default userAuth;
