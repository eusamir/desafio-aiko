'use client'

import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr'
import * as S from './styled'
import { string, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

const filterSchema = z.object({
    search: string()
})
type SearchFilterSchema = z.infer<typeof filterSchema>

export default function Search(){
    const router = useRouter()
    const { register, handleSubmit } = useForm<SearchFilterSchema>({
        resolver: zodResolver(filterSchema)
    })
    function handlePlaceName(data: SearchFilterSchema) {
        return router.push(`?search=${data.search}`)
    }
    return(
        <form onSubmit={handleSubmit(handlePlaceName)}>
            <S.InputSearch>
                <S.Input type="text" placeholder="Pesquisar..." {...register('search')}/>
                <S.Button>
                <MagnifyingGlass size={21} color="#ffff" weight="bold" />
                </S.Button>
        </S.InputSearch>
        </form>
    )
}
