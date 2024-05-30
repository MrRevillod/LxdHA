
import { UserStore } from "../store/UserStore"
import { MessageStore } from "../store/MessageStore"
import { useEffect, useState } from "react"
import { InstanceStore } from "../store/InstanceStore"

interface Props {
    variant: string
    dataStore: MessageStore | UserStore | InstanceStore
}

export const SearchBar = ({ dataStore, variant }: Props) => {

    const [search, setSearch] = useState<string>("")

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    useEffect(() => { dataStore.filterBySearch(search) }, [search])

    return (

        <div className="relative w-1/3 flex flex-row items-center">

            <input type="text" placeholder={`Search ${variant}`}
                className="pl-10 p-2 border border-neutral-300 rounded-md w-full"
                value={search}
                onChange={handleSearch}
            />

            <i className="bi bi-search absolute left-2 top-1/2 transform -translate-y-1/2"></i>

        </div>
    )
}