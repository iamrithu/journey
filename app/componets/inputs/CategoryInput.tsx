'use client'

import { IconType } from "react-icons"

interface CategoryInputProps {
    selected: boolean
    label: string
    icon: IconType,
    onClick: (value: string) => void
}
const CategoryInput: React.FC<CategoryInputProps> = ({
    label,
    icon: Icon,
    selected,
    onClick
}) => {
    return (
        <div
            onClick={() => onClick(label)}
            className=

            {`  
        border-2
        p-4
        rounded-xl
        shadow-lg
        flex flex-col
        items-center
        justify-center
        gap-3
        transition
        cursor-pointer
        hover:border-black
        ${selected ? 'bg-rose-500' : 'border-neutral-200'}
        ${selected ? 'text-white' : 'text-black'}
        ${selected ? 'bg-rose-500' : 'bg-white'}


        
            `}
        >
            <Icon size={26} />
            <div className={`${selected ? "font-extrabold" : "font-semibold"}`}>
                {label}
            </div>
        </div>
    )
}

export default CategoryInput
