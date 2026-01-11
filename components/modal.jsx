

export function Modal ({onopen , open , close , children }) {

    return (
        <>
           {/* <button className="py-[20px]" onClick={open}>click</button> */}
        
                    <div className="w-[100vw] fixed z-50 flex justify-center bg-[tranparent]" onClick={close}>
                        {onopen && (
                            <div className='w-[80vw] text-center content-center' onClick={(e)=> e.stopPropagation()}>
                                <button className="py-[5px]" onClick={close}>close</button>
                                {children}
                            </div>
                        )}
                    </div>
        </>
    )
}