const Restart = ({dispatch}) => {
    return (
        <button className="btn btn-toggle" onClick={() => dispatch({type: 'restartQuiz'})}>
            Restart
        </button>
    );
};

export default Restart;