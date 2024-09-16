import Image from "next/image";
import * as S from './styled'
import Link from "next/link";

export default function Header(){
  return(
    <S.Container>
      <Link href={'/'}>
        <Image src={'/images/aiko.png'} alt="" width={122} height={62}/>
      </Link>
    </S.Container>
  )
}