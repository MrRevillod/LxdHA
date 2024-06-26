
import { toast } from "sonner"
import { create } from "zustand"

interface HttpStore {

    status: number,
    message: string,
    data: any | null,
    isLoading: boolean,
    isNotification: boolean,

    setIsLoading: (isLoading: boolean) => void,
    setStatus: (status: number) => void,
    setIsNotification: (isNotification: boolean) => void,
    setResponse: (status: number, message: string, data: any, notification: boolean) => void,
    resetStore: () => void,
}

export const useHttpStore = create<HttpStore>((set) => ({

    status: 0,
    message: "",
    data: {},

    isLoading: false,
    isNotification: false,

    setStatus(status) { set({ status }) },
    resetStore: () => set({ status: 0, message: "", data: {}, isLoading: false, isNotification: false }),

    setIsLoading: (isLoading: boolean) => set({ isLoading }),
    setIsNotification: (isNotification: boolean) => set({ isNotification }),

    setResponse: (status: number, message: string, data: any, notification) => {

        set({ status, message, data, isNotification: notification })

        if (notification && data?.type == "success") {

            toast.success(message != data.message ? message : data.message, {
                duration: 5000,
                style: { fontSize: "1rem" }
            })

        } else if (notification && data?.type == "error") {

            toast.error(data.message, {
                duration: 5000,
                style: { fontSize: "1rem" }
            })
        }
    }

}))
