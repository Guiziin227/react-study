import {Link} from "react-router-dom";

const Homepage = () => {
    return (
        <div>
            <p>Crie uma conta no nosso banco</p>


            <Link to="apppage">Criar</Link>
        </div>
    );
};

export default Homepage;