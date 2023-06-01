'use client'

interface HeaderPropos {
    title: string,
    subTitle?: string,
    isCenter?: boolean
}

const Header: React.FC<HeaderPropos> = ({
    title, subTitle, isCenter
}) => {
    return <div
        className={isCenter ? 'text-center' : 'text-start'}
    >
        <div className="text-2xl font-bold">
            {title}

        </div>
        <div className="font-light text-neutral-500 mt-2 ">
            {subTitle}

        </div>
    </div>
}
export default Header;