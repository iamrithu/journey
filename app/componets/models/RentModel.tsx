'use client'

import useRentModel from "@/app/hooks/useRentModel"
import Model from "./Model"
import { useCallback, useMemo, useState } from "react"
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
    return (
        <Model
            isOpen={rentModel.isOpen}
            onClose={rentModel.onClose}
            onSubmit={rentModel.onClose}
            actionLabel={actionLabel}
            secondaryLabel={secondaryLabel}
            title={"Journee Your Home"}
            body={undefined}
            footer={undefined}
            disabled={false}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        />
    )
}

export default RentModel
