import axios from 'axios';
import { ErrorAlert } from '../utils/ErrorAlert';
import config from '../config';


export class TravelService {   
    private baseUrl: string;

    constructor() {
        this.baseUrl = config.baseUrl;
    }

    /**
     * Método para estimar uma viagem
     * @param travelRequest Objeto com os dados necessários para a estimativa
     */
    async estimateTravel(travelRequest: { customer_id: string; origin: string; destination: string }) {
        try {
            const response = await axios.post(`${this.baseUrl}/ride/estimate`, travelRequest, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const enrichedData = {
                ...response.data,
                customer_id: travelRequest.customer_id,
                enderecoOrigem: travelRequest.origin,
                enderecoDestino: travelRequest.destination,
            };

            return enrichedData;
        } catch (error: any) {
            ErrorAlert(error);
            throw new Error(error);
        }
    }

    /**
     * Método para confirmar uma viagem
     * @param data Objeto com os dados necessários para a estimativa
     */
    async confirmTravel(data: any) {
        try {
            const response = await axios.patch(`${this.baseUrl}/ride/confirm`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            return response.data.success;

        } catch (error: any) {
            ErrorAlert(error);
            throw new Error(error);
        }
    }

     /**
     * Método que lista o histórico de viagens de acordo com o filtro informado 
     * @param userId ID usuário
     * @param driverId ID Motorista
     */
    async listDriverHistory(userId: string, driverId: string) {
        try {
            const response = await axios.get(`${this.baseUrl}/ride`, {
                params: {
                    customer_id: userId,       
                    driver_id: driverId    
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            return response.data;

        } catch (error: any) {
            ErrorAlert(error);
            throw new Error(error);
        }
    }
}


