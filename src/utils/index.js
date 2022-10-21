import { useEffect } from "react";
import { useNavigate} from "react-router-dom";

export const NoPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/')
      }, []);
};

export const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}