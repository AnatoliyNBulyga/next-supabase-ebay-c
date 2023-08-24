import {AddressDetailsType} from "@/types";

const useCreateAddress = async (details: AddressDetailsType) => {

    let url = 'create'
    if (details.addressId) url = 'update'

    const response = await fetch(`/api/address/${url}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            addressId: details.addressId,
            name: details.name,
            address: details.address,
            zipcode: details.zipcode,
            city: details.city,
            country: details.country,
        })
    })

    return await response.json();
}

export default useCreateAddress;