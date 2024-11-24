import React, { useState } from 'react';
import { TravelService } from '../services/travelService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const TravelRequestForm: React.FC = () => {
    const travelService = new TravelService();
    const [customer_id, setUserId] = useState<string>('');
    const [origin, setOrigin] = useState<string>('');
    const [destination, setDestination] = useState<string>('');    
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        try {
            const travelOptions = await travelService.estimateTravel({ customer_id: customer_id, origin, destination });            
            navigate('/opcoes-de-viagem', { state: { travelOptions: travelOptions } });
        }
        catch (err) {
            console.error('Erro ao estimar a viagem', err);
            return;
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Solicitação de Viagem</h2>
            <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow" style={{ textAlign: 'left' }}>
                <div className='row'>
                    <div className="form-group col-lg-6 ">
                        <label htmlFor="userId">ID do Usuário</label>
                        <input type="text" id="userId" className="form-control" value={customer_id}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className="form-group col-lg-6">
                        <label htmlFor="origin">Endereço de Origem</label>
                        <input
                            type="text"
                            id="origin"
                            className="form-control"
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className="form-group col-lg-6">
                        <label htmlFor="destination">Endereço de Destino</label>
                        <input
                            type="text"
                            id="destination"
                            className="form-control"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <button type="submit" disabled={loading} className="btn btn-primary mt-3">
                    {loading ? 'Carregando...' : 'Enviar'}
                </button>
            </form>
        </div>
    );
};

export default TravelRequestForm;