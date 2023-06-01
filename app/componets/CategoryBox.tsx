'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { IconType } from "react-icons"
import qs from 'query-string'

interface CategoryBoxProps {
    label: String,
    icon: IconType,
    selected?: boolean
    description?: string

}
const CategoryBox: React.FC<CategoryBoxProps> = ({
    label,
    icon: Icon,
    selected,
    description
}) => {

    const router = useRouter();
    const params = useSearchParams();
    const handler = useCallback(() => {
        let currentQuery = {}
        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            category: label
        }

        if (params?.get("category") === label) {
            delete updatedQuery.category;
        }

        const url = qs.stringifyUrl({
            url: "/",
            query: updatedQuery
        }, { skipNull: true });


        router.push(url);
    }, [router, params, label])

    return (
        <div

            onClick={handler}
            className={`
        flex 
        flex-col
        items-center
        justify-center
        gap-2
        p-3
        border-b-2
        hover:text-rose-500
        transition
        cursor-pointer
        ${selected ? 'border-b-rose-500' : 'border-transparent'}
        ${selected ? 'text-rose-500' : 'text-neutral-500'}
        `}



        >
            <Icon size={26} />
            <div className="font-medium text-sm">{label}</div>
        </div>
    )
}

export default CategoryBox
