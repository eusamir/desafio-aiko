import DetailSection from "../presentation/modules/DetailSection";

interface ProductProps {
    params: {
      id: string
    }
  }


export default function InfoPage({params}: ProductProps){
    return(
        <>
            <DetailSection params={{ id: params.id }}/>
        </>
    )
}