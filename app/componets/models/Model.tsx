"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModelProps {
    isOpen: Boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: String;
    body: React.ReactNode;
    footer: React.ReactNode;
    actionLabel: String;
    disabled: boolean;
    secondaryAction?: () => void;
    secondaryLabel?: String;
}
const Model: React.FC<ModelProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryLabel,
}) => {
    const [showModel, setShowModel] = useState(isOpen);

    useEffect(() => {
        setShowModel(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }
        setShowModel(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [disabled, onClose]);

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }
        onSubmit();
    }, [disabled, onSubmit]);
    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }
        secondaryAction();
    }, [disabled, secondaryAction]);

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div
                className="
          flex
          items-center
          justify-center
          overflow-y-auto
          overflow-x-hidden
          fixed
          inset-0
          z-50
          outline-none
          focus:outline-none
          bg-neutral-800/70
              "
            >
                <div
                    className="
                      relative
                      w-full
                      md:w-4/6
                      lg:w-3/6
                      xl:w-2/5
                      my-6
                      mx-auto
                      h-auto
                      lg:h-auto
                      md:h-auto
                  "
                >
                    {/* Content */}
                    <div
                        className={`
                    translate
                    duration-300
                    h-full
                    ${showModel ? "opacity-100" : "opacity-0"}
                    ${showModel ? "translate-y-0" : "translate-y-full"}


            `}
                    >
                        <div
                            className="
                          translate
                          h-full
                          lg:h-auto
                          md:h-auto
                          border-0
                          shadow-lg
                          rounded-lg
                          relative
                          flex
                          flex-col
                          w-full
                          bg-white
                          outline-none
                          focus:outline-none

                      "
                        >
                            {/* HEADER */}
                            <div
                                className="
                          flex
                          items-center
                          p-6
                          justify-center
                          relative  
                          border-b-[1px]
                          "
                            >
                                <button
                                    onClick={handleClose}
                                    className="
                                  absolute
                                  left-9
                                  bg-rose-500
                                  rounded-full
                                  p-1
                                  border-0
                                  transition
                                  text-white
                                  hover:bg-rose-600
                                  "
                                >
                                    <IoMdClose size={18} />
                                </button>
                                <div className="text-lg font-semibold">{title}</div>
                            </div>

                            {/* BODY */}
                            <div className="p-6 flex-auto relative">{body}</div>

                            {/* FOOTER */}
                            <div className="flex flex-col  p-6 gap-2">
                                <div className="flex flex-row items-center w-full gap-4">
                                    {secondaryLabel && (
                                        <Button
                                            outline
                                            label={secondaryLabel}
                                            disabled={disabled}
                                            onClick={handleSecondaryAction}
                                        />
                                    )}

                                    <Button
                                        label={actionLabel}
                                        disabled={disabled}
                                        onClick={handleSubmit}
                                    />
                                </div>
                                {footer}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Model;
