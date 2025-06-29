import { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import * as registroService from '../services/registroService';

export default function RegistroPonto() {
    const [horaAtual, setHoraAtual] = useState<Date>(new Date());
    const [checkIn, setCheckIn] = useState<Date | null>(null);
    const [checkOut, setCheckOut] = useState<Date | null>(null);
    const [registroId, setRegistroId] = useState<number | null>(null);


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


    const handleCheckIn = async () => {
        try {
            const registro = await registroService.checkIn(1);
            setCheckIn(new Date(registro.entrada));
            setCheckOut(null);
            setRegistroId(registro.id)

            localStorage.setItem('checkIn', registro.entrada.toString());
            localStorage.setItem('registroId', registro.id.toString());
            localStorage.removeItem('checkOut');
        } catch (error) {
            console.error('Erro ao fazer check-in:', error);
        }
    };

    const handleCheckOut = async () => {
        if (!registroId) {
            console.warn("Nenhum registro de check-in encontrado.");
            return;
        }
        try {
            const registroAtualizado = await registroService.checkOut(registroId);

            if (registroAtualizado?.saida) {
                setCheckOut(new Date(registroAtualizado.saida));
                localStorage.setItem('checkOut', registroAtualizado.saida.toString());
            } else {
                console.warn("Campo 'saida' ausente na resposta:", registroAtualizado);
            }
        } catch (error) {
            console.error('Erro ao fazer check-out:', error);
        }
    };



    return (
        <div className="min-h-screen flex flex-column">

            <Card title="📅 Registro de Ponto" className="w-full md:w-8 lg:w-6 mx-auto">
                <div className="text-center mb-3">
                    <p className="text-xl font-bold">🕒 Hora atual:</p>
                    <p className="text-2xl text-primary">{horaAtual.toLocaleTimeString('pt-BR')}</p>
                </div>

                <Divider />

                <div className="mb-3">
                    <p><strong>✅ Check-in realizado:</strong> {formatarHora(checkIn)}</p>
                    <p><strong>🚪 Check-out realizado:</strong> {formatarHora(checkOut)}</p>
                </div>

                <Divider />

                <div className="flex justify-content-between">
                    <Button label="Fazer Check-in" icon="pi pi-sign-in" onClick={handleCheckIn} className="p-button-success mr-2" />
                    <Button label="Fazer Check-out" icon="pi pi-sign-out" onClick={handleCheckOut} className="p-button-danger ml-2" />
                </div>
            </Card>
        </div>


    );
}
