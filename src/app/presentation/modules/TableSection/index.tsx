import Header from "../../shared/layout/Header";
import TableEquipment from "../../shared/layout/Table";
import * as S from './styled'
import { api } from "../../../../../data/api";
import TableHeader from "../../shared/layout/Table/TableHeader";

async function getProduct(){
  const response = await api(`/equipments/`, {
    next: {
      revalidate: 60 * 60,
    },
  })

  const product = await response.json()

  return product
}

export default async function TableSection(){
  const product = await getProduct()
  

  return(
    <>
      <Header/>
      <TableHeader/>
      <S.TableContainer>
        <TableEquipment equipment={product}/>
      </S.TableContainer>
    </>
  )
}