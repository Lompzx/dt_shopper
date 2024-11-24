import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TravelService } from '../services/travelService';

const TravelOptionsForm: React.FC = () => {
    const travelService = new TravelService();
    const location = useLocation();
    const travelOptions = location.state?.travelOptions;

    //Boa pratica no Ract, asp.net geralmente utilizamos campos hidden
    const [customer_id] = useState(travelOptions.customer_id);
    const [origin] = useState(travelOptions.enderecoOrigem);
    const [destination] = useState(travelOptions.enderecoDestino);
    const [distance] = useState(travelOptions.distance);
    const [duration] = useState(travelOptions.duration);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChooseDriver = async (data: any) => {
        setLoading(true);
        try {

            const response = await travelService.confirmTravel(data);
            if (response)
                navigate('/historico-de-viagens');
            else
                alert('Viagem não confirmada');

        } catch (error) {
            console.error('Erro ao confirmar a viagem', error);
            return;
        } finally {
            setLoading(false);
        }
    };

    if (!travelOptions) {
        return (
            <div className="container mt-4">
                <h1>Ops! Não encontramos as opções de viagem.</h1>
            </div>
        );
    }

    return (
        <div className="container mt-4 mb-4">
            <h1 className="mb-4">Opções de Viagem</h1>

            {/* Mapa Estático */}
            <div className="mb-4">
                <h5>Mapa da Rota</h5>
                <div className="map-container border rounded p-2">
                    <img
                        src={`${travelOptions.staticMap}`}
                        alt="Mapa Estático"
                        className="img-fluid rounded"
                    />
                </div>
            </div>
            <input type='hidden' id='custommer_id' value={`${travelOptions.customer_id}`}></input>
            {/* Lista de Opções */}
            <div className="driver-options">
                <h5>Motoristas Disponíveis</h5>
                <div className="list-group">
                    {travelOptions.options.map((driver: any) => (
                        <div key={driver['id']} className="list-group-item p-2">
                            <div className="justify-content-between align-items-center">
                                <div>
                                    <h6>{driver['name']}</h6>
                                    <p className="mb-1">{driver['description']}</p>
                                    <p className="mb-1">
                                        <strong>Veículo:</strong> {driver['vehicle']}
                                    </p>
                                    <p className="mb-1">
                                        <strong>Avaliação:</strong> {driver['review'][0]['rating']} ⭐
                                    </p>
                                    <p className="mb-1">
                                        <strong>Valor:</strong> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(driver['value'])}
                                    </p>
                                </div>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleChooseDriver({
                                        customer_id: customer_id,
                                        origin,
                                        destination,
                                        distance,
                                        duration,
                                        driver: {
                                            id: driver['id'],
                                            name: driver['name'],
                                        },
                                        value: driver['value'],
                                    })}
                                    disabled={loading}
                                >
                                    {loading ? 'Processando...' : 'Escolher'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TravelOptionsForm;
