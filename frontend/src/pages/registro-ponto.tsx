import { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Registro } from '../models/registroModel';
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
        return () => clearInterval(timer);
    }, []);

    const formatarHora = (data: Date | null) => {
        return data?.toLocaleTimeString('pt-BR') || '—';
    };


    const handleCheckIn = async () => {
        try {
            const registro = await registroService.checkIn(1, 'bellenunes24@gmail.com');
            setCheckIn(new Date(registro.entrada));
            // setRegistroId(registro.id);
            setCheckOut(null);
        } catch (error) {
            console.error('Erro ao fazer check-in:', error);
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
                    <Button label="Fazer Check-out" icon="pi pi-sign-out" onClick={() => setCheckOut(new Date())} className="p-button-danger ml-2" />
                </div>
            </Card>
        </div>


    );
}
