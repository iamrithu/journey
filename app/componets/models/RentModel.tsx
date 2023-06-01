'use client'


import { useCallback, useMemo, useState } from "react"
import { FieldValues, useForm } from "react-hook-form"


import useRentModel from "@/app/hooks/useRentModel"


import Model from "./Model"
import Header from "../Header"
import { categories } from "../navbar/Category"
import CategoryInput from "../inputs/CategoryInput"
enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}
const RentModel = () => {
    const rentModel = useRentModel()
    const [step, setStep] = useState(STEPS.CATEGORY)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: "",
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: "",
            description: ""
        }
    });

    const category = watch('category')

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        })
    }

    const onBack = () => {
        setStep((val) => val - 1)
    }
    const onNext = () => {
        setStep((val) => val + 1)
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create'
        }
        return 'Next'
    }, [step])
    const secondaryLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined
        }
        return 'Back'
    }, [step])


    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Header
                title="Which of these est describes your place?"
                subTitle="Pick a category"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto bg-neutral-50 shadow-md p-2 rounded-md">
                {
                    categories.map((item) => (
                        <div key={item.label} className="col-span-1">
                            <CategoryInput
                                onClick={(category) => setCustomValue('category', category)}
                                label={item.label}
                                selected={category === item.label}
                                icon={item.icon}

                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Header
                    title="Where is your place located?"
                    subTitle="Help quests find you"
                />

            </div>
        )
    }
    return (
        <Model
            isOpen={rentModel.isOpen}
            onClose={rentModel.onClose}
            onSubmit={onNext}
            actionLabel={actionLabel}
            secondaryLabel={secondaryLabel}
            title={"Journee Your Home"}
            body={bodyContent}
            footer={undefined}
            disabled={false}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        />
    )
}

export default RentModel
