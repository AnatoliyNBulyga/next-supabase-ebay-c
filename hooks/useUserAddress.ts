import {CurrentAddressType} from "@/types";

const useUserAddress = async (): Promise<CurrentAddressType> => {
    let address = {}
    let response = await fetch("/api/address/get")

    if (response) {
        let data = await response.json();
        if (data) address = data
    }

    return address as CurrentAddressType
}

export default useUserAddress;