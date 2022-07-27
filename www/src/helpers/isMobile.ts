import { useWindowSize } from "../hooks/useWindowSize"

export const isMobile = () => {
    const {width} = useWindowSize();
    return  width && width! < 768;
}