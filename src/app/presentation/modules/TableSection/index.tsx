import Header from "../../shared/layout/Header";
import TableEquipment from "../../shared/layout/Table";
import * as S from './styled'
import { api } from "../../../../../data/api";
import TableHeader from "../../shared/layout/Table/TableHeader";
import dynamic from "next/dynamic";

async function getProduct(){
  const response = await api(`/equipments/`, {
    next: {
      revalidate: 60 * 60,
    },
  })

  const product = await response.json()

  return product
}

async function getLocation(){
  const response = await api(`/locations/`, {
    next: {
      revalidate: 60 * 60,
    },
  })

  const product = await response.json()

  return product
}

export default async function TableSection(){
  const product = await getProduct()

  const location = await getLocation()

  const AllEquipmentsMap = dynamic(() => import("../../shared/layout/Map/AllEquipmentsMap"), {
    ssr: false,
    loading: () => <p>Carregando...</p>,
});

  

  return(
    <>
      <Header/>
      <TableHeader/>
      <S.TableContainer>
        <AllEquipmentsMap locationInfo={location}/>
        <TableEquipment equipment={product}/>
      </S.TableContainer>
    </>
  )
}