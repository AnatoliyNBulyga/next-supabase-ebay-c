"use client"

// https://nextjs.org/docs/messages/react-hydration-error#solution-1-using-useeffect-to-run-on-the-client-only

import { useEffect, useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { useRouter } from "next/navigation"
import { toast } from 'react-toastify';
import MainLayout from "@/app/layouts/MainLayout";
import ClientOnly from "@/components/ClientOnly";
import TextInput from "@/components/TextInput";
import { useUser } from "@/context/user";
import useIsLoading from "@/hooks/useIsLoading";
import useUserAddress from "@/hooks/useUserAddress";
import useCreateAddress from "@/hooks/useCreateAddress";
import {CurrentAddressType, UserContextType} from "@/types";

export default function Home() {
    const router = useRouter();
    const { user } = useUser() as UserContextType;

    const [addressId, setAddressId] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [isUpdatingAddress, setIsUpdatingAddress] = useState(false)
    const [errors, setErrors] = useState(Array())

    const showError = (type: string) => {
        let errorMessage = '';
        if (errors.length > 0) {
            errors.forEach(errorItem => {
                if (errorItem.type === type) {
                    errorMessage = errorItem.message;
                }
            })
        }
        return errorMessage;
    }

    const getAddress = async () => {
        if (user?.id == null) {
            useIsLoading(false)
            return
        }

        const response = await useUserAddress();
        if (response) {
            setTheCurrentAddress(response)
            useIsLoading(false)
            return
        }
        useIsLoading(false)
    }


    useEffect(() => {
        useIsLoading(true)
        getAddress()
    }, [user])

    const setTheCurrentAddress = (result: CurrentAddressType) => {
        setAddressId(result.id)
        setName(result.name)
        setAddress(result.address)
        setZipcode(result.zipcode)
        setCity(result.city)
        setCountry(result.country)
    }

    const validate = () => {
        setErrors([]);
        let isError = false;

        if (!name) {
            setErrors(prev => [...prev, { type: 'name', message: 'A name is required'}] );
            isError = true;
        }

        if (!address) {
            setErrors(prev => [...prev, { type: 'address', message: 'An address is required'}]);
            isError = true;
        }

        if (!zipcode) {
            setErrors(prev => [...prev, { type: 'zipcode', message: 'A zipcode is required'}]);
            isError = true;
        }

        if (!city) {
            setErrors(prev => [...prev, { type: 'city', message: 'A city is required'}]);
            isError = true;
        }

        if (!country) {
            setErrors(prev => [...prev, { type: 'country', message: 'A country is required'}]);
            isError = true;
        }

        return isError;
    }

    const submit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        let isError = validate()

        if (isError) {
            toast.error("These fields are required!", { autoClose: 3000 })
            return
        }

        try {
            setIsUpdatingAddress(true)

            const response = await useCreateAddress({
                addressId,
                name,
                address,
                zipcode,
                city,
                country
            })

            setTheCurrentAddress(response)

            toast.success('Address updated!', { autoClose: 3000 })

            router.push('/checkout')
        } catch (error) {
            console.log(error)
            alert(error)
        } finally {
            setIsUpdatingAddress(false)
        }
    }

    return (

        <MainLayout>
            <ClientOnly>
                <div
                    id="AddressPage"
                    className="mt-4 max-w-[600px] mx-auto px-2"
                >
                    <div className="mx-auto bg-white rounded-lg p-3">

                        <div className="text-xl text-bold mb-2">Address Details</div>

                        <form onSubmit={submit}>
                            <div className="mb-4">
                                    <TextInput
                                        className="w-full"
                                        string={name}
                                        placeholder="Name"
                                        onUpdate={setName}
                                        error={showError('name')}
                                    />
                            </div>

                            <div className="mb-4">
                                    <TextInput
                                        className="w-full"
                                        string={address}
                                        placeholder="Address"
                                        onUpdate={setAddress}
                                        error={showError('address')}
                                    />
                            </div>

                            <div className="mb-4">
                                    <TextInput
                                        className="w-full mt-2"
                                        string={zipcode}
                                        placeholder="Zip Code"
                                        onUpdate={setZipcode}
                                        error={showError('zipcode')}
                                    />
                            </div>

                            <div className="mb-4">
                                    <TextInput
                                        className="w-full mt-2"
                                        string={city}
                                        placeholder="City"
                                        onUpdate={setCity}
                                        error={showError('city')}
                                    />
                            </div>

                            <div>
                                    <TextInput
                                        className="w-full mt-2"
                                        string={country}
                                        placeholder="Country"
                                        onUpdate={setCountry}
                                        error={showError('country')}
                                    />
                            </div>

                            <button
                                type="submit"
                                disabled={isUpdatingAddress}
                                className={`
                                mt-6
                                w-full 
                                text-white 
                                text-lg 
                                font-semibold 
                                p-3 
                                rounded
                                ${isUpdatingAddress ? 'bg-blue-800' : 'bg-blue-600'}
                            `}
                            >
                                {!isUpdatingAddress
                                    ? <div>Update Address</div>
                                    : <div className="flex items-center justify-center gap-2">
                                        <AiOutlineLoading3Quarters className="animate-spin" />
                                        Please wait...
                                    </div>
                                }
                            </button>

                        </form>
                    </div>
                </div>
            </ClientOnly>
        </MainLayout>
    )
}