import { useRef, useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import * as registroService from '../services/registroService';

import { ConfirmPopup } from 'primereact/confirmpopup';
import { InputTextarea } from 'primereact/inputtextarea';

export default function RegistroPonto() {
    const [horaAtual, setHoraAtual] = useState<Date>(new Date());
    const [checkIn, setCheckIn] = useState<Date | null>(null);
    const [checkOut, setCheckOut] = useState<Date | null>(null);
    const [registroId, setRegistroId] = useState<number | null>(null);

    const [comentario, setComentario] = useState('');
    const [popupVisible, setPopupVisible] = useState(false);
    const popupTarget = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setHoraAtual(new Date());
        }, 1000);

        const entradaSalva = localStorage.getItem('checkIn');
        const saidaSalva = localStorage.getItem('checkOut');
        const idSalvo = localStorage.getItem('registroId');

        if (entradaSalva) setCheckIn(new Date(entradaSalva));
        if (saidaSalva) setCheckOut(new Date(saidaSalva));
        if (idSalvo) setRegistroId(Number(idSalvo));
        return () => clearInterval(timer);
    }, []);

    const formatarHora = (data: Date | null) => {
        if (!data) return '—';

        const ajustada = new Date(data.getTime());

        return ajustada.toLocaleTimeString('pt-BR');
    };

    const calcularTotalHoras = (inicio: Date, fim: Date): number => {
        const diffMs = fim.getTime() - inicio.getTime(); // diferença em milissegundos
        const horasDecimais = diffMs / (1000 * 60 * 60); // milissegundos → horas
        return Number(horasDecimais.toFixed(2)); // arredonda pra 2 casas decimais
    };

    const handleCheckIn = async () => {
        try {
            const registro = await registroService.checkIn(1);
            setCheckIn(new Date(registro.entrada));
            setCheckOut(null);
            setRegistroId(registro.id);

            localStorage.setItem('checkIn', registro.entrada.toString());
            localStorage.setItem('registroId', registro.id.toString());
            localStorage.removeItem('checkOut');
        } catch (error) {
            console.error('Erro ao fazer check-in:', error);
        }
    };

    const handleCheckOut = async (comentario: string) => {
        if (!registroId || !checkIn) {
            console.warn('Nenhum registro de check-in encontrado.');
            return;
        }

        try {
            const saida = new Date();
            const totalHoras = calcularTotalHoras(checkIn, saida);
            const registroAtualizado = await registroService.checkOut(
                registroId,
                totalHoras,
                comentario
            );
            if (registroAtualizado?.saida) {
                setCheckOut(new Date(registroAtualizado.saida));
                localStorage.setItem(
                    'checkOut',
                    registroAtualizado.saida.toString()
                );
            } else {
                console.warn(
                    "Campo 'saida' ausente na resposta:",
                    registroAtualizado
                );
            }
        } catch (error) {
            console.error('Erro ao fazer check-out:', error);
        }
    };


    return (
        <div className="min-h-screen flex flex-column">
            <Card
                title="📅 Registro de Ponto"
                className="w-full md:w-8 lg:w-6 mx-auto"
            >
                <div className="text-center mb-3">
                    <p className="text-xl font-bold">🕒 Hora atual:</p>
                    <p className="text-2xl text-primary">
                        {horaAtual.toLocaleTimeString('pt-BR')}
                    </p>
                </div>

                <Divider />

                <div className="mb-3">
                    <p>
                        <strong>✅ Check-in realizado:</strong>{' '}
                        {formatarHora(checkIn)}
                    </p>
                    <p>
                        <strong>🚪 Check-out realizado:</strong>{' '}
                        {formatarHora(checkOut)}
                    </p>
                </div>

                <Divider />

                <div className="flex justify-content-between">
                    <Button
                        label="Fazer Check-in"
                        icon="pi pi-sign-in"
                        onClick={handleCheckIn}
                        className="p-button-success mr-2"
                    />
                    <Button
                        label="Fazer Check-out"
                        icon="pi pi-sign-out"
                        onClick={(e) => setPopupVisible(true)}
                        className="p-button-danger ml-2"
                        ref={popupTarget}
                    />
                </div>
            </Card>
            <ConfirmPopup
                target={popupTarget.current ?? undefined}
                visible={popupVisible}
                onHide={() => setPopupVisible(false)}
                message=""
                icon="pi pi-pencil"
                style={{ width: '30rem' }}
                content={
                    <div className="flex flex-column gap-3 mt-2">
                        <div>
                            <p className="mb-2 font-medium">
                                Deseja adicionar um comentário?
                            </p>
                            <label htmlFor="comentario">
                                O campo abaixo serve para adicionar alguma
                                informação complementar, caso necessário. (max. 100 caracteres)
                            </label>
                            <InputTextarea
                                id="comentario"
                                autoResize
                                rows={3}
                                cols={5}
                                className="w-full"
                                value={comentario}
                                maxLength={100}
                                onChange={(e) => setComentario(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-content-end gap-2">
                            <Button
                                label="Cancelar"
                                icon="pi pi-times"
                                className="p-button-text"
                                onClick={() => setPopupVisible(false)}
                            />
                            <Button
                                label="Finalizar"
                                icon="pi pi-check"
                                className="p-button-success"
                                onClick={() => {
                                    handleCheckOut(comentario);
                                    setPopupVisible(false);
                                }}
                            />
                        </div>
                    </div>
                }
            />
        </div>
    );
}
