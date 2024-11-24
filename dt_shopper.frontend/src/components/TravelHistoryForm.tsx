import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TravelService } from '../services/travelService';

interface TravelHistory {
    date: string;
    driver: {
        id: string,
        name: string
    };
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    value: number;
}

const TravelHistoryForm: React.FC = () => {
    const travelService = new TravelService();

    const [userId, setUserId] = useState<string>('');
    const [driverId, setDriverId] = useState<string>('');
    const [travelHistory, setTravelHistory] = useState<TravelHistory[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleFilter = async () => {
        setLoading(true);
        try {
            // Substitua pelo endpoint correto da sua API
            const response = await travelService.listDriverHistory(userId, driverId);
            setTravelHistory(response.rides);
        } catch (error) {
            console.error('Erro ao buscar histórico de viagens:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4 mb-4">
            <h1 className="mb-4">Histórico de Viagens</h1>
            {/* Filtros */}
            <div className="card p-4 mb-4">
                <div className="row g-3">
                    {/* Campo para ID do Usuário */}
                    <div className="col-md-4">
                        <label htmlFor="userId" className="form-label">
                            ID do Usuário
                        </label>
                        <input
                            type="text"
                            id="userId"
                            className="form-control"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            placeholder="Informe o ID do usuário"
                        />
                    </div>

                    {/* Campo para ID do Motorista */}
                    <div className="col-md-4">
                        <label htmlFor="driverId" className="form-label">
                            ID do Motorista
                        </label>
                        <input
                            type="text"
                            id="driverId"
                            className="form-control"
                            value={driverId}
                            onChange={(e) => setDriverId(e.target.value)}
                            placeholder="Informe o ID do motorista"
                        />
                    </div>

                    {/* Botão de Filtro */}
                    <div className="col-md-4 d-flex align-items-end">
                        <button className="btn btn-primary w-100" onClick={handleFilter} disabled={loading}>
                            {loading ? 'Carregando...' : 'Aplicar Filtro'}
                        </button>
                    </div>
                </div>
            </div>


            {/* Lista de Histórico */}
            {travelHistory && travelHistory.length > 0 ? (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Data e Hora</th>
                            <th>Motorista</th>
                            <th>Origem</th>
                            <th>Destino</th>
                            <th>Distância (km)</th>
                            <th>Tempo</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {travelHistory.map((travel, index) => (
                            <tr key={index}>
                                <td>{new Date(travel.date).toLocaleString('pt-BR')}</td>
                                <td>{travel.driver.name}</td>
                                <td>{travel.origin}</td>
                                <td>{travel.destination}</td>
                                <td>{travel.distance} km</td>
                                <td>{travel.duration}</td>
                                <td>
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(travel.value)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                !loading && <p className="text-muted">Nenhum registro encontrado.</p>
            )}

        </div>
    );
};

export default TravelHistoryForm;
