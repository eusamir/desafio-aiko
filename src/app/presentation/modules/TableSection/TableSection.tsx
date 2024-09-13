import Header from "../../shared/layout/Header";
import { Table } from "../../shared/layout/Table";

export default function TableSection(){
  return(
    <>
      <Header/>
      <Table.DesktopTable>
        <Table.Head>
          <Table.Row>
            <Table.ActionColumnTH className="action-column">
            Nome
            </Table.ActionColumnTH>
            <Table.Header></Table.Header>
            <Table.Header></Table.Header>
            <Table.Header></Table.Header>
            <Table.Header>Estado</Table.Header>
          </Table.Row>
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
    </>
  )
}