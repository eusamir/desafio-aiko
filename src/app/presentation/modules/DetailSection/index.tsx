import Header from "../../shared/layout/Header";
import TableHeader from "../../shared/layout/Table/TableHeader";
import { api } from "../../../../../data/api";
import TableHistory from "../../shared/layout/Table/TableHistory";
import dynamic from "next/dynamic";
import * as S from './styled'

interface ProductProps {
    params: {
      id: string
    }
  }
  interface State {
    date: string;
    activeState: 'Operando' | 'Manutenção' | 'Parado';
    price: {
        equipmentStateId: string;
        value: number;
    };
}

  interface Equipment {
    equipmentId: string;
    states: State[];
}

async function getProduct(params: string){
    const response = await api(`/equipments/${params}/`, {
    next: {
        revalidate: 60 * 60,
    },
    })

    const product = await response.json()

    return product
}

async function getLocation(params: string){
    const response = await api(`/locations/${params}/`, {
    next: {
        revalidate: 60 * 60,
    },
    })

    const product = await response.json()

    return product
} 

function calculateEquipmentGains(equipments: Equipment[]) {
    return equipments.map(equipment => {
        const states = equipment.states;


        let operatingTime = 0; // Tempo total em que o equipamento esteve "Operando"
        let maintenanceTime = 0; // Tempo total em que o equipamento esteve em "Manutenção"
        let stopedTime = 0; // Tempo total em que o equipamento esteve em "Parado"

        let operatingGain = 0; // Acumulador do ganho enquanto estava "Operando"
        let maintenanceGain = 0; // Acumulador do ganho enquanto estava em "Manutenção"
        let stopedGain = 0; // Tempo total em que o equipamento esteve em "Parado"

        // Itera sobre os estados para calcular o tempo e ganho de cada tipo de estado
        for (let i = 0; i < states.length - 1; i++) {
            const currentState = states[i];
            const nextState = states[i + 1];

            // Calcula a diferença de tempo entre os dois estados em horas
            const currentDate = new Date(currentState.date);
            const nextDate = new Date(nextState.date);
            const timeDifference = (nextDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60); // Em horas

            // Verifica o estado atual e acumula o tempo e ganho para cada estado
            if (currentState.activeState === "Operando") {
                operatingTime += timeDifference;
                operatingGain += timeDifference * currentState.price.value;
            } else if (currentState.activeState === "Manutenção") {
                maintenanceTime += timeDifference;
                maintenanceGain += timeDifference * currentState.price.value;
            }else{
                stopedTime += timeDifference;
                stopedGain += timeDifference * currentState.price.value;
            }
        }

        // Calcula o ganho total somando os ganhos de cada estado
        const totalGain = (operatingGain) + (maintenanceGain) + (stopedGain);

        return {
            equipmentId: equipment.equipmentId,
            operatingTime: operatingTime.toFixed(2),
            maintenanceTime: maintenanceTime.toFixed(2),
            opGain: operatingGain,
            manuGain: maintenanceGain,
            stopGain: stopedGain,
            totalGain: totalGain.toFixed(2)
        };
    });
}

function calculateEquipmentProduction(equipments: Equipment[]) {
    return equipments.map(equipment => {
        let totalHours = 0;
        let operationalHours = 0;

        const states = equipment.states;

        for (let i = 0; i < states.length - 1; i++) {
            const currentState = states[i];
            const nextState = states[i + 1];

            // Calcula a diferença de tempo entre os dois estados em horas
            const currentDate = new Date(currentState.date);
            const nextDate = new Date(nextState.date);
            const timeDifference = (nextDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60); // Em horas

            totalHours += timeDifference;

            if (currentState.activeState === "Operando") {
                operationalHours += timeDifference;
            }
        }

        // Calcula a produtividade como percentual
        const productivity = (operationalHours / totalHours) * 100;

        return productivity.toFixed(2)
    });
}
export default async function DetailSection({params}: ProductProps){

    const product = await getProduct(params.id)
    
    const location = await getLocation(params.id)

    const activeLocation = location.positions[location.positions.length - 1]
    const positions = location.positions

    const gains = calculateEquipmentGains(product)
    
    const totalGains = gains.map((gain) => gain.totalGain)

    const teste = calculateEquipmentProduction(product)


    console.log(teste)



    const Map = dynamic(() => import("../../shared/layout/Map"), {
        ssr: false,
        loading: () => <p>Carregando...</p>,
    });

    return(
        <S.Container>
            <Header/>
            {/* <TableHeader/> */}
            <Map local={activeLocation} positions={positions}/>
            <S.Title>Histórico do equipamento</S.Title>
            <h1>Ganho total: R${totalGains}</h1>
            <h1>Produtividade: {teste}%</h1>
            <TableHistory equipment={product}/>
        </S.Container>
    )
}