'use client'

import { styled } from 'styled-components'

export const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;

  width: 70%;
  table-layout: fixed;
  color: #B3B2B8;
  border: 1px solid #E1E1E1;

  tr {
    display: flex;
  }
`

export const Head = styled.thead`
  border-top: none;
`
export const TableBody = styled.tbody``

export const Header = styled.th`
  padding: 1.9rem 3.5rem;
  white-space: nowrap;

  display: flex;
  align-items: center;
  flex: 0 0 auto;
  width: 20%;
  background: #F0F0F0;
  border: 1px solid #F0F0F0;
  font-size: 2rem;
  font-weight: 700;
`
export const Row = styled.tr`
  background: white;
  border-top: 1px solid #E1E1E1;
  font-size: 2rem;
  font-weight: 400;
  justify-content: space-between;
  cursor: pointer;
`
export const RowHeader = styled.tr`
  background: white;
  border-top: 1px solid #E1E1E1;
  font-size: 2rem;
  font-weight: 400;
  justify-content: space-between;
`
export const Data = styled.td`
  padding: 1.9rem 3.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  display: flex;
  align-items: center;
  flex: 0 0 auto;
  width: 20%;
  font-weight: 500;
  color: black;
`

export const ActionColumnTH = styled(Header)`
  gap: 1.2rem;
`
export const ActionColumnTD = styled(Data)`
  gap: 1.2rem;
  color: #3A4559;
  font-weight: 500;
  font-size:2rem;

`

