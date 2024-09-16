'use client'
import { useSearchParams } from 'next/navigation'
import * as S from './styled'

interface EquipmentProps{
  equipment:{
    id: string
    equipmentModelId: string
    name: string
    activeState: string
    modelName: string
  }[]
}


export default function TableEquipment({equipment}: EquipmentProps){
  const searchParams = useSearchParams()
  const placeName = searchParams.getAll("search")
  const filteredSearch = placeName[0]
  ? equipment.filter((search) => {
      const searchText = search.name.toLowerCase() + ' ' + search.modelName.toLowerCase() + ' ' + search.activeState.toLowerCase();
      return searchText.includes(placeName[0].toLowerCase());
    })
  : equipment;

  return(
    <S.Table>
    <S.Head>
      <S.RowHeader>
        <S.ActionColumnTH className="action-column">
          Equipamento
        </S.ActionColumnTH>
        <S.Header></S.Header>
        <S.ActionColumnTH>Modelo</S.ActionColumnTH>
        <S.Header></S.Header>
        <S.ActionColumnTH className="action-column">
          Estado
        </S.ActionColumnTH>
      </S.RowHeader>
    </S.Head>
    <S.TableBody>
      {filteredSearch.map(e=>{
      return(
        <S.Row key={e.id}>
            <S.Data className="action-column">
              <a href={`/${e.id}`}>
                {e.name}
              </a>
            </S.Data>
            <S.Data>
              {e.modelName}
            </S.Data>
            <S.Data>
              <S.Tag $status={e.activeState}>
                {e.activeState}
              </S.Tag>
            </S.Data>
        </S.Row>
        )
      })}
    </S.TableBody>
  </S.Table>
  )
}