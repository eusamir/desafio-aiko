import Header from "../../shared/layout/Header";
import { Table } from "../../shared/layout/Table";
import * as S from './styled'

export default function TableSection(){
  return(
    <>
      <Header/>
      <S.TableHeader>
        <S.Title>Painel de gerenciamento</S.Title>
        <S.SearchContainer>
          <div>
            <S.SelectFilter>
            <FadersHorizontal size={32} />
              Filtrar
            </S.SelectFilter>
          </div>
          <div>
            <input type="text" name="" id="" />
            <button>lupa</button>
          </div>
        </S.SearchContainer>
      </S.TableHeader>
      <S.TableContainer>

        <Table.DesktopTable>
          <Table.Head>
            <Table.RowHeader>
              <Table.ActionColumnTH className="action-column">
              Nome
              </Table.ActionColumnTH>
              <Table.Header></Table.Header>
              <Table.Header></Table.Header>
              <Table.Header></Table.Header>
              <Table.Header>Estado</Table.Header>
            </Table.RowHeader>
          </Table.Head>
          <Table.TableBody>
              <Table.Row key={ 'teste'}>
                <Table.Data className="action-column">
                teste
                </Table.Data>
                <Table.Data>
                  Operando
                </Table.Data>
              </Table.Row>
          </Table.TableBody>
        </Table.DesktopTable>
      </S.TableContainer>
    </>
  )
}