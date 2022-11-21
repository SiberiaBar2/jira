import { useEffect, useRef } from "react"

export const useMountRef = () => {
    const mountedRef = useRef(false);
    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        }
    });

    return mountedRef;
};
